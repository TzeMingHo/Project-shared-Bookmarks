import { getUserIds, setData, getData } from "./storage.js";
import { v4 as uuidv4 } from "https://esm.sh/uuid";

const state = {
  users: getUserIds(),
  allBookmarks: [],
  currentUser: "",
  bookmarkFormValues: {
    title: "",
    url: "",
    description: "",
  },
};

export function sortingReverseChronologically(array) {
  return array.sort(
    (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp),
  );
}

function displayingBookmarks() {
  const displayArea = document.getElementById("bookmark-display-area");
  displayArea.textContent = "";
  if (!state.currentUser) return;
  if (state.allBookmarks.length === 0) {
    displayArea.textContent =
      "No bookmarks found. Press + to add your first bookmark";
    return;
  }
  const sortedBookmarks = sortingReverseChronologically([
    ...state.allBookmarks,
  ]);
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

  state.allBookmarks = getData(state.currentUser) ?? [];
  displayingBookmarks();
}

function toggleFormDrawer() {
  const formDrawer = document.getElementById("form-drawer");
  formDrawer.classList.toggle("active");
}

function bookmarkTitleHandler(e) {
  state.bookmarkFormValues.title = e.target.value.trim();
}

function bookmarkUrlHandler(e) {
  state.bookmarkFormValues.url = e.target.value.trim();
}

function bookmarkDescriptionHandler(e) {
  state.bookmarkFormValues.description = e.target.value.trim();
}

function isValidURL(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (err) {
    return false;
  }
}

export function validateBookmarkInputs(userArray, bookmarkFormValues) {
  const { title, url, description } = bookmarkFormValues;

  if (title === "" || url === "" || description === "") {
    return "Something is missing in the bookmark form";
  }

  if (url && !isValidURL(url)) {
    return "It doesn't seem like a valid url";
  }

  const foundTitle = userArray.find((bookmark) => bookmark.title === title);
  const foundLink = userArray.find((bookmark) => bookmark.url === url);
  if (foundTitle && foundLink) {
    return "You have saved both this title and this URL before";
  } else if (foundTitle) {
    return "You have saved this title before";
  } else if (foundLink) {
    return "You have saved this URL before";
  }

  return null;
}

function windowConfirmMessage(currentUser, { title, url, description }) {
  return window.confirm(`You are adding a bookmark for User ${currentUser}\n
        Title: ${title}\n
        URL: ${url}\n
        Description: ${description}\n`);
}

function createBookmarkObject(bookmarkFormValues) {
  return {
    ...bookmarkFormValues,
    timestamp: new Date().toISOString(),
    likeCounter: 0,
    bookmarkId: uuidv4(),
  };
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

    clearFormInput();

    state.allBookmarks = getData(state.currentUser) ?? [];
    displayingBookmarks();
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
  const urlAnchor = card.querySelector(".bookmark-url");
  urlAnchor.textContent = title;
  urlAnchor.href = url;
  urlAnchor.target = "_blank";
  urlAnchor.rel = "noopener noreferrer";
  card.querySelector(".bookmark-description").textContent = description;

  const date = new Date(timestamp);
  const timeElm = card.querySelector(".created-time");
  timeElm.textContent = date.toLocaleString("en-GB");
  timeElm.dateTime = timestamp;

  const article = card.querySelector(".bookmark-card");
  article.dataset.bookmarkId = bookmarkId;

  const likeBtn = card.querySelector(".like-btn");
  likeBtn.textContent = `❤️ ${likeCounter}`;

  const copyBtn = card.querySelector(".copy-btn");
  copyBtn.setAttribute("aria-label", `Copy url for ${title}`);
  return card;
}

async function handleBookmarkClick(event) {
  if (!state.currentUser) return;

  const card = event.target.closest(".bookmark-card");
  if (!card) return;
  const bmId = card.dataset.bookmarkId;

  const bookmark = state.allBookmarks.find((bm) => bm.bookmarkId === bmId);
  if (!bookmark) return;

  const copyBtn = event.target.closest(".copy-btn");
  if (copyBtn) {
    try {
      await navigator.clipboard.writeText(bookmark.url);
      copyBtn.textContent = "Copied ✓";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
    } catch {
      copyBtn.textContent = "Failed";

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
