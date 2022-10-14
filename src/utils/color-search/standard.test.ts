import { getStandardColors } from "./standard";

const TOTAL_COLORS_COUNT = 32 * 32 * 32;
const standardColors = getStandardColors();

test("There are all 32,768 colours", () => {
  expect(standardColors.length).toBe(TOTAL_COLORS_COUNT);
});

test("There should be no reuse and or repetition of a single colour. (All colours are unique.)", () => {
  const standardColorStrings = standardColors.map((color) => color.join(","));
  const standardColorStringSet = new Set(standardColorStrings);

  expect(standardColorStringSet.size).toBe(TOTAL_COLORS_COUNT);
});

test("Each colour component should have 32 steps.", () => {
  const redSteps: number[] = [];
  const greenSteps: number[] = [];
  const blueSteps: number[] = [];

  standardColors.forEach((color) => {
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

  for (let i = 0; i < standardColors.length; i++) {
    if (
      standardColors[i][0] < 0 ||
      standardColors[i][0] > 255 ||
      standardColors[i][1] < 0 ||
      standardColors[i][1] > 255 ||
      standardColors[i][2] < 0 ||
      standardColors[i][2] > 255
    ) {
      isCorrect = false;
      break;
    }
  }

  expect(isCorrect).toBe(true);
});
