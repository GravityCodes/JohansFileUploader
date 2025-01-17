const folderDialog = document.querySelector("#folder-dialog");
const folderShowButton = document.querySelector("#new-folder-open-btn");
const folderCloseButton = document.querySelector("#new-folder-close-btn");

const fileDialog = document.querySelector("#file-dialog");
const fileShowButton = document.querySelector("#file-open-btn");
const fileCloseButton = document.querySelector("#file-close-btn")


fileShowButton.addEventListener("click", () => {
  fileDialog.showModal();
});

fileCloseButton.addEventListener("click", () => {
  fileDialog.close();
});

folderShowButton.addEventListener("click", () => {
  folderDialog.showModal();
});

folderCloseButton.addEventListener("click", () => {
  folderDialog.close();
});