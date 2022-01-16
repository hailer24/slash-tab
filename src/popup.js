"use strict";

import "./popup.css";

let tar = document.getElementById("app");

tar.innerHTML = "Hello World";

chrome.bookmarks.create({ title: "Stash" }, function (newFolder) {
  console.log(newFolder);
});
let arr = ["2"];
chrome.bookmarks.getChildren("1", (e) => {
  e.forEach((x) => console.log(x.title));
});
