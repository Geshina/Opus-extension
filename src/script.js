//
//  OPUS
//
//  Three states - static / enter / focus
//  Static = on initial page load
//  Enter = update tasks with textarea content
//  Focus = sync data across tabs

// make new key dumbo
let key = "rhugtkeldibnridrlerlgcrrdvneevit";

// VARIABLES

let textarea = document.querySelector("textarea");
let tasks = document.querySelector(".tasks");
// FUNCTIONS

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

async function chrome_get(key) {
  let result = await chrome.storage.sync.get(key);
  return result[key];
}

function chrome_set(key, data) {
  let temp_obj = { [key]: data };
  chrome.storage.sync.set(temp_obj);
}

//  STATIC

// chrome_set(key, "");
datePercent();
progressBar(datePercent);

(async () => {
  let temp = await chrome_get(key);
  tasks.innerHTML = temp;
  task_listeners();
})();

//  ENTER

textarea.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();

    // transfer to textarea + append
    let para = document.createElement("p");
    para.innerHTML = textarea.value;
    para.classList.add("task");
    tasks.append(para);
    textarea.value = "";

    task_listeners();
    chrome_set(key, tasks.innerHTML);
  }
});

// state managment
// paramterize the shit out of this one
function task_listeners() {
  let task_all = document.querySelectorAll(".task");

  task_all.forEach((task) => {
    task.addEventListener("mouseover", (e) => {
      task.classList.replace("task", "task-hover");
    });
    task.addEventListener("mouseout", (e) => {
      task.classList.replace("task-hover", "task");
    });
    task.addEventListener("click", (e) => {
      task.classList.toggle("task-clicked");
      chrome_set(key, tasks.innerHTML);
    });
  });
}

//  FOCUS

// not tab based only updates on alt + tab not ctrl + tab
chrome.windows.onFocusChanged.addListener(() => {
  (async () => {
    let temp = await chrome_get(key);
    tasks.innerHTML = temp;
    task_listeners();
  })();  

});
