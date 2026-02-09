// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

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

document.getElementById("user-select").addEventListener("change", (e) => {
  state.currentUser = e.target.value;
  // add fetching bookmarks function here
});

window.onload = function () {
  populateUserSelect();
  document.querySelector("main").innerText =
    `There are ${state.users.length} users`;
};
