
// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// this obj jest for testing
const user1 = {
  title: "Code Your Future",
  url: "https://codeyourfuture.io/",
  description: "This is a test",
  timestamp: "2026-02-07T10:30:00Z",
  likeCounter: 0,
  userId: 1,
};

import { getUserIds } from "./storage.js";

window.onload = function () {
  const users = getUserIds();
  // document.querySelector("body").innerText = `There are ${users.length} users`;
  const cardd = bookmarkCard(user1);
  const rootElm =document.getElementById("root");
  rootElm.append(cardd);
};


function bookmarkCard({title,url,description,timestamp,likeCounter})
{
  const template = document.getElementById("bookmark-card-template");
  const card = template.content.cloneNode(true);
  const link = card.querySelector(".bookmark-link");
  link.textContent = title;
  link.href = url;
  link.target= "_blank";
  card.querySelector(".bookmark-description").textContent = description;

  const date = new Date(timestamp);   // parses the timestamp then turns it into Date object 
  const timeElm = card.querySelector(".created-time");
  timeElm.textContent = date.toLocaleString("en-GB");  //English- Great Britain
  timeElm.dateTime = timestamp;
  //still need to solve copy and like buttons 
  
  return card;
}