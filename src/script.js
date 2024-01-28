// make different key
let key = "rhugtkeldibnridrlerlgcrrdvneevit";

// storage access

function chrome_set(key, data) {
  let temp_obj = { [key]: data };
  chrome.storage.sync.set(temp_obj);
}

async function chrome_get(key) {
  let result = await chrome.storage.sync.get(key);
  return result[key];
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

// User input

function keyUpdate(input, output, key_code) {
  document.querySelector(input).onkeydown = () => {
    if (event.keyCode === key_code) {
      chrome_set(key, DOM_value(input));
      DOM_input(output, chrome_get(key));
    }
  };
}

keyUpdate("textarea", "p", 13);

let date_start = Date.parse("17 Apr 2004 00:00:00 GMT+1");
let date_now = Date.now();
let date_end = Date.parse("17 Apr 2080 00:00:00 GMT+1");
let date_percent = ((date_now - date_start) / (date_end - date_start)) * 100;

console.log(date_percent.toString() + "%");

document.querySelector(".line").style.width = date_percent.toString() + "%";
document.querySelector("p").innerHTML = (100 - date_percent).toPrecision(5) + "%";
