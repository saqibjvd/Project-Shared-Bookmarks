
import { getUserIds, getData, setData } from "./storage.js";

const userSelect = document.getElementById("userSelect");



window.onload = function () {
  // const users = getUserIds();
  dispalyUsers();
  formHandler()


};

// render users on drop down list
function dispalyUsers() {
  const users = getUserIds();
  // clear exisiting options
  userSelect.innerHTML = "";

  // no user is selected whenpage loads.
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select user from the list";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  userSelect.appendChild(defaultOption);

  // Displaying users in drop down.
  users.forEach((id, index) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User - ${id}`;
    userSelect.appendChild(option);
  });
}

function formHandler() {
  const form = document.getElementById("bookmarkform");

  form.addEventListener("submit", (e) =>{
    e.preventDefault()

    const selectedUser = document.getElementById("userSelect").value;
    const url = document.getElementById("url").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if(!selectedUser) {
      alert("Please select a user before adding a bookmark.");
      return;
    }

    if(!url || ! title) {
      alert("Please enter both URL and Title.");
      return;
    }

    
    const existingBookmarks = getData(selectedUser) || [];
    console.log("Existing bookmarks:", existingBookmarks);


    const isDuplicate = existingBookmarks.some((bookmark) => {
     return typeof bookmark.url === "string" && bookmark.url.toLowerCase() === url.toLowerCase()
    })

    if(isDuplicate) {
      alert("This bookmark already exists for the selected user.");
      return;
    }

    const newBookmark = {
      url,
      title,
      description,
      createdAt: new Date().toISOString()
    }

    existingBookmarks.push(newBookmark);
    setData(selectedUser, existingBookmarks);
    form.reset();
  });

  }
