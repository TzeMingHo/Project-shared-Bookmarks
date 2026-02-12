import test from "node:test";
import assert from "node:assert";

import {
  validateBookmarkInputs,
  sortingReverseChronologically,
} from "./script.js";

test("should return error for incomplete bookmark objects", () => {
  const incompleteForms = [
    { title: "", url: "https://a.com", description: "d" },
    { title: "t", url: "", description: "d" },
    { title: "t", url: "https://a.com", description: "" },
  ];
  const mockUserArray = [];

  incompleteForms.forEach((formObject) => {
    const result = validateBookmarkInputs(mockUserArray, formObject);
    assert.strictEqual(result, "Something is missing in the bookmark form");
  });
});

test("should return error message for invalid URL", () => {
  const invalidURL = {
    title: "Title",
    url: "ftp://invalid-link.com",
    description: "Desc",
  };
  const result = validateBookmarkInputs([], invalidURL);
  assert.strictEqual(result, "It doesn't seem like a valid url");
});

test("should return error message for duplicate title and URL", () => {
  const existingUserArray = [
    { title: "Google", url: "https://google.com", description: "I feel lucky" },
  ];
  const newBookmarkObject = {
    title: "Google",
    url: "https://google.com",
    description: "Search engine",
  };

  const result = validateBookmarkInputs(existingUserArray, newBookmarkObject);
  assert.strictEqual(
    result,
    "You have saved both this title and this URL before",
  );
});

test("should return error for duplicate Title only", () => {
  const existing = [{ title: "Google", url: "https://google.com" }];
  const formData = {
    title: "Google",
    url: "https://google.it",
    description: "Description",
  };

  const result = validateBookmarkInputs(existing, formData);
  assert.strictEqual(result, "You have saved this title before");
});

test("should return error for duplicate URL only", () => {
  const existing = [{ title: "Google", url: "https://google.com" }];
  const formData = {
    title: "Search",
    url: "https://google.com",
    description: "Description",
  };

  const result = validateBookmarkInputs(existing, formData);
  assert.strictEqual(result, "You have saved this URL before");
});

test("should return null (pass) for unique valid data", () => {
  const existing = [{ title: "Google", url: "https://google.com" }];
  const formData = {
    title: "Bing",
    url: "https://bing.com",
    description: "New search",
  };

  const result = validateBookmarkInputs(existing, formData);
  assert.strictEqual(result, null);
});

test("Sorting: should sort the latest bookmark to the top", () => {
  const mockBookmarks = [
    {
      title: "BBC",
      url: "https://www.bbc.co.uk/",
      description: "BBC news webpage",
      timestamp: "2026-02-11T20:50:02.569Z",
      likeCounter: 0,
      bookmarkId: "67182eff-4de5-4889-bc0a-d5002a9ed5dd",
    },
    {
      title: "Code Your Future",
      url: "https://codeyourfuture.io/",
      description: "Code your future website",
      timestamp: "2026-02-10T20:49:09.656Z",
      likeCounter: 0,
      bookmarkId: "52c74f33-1bba-42b8-8661-e53b8d2a71ad",
    },
    {
      title: "Google",
      url: "https://www.google.com",
      description: "Google",
      timestamp: "2026-02-12T20:35:51.635Z",
      likeCounter: 0,
      bookmarkId: "ba725ada-bfa3-4837-add1-d32b688df3ac",
    },
  ];
  const result = sortingReverseChronologically(mockBookmarks);
  assert.strictEqual(result[0].title, "Google");
  assert.strictEqual(result[1].title, "BBC");
  assert.strictEqual(result[2].title, "Code Your Future");
});
