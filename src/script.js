//
//  OPUS
//
//  Three states - static / enter / focus
//  Static = on initial page load
//  Enter = update tasks with textarea content
//  Focus = sync data across tabs

// make new key dumbo
let key = "rhugtkeldibnridrlerlgcrrdvneevit";

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

// VARIABLES

let textarea = document.querySelector("textarea");
let tasks = document.querySelector(".tasks");

//  STATIC

datePercent();
progressBar(datePercent);

(async () => {
  let temp = await chrome_get(key);
  tasks.innerHTML = temp;
})();


document.querySelector("textarea").addEventListener("keydown", async (e) => {
  if (e.key == "Enter") {
    console.log(e.key);

    // transfer to textarea + append

    let textarea = document.querySelector("textarea");
    let tasks = document.querySelector(".tasks");
    let para = document.createElement("p");
    para.innerHTML = textarea.value;
    tasks.append(para);
    textarea.value = 8;

    // Sync

    chrome_set(key, tasks.innerHTML);
    let data = await chrome.storage.sync.get(key);
    console.log(data[key]);
  }
});

// Percentage

// Focus Change update

chrome.windows.onFocusChanged.addListener(() => {
  // console.log("pos");
});
