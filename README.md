# 🔖 Shared Bookmarks Platform

A lightweight web application designed to manage, display, and share user-curated bookmark collections. The interface supports multi-user context switching, custom engagement tracking, and real-time state synchronization.

*   **Live Demo:** [View Live Application](https://project-bookmarks.netlify.app/)

---

## 💡 Project Background & Motivation

Having explored standard front-end state rendering, I wanted to focus on data longevity across separate browsing sessions. The core motivation behind this project was understanding how to persist user-driven interaction data—such as bookmarks and real-time "like" counts—entirely on the client side, ensuring that a user's modifications survive browser restarts and page refreshes without relying on an external database.

### The Problem It Solves
Volatile runtime memory clears as soon as a user closes a tab or refreshes a page. This application establishes a reliable storage pipeline that reads from and writes to the browser's persistent layer. It bridges the gap between active UI interactions (such as liking a bookmark) and long-term storage, keeping data intact, predictable, and scoped appropriately between distinct user profiles.

---

## 🛠️ Project Requirements & Technical Specifications

Built to enforce clean state patterns and data validation boundaries, the application implements the following technical specifications:

*   **User Scoped Collections:** Features a user-switching engine that swaps out active datasets dynamically, segregating bookmark libraries based on the selected individual profile.
*   **State Persistence Engine:** Interacts directly with the `localStorage` API to serialize, store, and deserialize complex objects (including uniquely tracked engagement counts and metadata).
*   **Reverse Chronological Pipelines:** Automatically processes input order to ensure that freshly registered bookmarks are immediately pushed to the top of the feed view.
*   **Modern Web API Core:** Generates isolated, collision-free identifiers using the native `crypto.randomUUID()` method, avoiding reliance on external ID generation packages.
*   **100% Lighthouse Accessibility:** Optimized markup structure to hit a perfect 100% accessibility score under strict Lighthouse automated auditing conditions.

---

## 🚀 Engineering Challenges & Solutions

### The Challenge: Preventing Data Duplication
The most complex phase of development involved managing input verification boundaries. Because the application handles user-submitted strings, validating incoming fields required designing a robust multi-branch check. The input pipeline had to verify that fields were non-empty and mathematically valid URLs via the native `URL` constructor.

More critically, it had to run conditional verification loops against the existing array collection to identify if either the precise title string or the destination URL already existed within the current user's profile. Mitigating this race condition meant establishing strict guard clauses before allowing mutating payloads to reach the persistence state, successfully blocking duplicate entries.

---

## 🧠 Technical Highlights & Testing Workflow

### Core Business Logic Verification
To ensure the integrity of the storage engine, the system utilizes a native automated test suite targeting the `validateBookmarkInputs` module. This non-trivial validation function encapsulates:
*   **Structural Parsing:** Catching empty or whitespace-only inputs.
*   **Protocol Enforcement:** Confirming active HTTP/HTTPS schema validation via structural parsing.
*   **Duplication Rejection:** Verifying that identical records are successfully caught and rejected before any local storage write occurs.

---

## ⚙️ Local Setup & Execution

### Prerequisites
This project implements the native Node.js test runner. No external testing dependencies are required, but you must have **Node.js v18.11.0 or higher** installed locally.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/TzeMingHo/Project-shared-Bookmarks.git](https://github.com/TzeMingHo/Project-shared-Bookmarks.git)

2. Navigate to the root directory:

   ```Bash
   cd Project-shared-Bookmarks
   ```
3. Execute the automated test suite:

   ```Bash
   npm test
   ```
