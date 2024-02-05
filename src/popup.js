// Only works as separte file

let date_input = document.querySelector("#date-input");

date_input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
