// Only works as separte file

let date_key = "mmjauwoofoinc";
let data_obj = {
  // placeholder values ?
  date__input: "2004-04-17",
  life__exp: "76",
};

async function chrome_get(key) {
  let result = await chrome.storage.sync.get(key);
  return result[key];
}
function chrome_set(key, data) {
  let temp_obj = { [key]: data };
  chrome.storage.sync.set(temp_obj);
}

let date_input = document.querySelector("#date-input");
let life_exp = document.querySelector("#life-exp");

date_input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    data_obj.date__input = date_input.value;
    chrome_set(date_key, data_obj);
  }
});

life_exp.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    data_obj.life__exp = life_exp.value;
    chrome_set(date_key, data_obj);
  }
});
