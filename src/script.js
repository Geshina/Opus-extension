// make different key

let key = "rhugtkeldibnridrlerlgcrrdvneevit";

// STEPS
//
// two state transfer
// on enter upload
// on switch focus update ??

// storage access

function chrome_set(key, data) {
  let temp_obj = { [key]: data };
  chrome.storage.sync.set(temp_obj);
}

async function chrome_get(key) {
  try {
    let result = await chrome.storage.sync.get(key);
    // console.log(result[key]);
    return result[key];
  } catch {}
}

// DOM

async function DOM_input(selector, data) {
  document.querySelector(selector).innerHTML = await data;
}

function DOM_output(selector) {
  return document.querySelector(selector).innerHTML;
}

function DOM_value(selector) {
  return document.querySelector(selector).value;
}
console.log(chrome_get(key));

// Update tasks
// Upload data

document.querySelector("textarea").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    console.log(e.key);

    // transfer to textarea + append

    let textarea = document.querySelector("textarea");
    let tasks = document.querySelector(".tasks");
    let para = document.createElement("p");
    para.innerHTML = textarea.value;
    tasks.append(para);

    // Sync

    chrome_set(key, tasks.innerHTML);
  }
});

// Percentage

let date_start = Date.parse("17 Apr 2004 00:00:00 GMT+1");
let date_now = Date.now();
let date_end = Date.parse("17 Apr 2080 00:00:00 GMT+1");
let date_percent = ((date_now - date_start) / (date_end - date_start)) * 100;

document.querySelector(".line").style.width = date_percent.toString() + "%";
document.querySelector("p").innerHTML =
  (100 - date_percent).toPrecision(5) + "%";

// Focus Change update

chrome.windows.onFocusChanged.addListener(() => {
  console.log("pos");
});
