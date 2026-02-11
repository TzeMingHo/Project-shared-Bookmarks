// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// Ahmad
// Here I add three bookmarks for test and render the page without adding any feature
// this obj is just  for testing

// I will store those in user 2 for test
// const allBookmarks = [
//   {
//     title: "Project Submission",
//     url: "https://piscine.codeyourfuture.io/prep/#project-submission",
//     description: "I will set this bookmark for user 2 as a test ",
//     timestamp: "2026-02-11T10:30:00Z",
//     likeCounter: 0,
//     bookmarkId: 1,
//   },
//   {
//     title: "Piscine",
//     url: "https://piscine.codeyourfuture.io/",
//     description: "This is the CYF piscine.",
//     timestamp: "2026-02-09T10:29:00Z",
//     likeCounter: 0,
//     bookmarkId: 2,
//   },
//   {
//     title: "Spelling training",
//     url: "https://www.spellingtraining.com/index.html",
//     description:
//       "This bookmark for both user1 and user 2 but like button is sprate",
//     timestamp: "2026-02-09T10:30:00Z",
//     likeCounter: 0,
//     bookmarkId: 3,
//   },
// ];

import { getUserIds, getData, setData } from "./storage.js";

const state = {
  users: getUserIds(),
  allBookmarks: [],
  currentUser: "",
};

function displayingBookmarks() {
  const displayArea = document.getElementById("bookmark-display-area");
  displayArea.textContent = ""; // to clear the display before rendering
  if (!state.currentUser) return;
  if (state.allBookmarks.length === 0) {
    displayArea.textContent = "Press + to add your first bookmark";
    return;
  }
  const sortedBookmarks = [...state.allBookmarks].sort(
    (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp),
  );
  const bookmarks = sortedBookmarks.map(bookmarkCard);
  displayArea.append(...bookmarks);
}

function populateUserSelect() {
  const userSelect = document.getElementById("user-select");

  state.users.forEach((user) => {
    const userOption = document.createElement("option");
    userOption.textContent = `User ${user}`;
    userOption.value = user;
    userSelect.appendChild(userOption);
  });
}

// function renderNewForm() {
//   return bookmarkForm;
// }

// listeners after you done these. Can you move them inside window.onload

// document.getElementById("add-new-bookmark").addEventListener("click", () => {
//   const currentUser = state.currentUser;
//   console.log(currentUser);
//   // add a form function
//   // render a form for the page
//   // save the data
//   // clear the form
// });

window.onload = function () {
  const displayArea = document.getElementById("bookmark-display-area");
  displayArea.addEventListener("click", handleBookmarkClick);

  populateUserSelect();
  displayingBookmarks();
  document.getElementById("user-select").addEventListener("change", (e) => {
    state.currentUser = e.target.value;

    state.allBookmarks = getData(state.currentUser) ?? [];
    displayingBookmarks();
  });
};

function bookmarkCard({
  title,
  url,
  description,
  timestamp,
  likeCounter,
  bookmarkId,
}) {
  const template = document.getElementById("bookmark-card-template");
  const card = template.content.cloneNode(true);
  const link = card.querySelector(".bookmark-link");
  link.textContent = title;
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  card.querySelector(".bookmark-description").textContent = description;

  const date = new Date(timestamp); // parses the timestamp then turns it into Date object
  const timeElm = card.querySelector(".created-time");
  timeElm.textContent = date.toLocaleString("en-GB"); //English- Great Britain
  timeElm.dateTime = timestamp;

  const article = card.querySelector(".bookmark-card");
  article.dataset.bookmarkId = bookmarkId;

  const likeBtn = card.querySelector(".like-btn");
  likeBtn.textContent = `❤️ ${likeCounter}`;

  const copyBtn = card.querySelector(".copy-btn");
  copyBtn.setAttribute("aria-label", `Copy link for ${title}`); //for the accessibility
  return card;
}

async function handleBookmarkClick(event) {
  if (!state.currentUser) return;
  const card = event.target.closest(".bookmark-card");
  if (!card) return;
  const bmId = Number(card.dataset.bookmarkId);

  const bookmark = state.allBookmarks.find((bm) => bm.bookmarkId === bmId);
  if (!bookmark) return;

  const copyBtn = event.target.closest(".copy-btn");
  if (copyBtn) {
    try {
      await navigator.clipboard.writeText(bookmark.url);
      copyBtn.textContent = "Copied ✓";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
    } catch {
      copyBtn.textContent = "Failed"; // here we need to ...
      setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
    }
    return;
  }
  const likeBtn = event.target.closest(".like-btn");
  if (likeBtn) {
    bookmark.likeCounter += 1;
    likeBtn.textContent = `❤️ ${bookmark.likeCounter}`;
    setData(state.currentUser, state.allBookmarks);
  }
}
