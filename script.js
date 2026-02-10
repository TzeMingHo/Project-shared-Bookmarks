// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// Ahmad
// Here I add three bookmarks for test and render the page without adding any feature
// this obj is just  for testing

const allBookmarks = [
  {
    title: "Code Your Future",
    url: "https://codeyourfuture.io/",
    description: "This is a test",
    timestamp: "2026-02-07T10:30:00Z",
    likeCounter: 0,
    bookmarkId: 1,
  },
  {
    title: "Type Club",
    url: "https://www.typingclub.com/",
    description: "This is to improve your typing speed.",
    timestamp: "2026-02-08T10:30:00Z",
    likeCounter: 0,
    bookmarkId: 2,
  },
  {
    title: "Spelling training",
    url: "https://www.spellingtraining.com/index.html",
    description: "This is  to improve your spelling",
    timestamp: "2026-02-09T10:30:00Z",
    likeCounter: 0,
    bookmarkId: 3,
  },
];
import { getUserIds } from "./storage.js";



function displayingBookmarks() {
   const displayArea = document.getElementById("bookmark-display-area");
   displayArea.textContent = ""; // to clear the display before rendering
  const bookmarks = allBookmarks.map(bookmarkCard);
  displayArea.append(...bookmarks);
}

const state = {
  users: getUserIds(),
  currentUser: "",
};

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

// listeners
document.getElementById("user-select").addEventListener("change", (e) => {
  state.currentUser = e.target.value;
  // add fetching bookmarks function here
});

document.getElementById("add-new-bookmark").addEventListener("click", () => {
  const currentUser = state.currentUser;
  console.log(currentUser);
  // add a form function
  // render a form for the page
  // save the data
  // clear the form
});

window.onload = function () {
  const displayArea = document.getElementById("bookmark-display-area");
  displayArea.addEventListener("click", handleBookmarkClick);
  
  populateUserSelect();
  displayingBookmarks();
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

  return card;
}

async function handleBookmarkClick(event) {
 
  const card = event.target.closest(".bookmark-card");
  if (!card) return;
  const bmId = Number(card.dataset.bookmarkId);

  const bookmark = allBookmarks.find((bm) => bm.bookmarkId === bmId);
  if (!bookmark) return;
   const copyBtn = event.target.closest(".copy-btn");
   if (copyBtn) {
  try {
    await navigator.clipboard.writeText(bookmark.url);
    copyBtn.textContent = "Copied ✓";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  } catch {
    copyBtn.textContent = "Failed"; // here we need to ...
  }
  return ;
}
}
