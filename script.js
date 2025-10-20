
import { getUserIds } from "./storage.js";

const userSelect = document.getElementById("userSelect");



window.onload = function () {
  // const users = getUserIds();
  dispalyUsers();
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
