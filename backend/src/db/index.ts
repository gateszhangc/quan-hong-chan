import { Pool, PoolClient, type PoolConfig } from "pg";
import { logger } from "../utils/logger.js";

export type QueryParam = string | number | boolean | Date | null;

type DbClientLike = Pick<PoolClient, "query" | "release">;
type DbPoolLike = {
  query: Pool["query"];
  connect: () => Promise<DbClientLike>;
};

const DB_POOL_KEEPALIVE_INITIAL_DELAY_MS = 10_000;
const DB_POOL_CONNECTION_TIMEOUT_MS = 10_000;

const toErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const toErrorStack = (error: unknown): string | undefined =>
  error instanceof Error ? error.stack : undefined;

export const buildPgPoolConfig = (): PoolConfig => ({
  connectionString: process.env.DATABASE_URL,
  keepAlive: true,
  keepAliveInitialDelayMillis: DB_POOL_KEEPALIVE_INITIAL_DELAY_MS,
  connectionTimeoutMillis: DB_POOL_CONNECTION_TIMEOUT_MS,
});

export const createDbApi = (dbPool: DbPoolLike) => ({
  query: (text: string, params?: Array<QueryParam>) => dbPool.query(text, params),

  withClient: async <T>(fn: (client: PoolClient) => Promise<T>) => {
    const client = (await dbPool.connect()) as PoolClient;
    try {
      await client.query("BEGIN");
      const result = await fn(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        logger.warn(
          {
            error: toErrorMessage(rollbackError),
            stack: toErrorStack(rollbackError),
            originalError: toErrorMessage(error),
          },
          "Postgres rollback failed after transaction error"
        );
      }
      throw error;
    } finally {
      client.release();
    }
  },
});

const pool = new Pool(buildPgPoolConfig());

pool.on("error", (error) => {
  logger.error(
    {
      error: toErrorMessage(error),
      stack: toErrorStack(error),
    },
    "Postgres pool error"
  );
});

const dbApi = createDbApi(pool);

export const query = dbApi.query;
export const withClient = dbApi.withClient;
