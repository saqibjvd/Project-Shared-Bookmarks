import { getUserIds, getData, setData } from "./storage.js";

const userSelect = document.getElementById("userSelect");

window.onload = function () {
  displayUsers();
  formHandler();
  
  // change of user
  userSelect.addEventListener("change", () => {
    const selectedUser = userSelect.value;
    if (selectedUser) {
      displayBookmarks(selectedUser);
    }
  });

  // clear all bookmarks eventlistener
  const clearbutton = document.getElementById("clearBookmarksBtn")

  clearbutton.addEventListener("click", () => {
    const selectedUser = userSelect.value;

    if(!selectedUser){
      alert("Please select a user to clear bookmarks.");
    return;
    }
    const confirmClear = confirm("Are you sure you want to clear all bookmarks for this user?");
    if (!confirmClear) return;
    
    setData(selectedUser, []);
    displayBookmarks(selectedUser)  
  })
};

// render users on drop down list

function displayUsers() {
  const users = getUserIds();

  // clear exisiting options
  userSelect.innerHTML = "";

  // no user is selected when page loads.
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

// form handler function
function formHandler() {
  const form = document.getElementById("bookmarkform");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedUser = document.getElementById("userSelect").value;
    const url = document.getElementById("url").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!selectedUser) {
      alert("Please select a user before adding a bookmark.");
      return;
    }

    if (!url || !title) {
      alert("Please enter both URL and Title.");
      return;
    }

    const existingBookmarks = getData(selectedUser) || [];
    console.log("Existing bookmarks:", existingBookmarks);

    const isDuplicate = existingBookmarks.some((bookmark) => {
      return (
        typeof bookmark.url === "string" &&
        bookmark.url.toLowerCase() === url.toLowerCase()
      );
    });

    if (isDuplicate) {
      alert("This bookmark already exists for the selected user.");
      return;
    }

    const newBookmark = {
      url,
      title,
      description,
      createdAt: new Date().toISOString(),
    };

    existingBookmarks.push(newBookmark);
    setData(selectedUser, existingBookmarks);
    displayBookmarks(selectedUser);
    form.reset();
  });
}

// display bookmark function
function displayBookmarks(userId) {
  const bookmarks = getData(userId) || [];
  const bookmarksList = document.getElementById("bookmarksList");
  const message = document.getElementById("bookmarkMessage");

  // Clear previous display
  bookmarksList.innerHTML = "";

  if (bookmarks.length === 0) {
    message.style.display = "block";
    return;
  }
  message.style.display = "none";

  // Show in reverse order (latest first)
  bookmarks
    .slice()
    .reverse()
    .forEach((bookmark) => {
      const li = document.createElement("li");
      // Create title link
      const link = document.createElement("a");
      link.href = bookmark.url;
      link.textContent = bookmark.title;
      link.target = "_blank";
      link.style.display = "block";

      // Description
      const desc = document.createElement("p");
      desc.textContent = bookmark.description;

      // Timestamp
      const time = document.createElement("small");
      const date = new Date(bookmark.createdAt);
      time.textContent = `Added on ${date.toLocaleString()}`;

      // Append all to list item
      li.appendChild(link);
      li.appendChild(desc);
      li.appendChild(time);

      bookmarksList.appendChild(li);
    });
}
