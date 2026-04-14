export async function GET() {
  return Response.json({
    ok: true,
    service: "quan-hong-chan",
    timestamp: new Date().toISOString(),
  });
}
