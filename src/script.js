//
let key = "rhugtkeldibnridrlerlgcrrdvneevit";
let data_obj = { rhugtkeldibnridrlerlgcrrdvneevit: "hahah" };

function chromeSet(data_obj) {
  chrome.storage.sync.set(data_obj);
}

async function chromeGet(key) {
  let result = await chrome.storage.sync.get(key);
  console.log(result[key]);
}

chromeSet(data_obj);
chromeGet(key);
