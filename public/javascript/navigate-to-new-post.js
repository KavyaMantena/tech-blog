async function navigatePostHandler(event) {
  event.preventDefault();

  window.location.replace("/dashboard/create-post");
}

document
  .querySelector(".new-post-btn")
  .addEventListener("click", navigatePostHandler);
