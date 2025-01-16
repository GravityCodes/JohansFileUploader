const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#new-folder-open-btn");
const closeButton = document.querySelector("#new-folder-close-btn");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});