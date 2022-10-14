import { getAllBlockGradientColors } from "./blockGradient";

const TOTAL_COLORS_COUNT = 32 * 32 * 32;
const blockGradientColors = getAllBlockGradientColors();

test("There are all 32,768 colours", () => {
  expect(blockGradientColors.length).toBe(TOTAL_COLORS_COUNT);
});

test("There should be no reuse and or repetition of a single colour. (All colours are unique.)", () => {
  const blockGradientColorStrings = blockGradientColors.map((color) =>
    color.join(",")
  );
  const blockGradientColorStringSet = new Set(blockGradientColorStrings);

  expect(blockGradientColorStringSet.size).toBe(TOTAL_COLORS_COUNT);
});

test("Each colour component should have 32 steps.", () => {
  const redSteps: number[] = [];
  const greenSteps: number[] = [];
  const blueSteps: number[] = [];

  blockGradientColors.forEach((color) => {
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

  for (let i = 0; i < blockGradientColors.length; i++) {
    if (
      blockGradientColors[i][0] < 0 ||
      blockGradientColors[i][0] > 255 ||
      blockGradientColors[i][1] < 0 ||
      blockGradientColors[i][1] > 255 ||
      blockGradientColors[i][2] < 0 ||
      blockGradientColors[i][2] > 255
    ) {
      isCorrect = false;
      break;
    }
  }

  expect(isCorrect).toBe(true);
});

test("All nested colours should have only 1 different colour component.", () => {
  // Start horizontal check
  let allHorizontalsAreRelated = true;

  for (let x = 0; x < 256 - 1; x++) {
    for (let y = 0; y < 128; y++) {
      const index = y * 256 + x;
      let differentComponentCount = 0;

      if (blockGradientColors[index][0] !== blockGradientColors[index + 1][0])
        differentComponentCount++;
      if (blockGradientColors[index][1] !== blockGradientColors[index + 1][1])
        differentComponentCount++;
      if (blockGradientColors[index][2] !== blockGradientColors[index + 1][2])
        differentComponentCount++;

      if (differentComponentCount !== 1) {
        allHorizontalsAreRelated = false;
        break;
      }
    }
  }
  expect(allHorizontalsAreRelated).toBe(true);

  // Start vertical check
  let allVerticalsAreRelated = true;

  for (let y = 0; y < 128 - 1; y++) {
    for (let x = 0; x < 256; x++) {
      const index = x * 128 + y;
      let differentComponentCount = 0;

      if (blockGradientColors[index][0] !== blockGradientColors[index + 1][0])
        differentComponentCount++;
      if (blockGradientColors[index][1] !== blockGradientColors[index + 1][1])
        differentComponentCount++;
      if (blockGradientColors[index][2] !== blockGradientColors[index + 1][2])
        differentComponentCount++;

      if (differentComponentCount !== 1) {
        allVerticalsAreRelated = false;
        break;
      }
    }
  }
  expect(allVerticalsAreRelated).toBe(true);
});
