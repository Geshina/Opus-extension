//
//  OPUS
//
//  Three states - static / enter / change
//  Static = on initial page load
//  Enter = update tasks with textarea content
//  Change = upadating tabs when storage gets

// VARIABLES

let key = "mmjauwoofoink";
let date_key = "mmjauwoofoinc";
let textarea = document.querySelector("textarea");
let tasks = document.querySelector(".tasks");

//  STATIC

// chrome_set(key, "");
// chrome_set(date_key, "");
injectDates();

(async () => {
  tasks.innerHTML = await chrome_get(key);
  click_listener();
})();

//  ENTER

textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    // transfer to textarea + append
    let para = document.createElement("p");
    para.innerHTML = textarea.value;
    para.classList.add("task");
    para.setAttribute("tabIndex", "0");
    tasks.append(para);
    textarea.value = "";

    click_listener();
    chrome_set(key, tasks.innerHTML);
  }
});

//  CHANGE
chrome.storage.onChanged.addListener(async () => {
  tasks.innerHTML = await chrome_get(key);
  let temp = await chrome_get(date_key);
  console.log(temp);
  click_listener();
  injectDates();
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

async function datePercent() {
  // fetch data
  let temp_obj = await chrome_get(date_key);
  let date_input = new Date(temp_obj.date__input);
  let life_exp = parseInt(temp_obj.life__exp);
  let date_now = Date.now();

  // to add years
  let year = date_input.getFullYear();
  let month = date_input.getMonth();
  let day = date_input.getDay();

  let life_exp_date = new Date(year + life_exp, month, day);
  life_exp_date = Date.parse(life_exp_date);

  let percent = ((date_now - date_input) / (life_exp_date - date_input)) * 100;

  return percent;
}

async function injectDates() {
  let percent = await datePercent();
  let percent_element = document.querySelector(".percent");
  let line_element = document.querySelector(".line")

  percent_element.innerHTML = 100 - parseFloat(percent).toPrecision(5) + "%";
  line_element.style.width = percent + "%"
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
