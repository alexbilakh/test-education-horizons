import { getBFSColors } from "./bfs";

const TOTAL_COLORS_COUNT = 32 * 32 * 32;
const bfsColorsObj = getBFSColors();
const bfsColors = Object.values(bfsColorsObj);

test("There are all 32,768 colours", () => {
  expect(bfsColors.length).toBe(TOTAL_COLORS_COUNT);
});

test("There should be no reuse and or repetition of a single colour. (All colours are unique.)", () => {
  const standardColorStrings = bfsColors.map((color) => color.join(","));
  const standardColorStringSet = new Set(standardColorStrings);

  expect(standardColorStringSet.size).toBe(TOTAL_COLORS_COUNT);
});

test("Each colour component should have 32 steps.", () => {
  const redSteps: number[] = [];
  const greenSteps: number[] = [];
  const blueSteps: number[] = [];

  bfsColors.forEach((color) => {
    redSteps.push(color[0]);
    greenSteps.push(color[1]);
    blueSteps.push(color[2]);
  });

  expect(new Set(redSteps).size).toBe(32);
  expect(new Set(greenSteps).size).toBe(32);
  expect(new Set(blueSteps).size).toBe(32);
});

test("All colors are correct RGB colours.", () => {
  let isCorrect = true;

  for (let i = 0; i < bfsColors.length; i++) {
    if (
      bfsColors[i][0] < 0 ||
      bfsColors[i][0] > 255 ||
      bfsColors[i][1] < 0 ||
      bfsColors[i][1] > 255 ||
      bfsColors[i][2] < 0 ||
      bfsColors[i][2] > 255
    ) {
      isCorrect = false;
      break;
    }
  }

  expect(isCorrect).toBe(true);
});
