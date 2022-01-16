"use strict";

import "./popup.css";

let stashId = 0;
chrome.bookmarks.search({ title: "Stash" }, (e) => (stashId = e[0].id));

let add_ext = () => {
  chrome.tabs.query({ pinned: false }, (tabs) => {
    tabs = tabs.filter((tab) => tab.title != "New tab");
    tabs.forEach((tab) => {
      chrome.bookmarks.create({
        parentId: stashId,
        title: tab.title,
        url: tab.url,
      });
    });
  });
};

let remove_ext = () => {
  chrome.bookmarks.getChildren(stashId, (tabs) => {
    tabs.forEach((tab) => {
      chrome.bookmarks.remove(tab.id);
      chrome.tabs.query({ title: tab.title }, (q) => {
        if (q.length == 0) {
          chrome.tabs.create({ url: tab.url });
        }
      });
    });
  });
};

document.getElementById("remove").addEventListener("click", remove_ext);
document.getElementById("add").addEventListener("click", add_ext);
