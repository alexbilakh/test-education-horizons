import { STEP_COLOR_PAIRS } from "../../@types/colors";

/**
 * Get all possible color sets to make a gradient image to be aesthetically pleasing.
 * @dev All colors are unique, each color component can be only 32 choices, total 32768 sets
 * @dev From the vision of a gradient, all nested colors should be very similar colors.
 *      - As we have 3 color components and the image is the combination of 2 components (X and Y),
 *        first off we make blocks from 2 color components only and will fix the extra one component(red color in this case).
 *
 *        So, it (green + blue set) will be look like this (Will use 32 color sets instead of 256 color sets):
 *        ( 1, 1), ( 1, 2), ... ..., ( 1, 32)
 *        ( 2, 1), ( 2, 2), ... ..., ( 2, 32)
 *                         .... ....
 *        (32, 1), (32, 2), ... ..., (32, 32)
 *
 *        And we repeat this blok 32 times to make a whole gradient by adding different extra component(red color).
 *        If we look at only red color positions,
 *          1   5   9  13  17  21  25  29
 *          2   6  10  14  18  22  26  30
 *          3   7  11  15  19  23  27  31
 *          4   8  12  16  20  24  28  32
 *        it looks like this. (This is actually not red positions, just block positions/order that have different red colors.)
 *
 *        If we look at all components, so red + green + blue, and reflect/flip some blocks to be similar to next each other,
 *
 *        _______________________________________________    _______________________________________________
 *
 *        ( 1,  1, 1), ( 1,  1, 2), ... ..., ( 1,  1, 32)    ( 5,  1,32), ( 5,  1,31), ... ..., ( 5,  1, 1)
 *        ( 1,  2, 1), ( 1,  2, 2), ... ..., ( 1,  2, 32)    ( 5,  2,32), ( 5,  2,31), ... ..., ( 5,  2, 1)
 *                           .... ....                                          .... ....                              ....   ....
 *        ( 1, 32, 1), ( 1, 32, 2), ... ..., ( 1, 32, 32)    ( 5, 32,32), ( 5, 32,31), ... ..., ( 5, 32, 1)
 *        _______________________________________________    _______________________________________________
 *
 *        ( 2, 32, 1), ( 2, 32, 2), ... ..., ( 2, 32, 32)    ( 6, 32,32), ( 6, 32,31), ... ..., ( 6, 32, 1)
 *        ( 2, 32, 1), ( 2, 32, 2), ... ..., ( 2, 32, 32)    ( 6, 32,32), ( 6, 32,31), ... ..., ( 6, 32, 1)
 *                           .... ....                                          .... ....                              ....   ...
 *        ( 2,  1, 1), ( 2,  1, 2), ... ..., ( 2,  1, 32)    ( 6,  1,32), ( 6,  1,31), ... ..., ( 6,  1, 1)
 *        _______________________________________________    _______________________________________________
 *
 *                            ....   ....                ....                ....   ....
 *        As it looks like here, all nested colors have only 1 different color component, so one of red, green or blue.
 * @returns { STEP_COLOR_PAIRS } result
 */
const getAllBlockGradientColors = (): STEP_COLOR_PAIRS => {
  const result: STEP_COLOR_PAIRS = []; // Array of color sets

  let red: number = 1; // red-component for each color

  // loops 4 * 8 times to match red-component for all 32*32 blocks made with green + blue
  // red component column index
  for (let colRed = 1; colRed <= 8; colRed++) {
    // red component row index
    for (let rowRed = 1; rowRed <= 4; rowRed++) {
      let green = rowRed % 2 ? 1 : 32; // green-component for each color
      let stepGreen = rowRed % 2 ? 1 : -1; // green-component growing-step count

      // loop 32 * 32 for a block (green + blue)
      for (let row = 1; row <= 32; row++) {
        let blue = colRed % 2 ? 1 : 32; // blue-component for each color
        let stepBlue = colRed % 2 ? 1 : -1; // blue-component growing-step count

        for (let col = 1; col <= 32; col++) {
          // This index indicates the index of the result, calculated by assuming there will be 256(32 * 8) colors in a line
          const index =
            ((rowRed - 1) * 32 + (row - 1)) * 256 + (colRed - 1) * 32 + col - 1;
          result[index] = [red * 8 - 1, green * 8 - 1, blue * 8 - 1];

          blue += stepBlue;
        }
        green += stepGreen;
      }
      red++;
    }
  }

  return result;
};

export { getAllBlockGradientColors };
