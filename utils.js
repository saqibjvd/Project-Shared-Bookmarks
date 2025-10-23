export function isDuplicate(existingBookmarks, urlToCheck) {
    return existingBookmarks.some(
      (bookmark) =>
        typeof bookmark.url === "string" &&
        bookmark.url.toLowerCase() === urlToCheck.toLowerCase()
    );
  }