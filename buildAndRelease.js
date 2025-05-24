import fs from 'node:fs';

const STATE_PATH = 'state.json';

// If we don't have a build in progress, initiate the state file and exit.
// The next step in the job will upload it as an artifact, and the real work
// will begin in the next run.
if (!fs.existsSync(STATE_PATH)) {
  fs.writeFileSync(
    STATE_PATH,
    JSON.stringify({
      resultFilesSoFar: 0,
      itemsToGo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    })
  );
  process.exit();
}

const state = JSON.parse(fs.readFileSync(STATE_PATH).toString());

// If our previous runs have already processed all items, it's time to trigger
// a release
if (state.itemsToGo.length == 0) {
  console.log('need to upload a result at this point');
  process.exit();
}

const ITEMS_PER_RUN = 10;
const result = [];
const items = itemsToGo;

let i;
for (i = 0; i < ITEMS_PER_RUN && i < items.length; i++) {
  const num = items[i];
  result.push([num, num * num]);
}

// TODO: how to upload this as an artifact?
fs.writeFileSync(
  `result${state.resultFilesSoFar}.json`,
  JSON.stringify(Object.fromEntries(result))
);
fs.writeFileSync(
  STATE_PATH,
  JSON.stringify({
    resultFilesSoFar: state.resultFilesSoFar + 1,
    itemsToGo: items.slice(i)
  })
);
