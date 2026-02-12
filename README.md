# Project-shared-Bookmarks

A webpage that shares bookmarks saved by users

Features
User Management: Switch between different users to manage individual bookmark collections.

Data Persistence: Bookmarks are saved to localStorage, ensuring data remains after a page refresh.

Validation: Robust input validation to prevent empty entries, invalid URLs, or duplicate bookmarks.

Dynamic Sorting: Bookmarks are automatically sorted in reverse chronological order (newest first).

Interactive UI: Like-counters, "Copy to Clipboard" functionality, and a responsive drawer for adding new entries.

Modern Web APIs: Utilizes the native crypto.randomUUID() for unique identification without external dependencies.

Technical Stack
HTML5 & CSS3: Semantic markup and custom styling.

Vanilla JavaScript (ESM): Modular code using ES Modules (import/export).

Node.js Native Test Runner: Unit testing using node:test and node:assert.

Lighthouse: Optimized for 100% Accessibility scores.

Testing
Non-Trivial Function Testing
For the project's unit tests, I focused on the validateBookmarkInputs function. This is a non-trivial function because it manages the application's core data integrity logic, including:

Empty Field Detection: Ensuring all required data is present.

URL Validation: Using the URL constructor to verify protocols (HTTP/HTTPS).

Duplicate Prevention: Multi-branch logic to check if a Title or URL already exists for the current user.

# Testing Documentation

## How to Run Tests

This project uses the native Node.js test runner. No external dependencies (like Jest) are required, but you must have **Node.js v18.11.0 or higher** installed.

1. Open your terminal in the project root folder.
2. Run the following command:
   ```bash
   npm test
   ```
