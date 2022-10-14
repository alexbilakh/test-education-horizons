import { STEP_COLOR_PAIRS } from "../../@types/colors";

/**
 * Get all colors ordered to be intellectual as a gradient color
 * @note The result is mostly minimized version of standard
 * @dev All colors are unique, each color component can be only 32 choices, total 32768 sets
 * @dev Main idea is to guessing the position of the color
 *      As we have have to make a pair of 2 components(image) from 3 color components,
 *      blue as X, green as Y, red as 32 * 32 (green * blue) block indicator.
 * @returns { STEP_COLOR_PAIRS } result
 */
const getIntelReverseColors = (): STEP_COLOR_PAIRS => {
  const result: STEP_COLOR_PAIRS = new Array(32768).fill([0, 0, 0]); // Array of color sets

  for (let red = 0; red < 32; red++) {
    for (let green = 0; green < 32; green++) {
      for (let blue = 0; blue < 32; blue++) {
        const index =
          (green % 8) * 32 +
          (green % 2 ? 31 - blue : blue) +
          ((Math.floor(green / 8) % 2 ? 31 - red : red) +
            Math.floor(green / 8) * 32) *
            256;

        result[index] = [blue * 8, red * 8, green * 8];
      }
    }
  }

  return result;
};

export { getIntelReverseColors };
