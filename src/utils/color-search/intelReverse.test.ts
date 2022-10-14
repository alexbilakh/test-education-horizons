import { getIntelReverseColors } from "./intelReverse";

const TOTAL_COLORS_COUNT = 32 * 32 * 32;
const intelReverseColors = getIntelReverseColors();

test("There are all 32,768 colours", () => {
  expect(intelReverseColors.length).toBe(TOTAL_COLORS_COUNT);
});

test("There should be no reuse and or repetition of a single colour. (All colours are unique.)", () => {
  const intelReverseColorStrings = intelReverseColors.map((color) =>
    color.join(",")
  );
  const intelReverseColorStringSet = new Set(intelReverseColorStrings);

  expect(intelReverseColorStringSet.size).toBe(TOTAL_COLORS_COUNT);
});

test("Each colour component should have 32 steps.", () => {
  const redSteps: number[] = [];
  const greenSteps: number[] = [];
  const blueSteps: number[] = [];

  intelReverseColors.forEach((color) => {
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

  for (let i = 0; i < intelReverseColors.length; i++) {
    if (
      intelReverseColors[i][0] < 0 ||
      intelReverseColors[i][0] > 255 ||
      intelReverseColors[i][1] < 0 ||
      intelReverseColors[i][1] > 255 ||
      intelReverseColors[i][2] < 0 ||
      intelReverseColors[i][2] > 255
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

      if (intelReverseColors[index][0] !== intelReverseColors[index + 1][0])
        differentComponentCount++;
      if (intelReverseColors[index][1] !== intelReverseColors[index + 1][1])
        differentComponentCount++;
      if (intelReverseColors[index][2] !== intelReverseColors[index + 1][2])
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

      if (intelReverseColors[index][0] !== intelReverseColors[index + 1][0])
        differentComponentCount++;
      if (intelReverseColors[index][1] !== intelReverseColors[index + 1][1])
        differentComponentCount++;
      if (intelReverseColors[index][2] !== intelReverseColors[index + 1][2])
        differentComponentCount++;

      if (differentComponentCount !== 1) {
        allVerticalsAreRelated = false;
        break;
      }
    }
  }
  expect(allVerticalsAreRelated).toBe(true);
});
