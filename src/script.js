//
//  OPUS
//
//  Three states - static / enter / focus
//  Static = on initial page load
//  Enter = update tasks with textarea content
//  Focus = sync data across tabs

// VARIABLES

let key = "mmjauwoofoink";
let textarea = document.querySelector("textarea");
let tasks = document.querySelector(".tasks");

//  STATIC

// chrome_set(key, "");
datePercent();
progressBar(datePercent);

(async () => {
  tasks.innerHTML = await chrome_get(key);
  click_listener();
})();

//  ENTER

textarea.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();

    // transfer to textarea + append
    let para = document.createElement("p");
    para.innerHTML = textarea.value;
    para.classList.add("task");
    // para.setAttribute("tabIndex", "0");
    tasks.append(para);
    textarea.value = "";

    click_listener();
    chrome_set(key, tasks.innerHTML);
  }
});

// chrome.storage.onChanged
//  FOCUS

chrome.tabs.onActivated.addListener(async () => {
  tasks.innerHTML = await chrome_get(key);
  click_listener();
});

chrome.windows.onFocusChanged.addListener(async () => {
  tasks.innerHTML = await chrome_get(key);
  click_listener();
});

//  Functions

// state managment
function click_listener() {
  let task_all = document.querySelectorAll(".task");

  // Duplicates negate all functionality
  task_all.forEach((task) => {
    task.removeEventListener("click", handleClick);
    task.addEventListener("click", handleClick);

    function handleClick() {
      task.classList.toggle("task-clicked");
      chrome_set(key, tasks.innerHTML);
    }
  });
}

// storage
async function chrome_get(key) {
  let result = await chrome.storage.sync.get(key);
  return result[key];
}
function chrome_set(key, data) {
  let temp_obj = { [key]: data };
  chrome.storage.sync.set(temp_obj);
}

// date
function datePercent() {
  let date_start = Date.parse("17 Apr 2004 00:00:00 GMT+1");
  let date_now = Date.now();
  let date_end = Date.parse("17 Apr 2080 00:00:00 GMT+1");
  return ((date_now - date_start) / (date_end - date_start)) * 100;
}
function progressBar(datePercent) {
  let date_percent = datePercent();
  document.querySelector(".line").style.width = date_percent.toString() + "%";
  document.querySelector(".percent").innerHTML =
    (100 - date_percent).toPrecision(5) + "%";
}

// cut + undo
let pressedKeys = {};
document.addEventListener("keydown", (e) => {
  pressedKeys[e.key] = true;

  if (pressedKeys["Control"] && pressedKeys["Shift"] && pressedKeys["X"]) {
    let clicked = document.querySelectorAll(".task-clicked");

    clicked.forEach((element) => {
      element.remove();
    });

    chrome_set(key, textarea.innerHTML);
    pressedKeys = {};
  }
});
