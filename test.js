// test.js
import assert from "node:assert";
import test from "node:test";

import { isDuplicate } from "./utils.js";

test("Detects duplicate URL", () => {
  const bookmarks = [
    { url: "https://example.com" },
    { url: "https://google.com" },
    { url: "https://bbc.com" }
  ];

  assert.equal(isDuplicate(bookmarks, "https://example.com"), true);
});

test("Detects non-duplicate URL", () => {
  const bookmarks = [
    { url: "https://example.com" },
    { url: "https://google.com" }
  ];

  assert.equal(isDuplicate(bookmarks, "https://bing.com"), false);
});
