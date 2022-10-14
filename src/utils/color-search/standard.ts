import { STEP_COLOR_PAIRS } from "../../@types/colors";

/**
 * Get all standard color sets
 * @dev All colors are unique, each color component can be only 32 choices, total 32768 sets
 * @dev We can make each color set as a unique number by `uniqueColorNum = red * 32 * 32 + green * 32 + blue`
 *      Then we can get all unique color sets from these numbers (0 ~ 32767)
 * @returns { STEP_COLOR_PAIRS } result
 */
const getStandardColors = (): STEP_COLOR_PAIRS => {
  const result: STEP_COLOR_PAIRS = []; // Array of color sets

  for (let i = 0; i < 32768; i++) {
    result.push([
      Math.floor(i / 32 / 32) * 8,
      Math.floor((i % (32 * 32)) / 32) * 8,
      (i % 32) * 8,
    ]);
  }

  return result;
};

export { getStandardColors };
