// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, setData, getData } from "./storage.js";
import { v4 as uuidv4 } from "https://esm.sh/uuid";

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

function displayingBookmarks() {
  const displayArea = document.getElementById("bookmark-display-area");
  displayArea.textContent = ""; // to clear the display before rendering
  const bookmarks = allBookmarks.map(bookmarkCard);
  displayArea.append(...bookmarks);
}

const state = {
  users: getUserIds(),
  currentUser: "",
  bookmarkFormValues: {
    title: "",
    link: "",
    description: "",
  },
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

// add From

function clearFormInput() {
  const formClear = document.getElementById("bookmark-clear");
  formClear.click();
}

function userActivation(e) {
  state.currentUser = e.target.value;
  const addBookmarkButton = document.getElementById("add-new-bookmark");
  const formDrawer = document.getElementById("form-drawer");
  const formHeader = document.getElementById("bookmark-form-header");

  clearFormInput();

  state.currentUser
    ? ((addBookmarkButton.disabled = false),
      (formHeader.textContent = `New bookmark form for User ${state.currentUser}`))
    : ((addBookmarkButton.disabled = true),
      formDrawer.classList.remove("active"));
  // add fetching bookmarks function here
}

function toggleFormDrawer() {
  const formDrawer = document.getElementById("form-drawer");
  formDrawer.classList.toggle("active");
}

function bookmarkTitleHandler(e) {
  state.bookmarkFormValues.title = e.target.value.trim();
}

function bookmarkUrlHandler(e) {
  state.bookmarkFormValues.link = e.target.value.trim();
}

function bookmarkDescriptionHandler(e) {
  state.bookmarkFormValues.description = e.target.value.trim();
}

function isValidURL(urlString) {
  try {
    const url = new URL(urlString);
    console.log(url);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (err) {
    console.log(err);
    return false;
  }
}

function validateBookmarkInputs(userArray, bookmarkFormValues) {
  const { title, link, description } = bookmarkFormValues;

  if (title === "" || link === "" || description === "") {
    return "Something is missing in the bookmark form";
  }

  if (link && !isValidURL(link)) {
    return "It doesn't seem like a valid url";
  }

  const foundTitle = userArray.find((bookmark) => bookmark.title === title);
  const foundLink = userArray.find((bookmark) => bookmark.link === link);
  if (foundTitle && foundLink) {
    return "You have saved both this title and this URL before";
  } else if (foundTitle) {
    return "You have saved this title before";
  } else if (foundLink) {
    return "You have saved this URL before";
  }

  return null;
}

function windowConfirmMessage(currentUser, { title, link, description }) {
  return window.confirm(`You are adding a bookmark for User ${currentUser}\n
        Title: ${title}\n
        URL: ${link}\n
        Description: ${description}\n`);
}

function createBookmarkObject(bookmarkFormValues) {
  bookmarkFormValues["timestamp"] = new Date().toISOString();
  bookmarkFormValues["likeCounter"] = 0;
  bookmarkFormValues["bookmarkId"] = uuidv4();
  return bookmarkFormValues;
}

function bookmarkSubmitHandler(e, { currentUser, bookmarkFormValues }) {
  e.preventDefault();

  let userArray = getData(currentUser) ?? [];

  const errorMessage = validateBookmarkInputs(userArray, bookmarkFormValues);
  if (errorMessage) {
    return window.alert(errorMessage);
  }
  if (windowConfirmMessage(currentUser, bookmarkFormValues)) {
    const bookmarkObject = createBookmarkObject(bookmarkFormValues);

    userArray.unshift(bookmarkObject);
    setData(currentUser, userArray);
    const savedUserArray = getData(currentUser);
    console.log(savedUserArray);
    clearFormInput();
  }
}

function addBookmarkFormListeners() {
  const addBookmarkButton = document.getElementById("add-new-bookmark");
  addBookmarkButton.addEventListener("click", toggleFormDrawer);

  const bookmarkTitleInput = document.getElementById("bookmark-title");
  bookmarkTitleInput.addEventListener("input", bookmarkTitleHandler);

  const bookmarkUrlInput = document.getElementById("bookmark-url");
  bookmarkUrlInput.addEventListener("input", bookmarkUrlHandler);

  const bookmarkDescriptionInput = document.getElementById(
    "bookmark-description",
  );
  bookmarkDescriptionInput.addEventListener(
    "input",
    bookmarkDescriptionHandler,
  );

  const bookmarkSubmitButton = document.getElementById("bookmark-submit");
  bookmarkSubmitButton.addEventListener("click", (e) =>
    bookmarkSubmitHandler(e, state),
  );
}

window.onload = function () {
  const displayArea = document.getElementById("bookmark-display-area");
  displayArea.addEventListener("click", handleBookmarkClick);

  const userSelect = document.getElementById("user-select");
  userSelect.addEventListener("change", userActivation);

  populateUserSelect();
  displayingBookmarks();
  addBookmarkFormListeners();
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
    return;
  }
  const likeBtn = event.target.closest(".like-btn");
  if (likeBtn) {
    bookmark.likeCounter += 1;
    likeBtn.textContent = `❤️ ${bookmark.likeCounter}`;
  }
}
