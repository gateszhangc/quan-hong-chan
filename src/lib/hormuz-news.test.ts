import { describe, expect, it } from "vitest";
import {
  classifyQuanHongchanNewsTag,
  scoreQuanHongchanNews,
} from "./hormuz-news";

describe("Quan Hongchan news scoring", () => {
  it("scores directly related Quan Hongchan coverage as relevant", () => {
    expect(
      scoreQuanHongchanNews(
        "全红婵跳水世界杯决赛表现引发关注",
        "女子10米台决赛后的采访和技术讨论继续升温。"
      )
    ).toBeGreaterThanOrEqual(12);
  });

  it("rejects unrelated old-topic coverage", () => {
    expect(
      scoreQuanHongchanNews(
        "Strait of Hormuz shipping risk rises again",
        "Oil tankers and naval escorts remain in focus across the Gulf."
      )
    ).toBe(0);
  });
});

describe("Quan Hongchan news tags", () => {
  it("classifies training and interview coverage separately from competition results", () => {
    expect(
      classifyQuanHongchanNewsTag(
        "zh",
        "全红婵赛后采访谈训练调整",
        "她提到最近训练节奏和身体变化带来的适应。"
      )
    ).toBe("训练 / 采访");

    expect(
      classifyQuanHongchanNewsTag(
        "zh",
        "全红婵晋级女子10米台决赛",
        "世界杯预赛结束后，她继续留在冠军讨论中心。"
      )
    ).toBe("赛事");
  });
});
