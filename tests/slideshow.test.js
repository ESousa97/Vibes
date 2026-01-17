import { describe, it, expect, beforeEach, vi } from "vitest";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const setupDom = async () => {
  const html = await readFile(join(process.cwd(), "index.html"), "utf-8");

  document.open();
  document.write(html);
  document.close();

  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };

  window.matchMedia = () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {}
  });

  HTMLElement.prototype.scrollIntoView = function scrollIntoView() {};

  vi.resetModules();
  await import("../scripts/script.js");

  document.dispatchEvent(new Event("DOMContentLoaded"));
  window.dispatchEvent(new Event("load"));
};

describe("Vibes slideshow", () => {
  beforeEach(async () => {
    await setupDom();
  });

  it("renders the expected number of slides and indicators", async () => {
    const slides = document.querySelectorAll(".slide");
    const indicators = document.querySelectorAll(".indicator");

    expect(slides.length).toBe(4);
    expect(indicators.length).toBe(4);
  });

  it("advances to the next slide when invoked", async () => {
    const nextButton = document.getElementById("next");
    nextButton?.click();

    const activeSlide = document.querySelector(".slide.active");
    expect(activeSlide?.getAttribute("data-index")).toBe("1");
  });
});
