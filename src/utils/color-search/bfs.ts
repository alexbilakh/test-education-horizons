import { STEP_COLOR } from "../../@types/colors";
import { getStandardColors } from "./standard";

/**
 * @dev Will use 0 ~ 31 color set in this function regarding the color limitation
 * @dev For all Maps in this util, use array-string instead array itself as Map-key because can't use array as the key in this case
 */
const getBFSColors = function () {
  // ========== START DEFAULT SEARCH CONFIGURATION CONSTANTS (Can be updated anytime) ========
  // Board size
  const BOARD_SIZE: number = 300;

  // start RGB color will be placed center of the box
  const startColor: STEP_COLOR = [0, 0, 0];

  // diff color numbers than current color to find next color, will be used to find next color
  const nextColorDiffs = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
    [-1, -1, 0],
    [1, -1, 0],
    [-1, 1, 0],
    [1, 1, 0],
    [-1, 0, -1],
    [1, 0, -1],
    [-1, 0, 1],
    [1, 0, 1],
    [0, -1, -1],
    [0, 1, -1],
    [0, -1, 1],
    [0, 1, 1],
  ];

  // diff position numbers than current position to find next color position
  const nextDiffsX: number[] = [1, 1, 0, -1, -1, -1, 0, 1];
  const nextDiffsY: number[] = [0, -1, -1, -1, 0, 1, 1, 1];
  // ========== END DEFAULT SEARCH CONFIGURATION CONSTANTS ========

  // ========== START SEARCH STORE VARIABLES ============
  // Result of the search, map of position => RGB color, i.e: "200,200" => [31, 31, 31]
  const colorsMapping: { [key: string]: STEP_COLOR } = {};

  // colors map that already filled, if filled then value is 1. "r,g,b" => 1, i.e: "31,31,31" => 1
  const usedColors: { [key: string]: 1 } = {};

  // colors that not filled yet (to track missing colors)
  const unusedColors: { [key: string]: 1 } = {};
  const standardColors = getStandardColors();
  standardColors.forEach((color) => (unusedColors[color.join(",")] = 1));

  // positions map that already filled, if filled then value is 1. "x,y" => 1, i.e: "200,200" => 1
  const visitedPositions: { [key: string]: 1 } = {};

  // queue array to store BFS
  const BFSQueue: [number, number][] = [];
  // ========== END SEARCH STORE VARIABLES ============

  // SET initial values
  // current position that should be filled
  let currX = BOARD_SIZE / 2;
  let currY = BOARD_SIZE / 2;
  colorsMapping[[currX, currY].toString()] = startColor;
  usedColors[startColor.toString()] = 1;
  delete unusedColors[startColor.join()];
  visitedPositions[[currX, currY].toString()] = 1;

  BFSQueue.push([currX, currY]);

  /**
   * Check all possible colors that nested to current color, return it if possible
   */
  const getNextColor = (): number[] => {
    // Get current color set
    const [currR, currG, currB] = colorsMapping[[currX, currY].toString()];

    // find next colors
    for (let i = 0; i < nextColorDiffs.length; i++) {
      // next color from diff to check if possible
      const nextR = currR + nextColorDiffs[i][0];
      const nextG = currG + nextColorDiffs[i][1];
      const nextB = currB + nextColorDiffs[i][2];

      // if color is not in limited color-range
      if (
        nextR < 0 ||
        nextR > 31 ||
        nextG < 0 ||
        nextG > 31 ||
        nextB < 0 ||
        nextB > 31
      )
        continue;

      // if color is already used before
      if (usedColors[[nextR, nextG, nextB].toString()] === 1) continue;

      return [nextR, nextG, nextB];
    }

    // not possible colors
    return [-1, -1, -1];
  };

  /**
   * Get all possible colors
   * @dev Main BFS algorithm here to search all colors by BFS
   */
  const getBFSResult = (): { [key: string]: STEP_COLOR } => {
    // Start BFS queue
    while (BFSQueue.length > 0) {
      [currX, currY] = BFSQueue.shift() as number[]; // pop the latest element from queue

      // find next position
      for (let i = 0; i < nextDiffsX.length; i++) {
        // get next position to check if possible
        const nextX = currX + nextDiffsX[i];
        const nextY = currY + nextDiffsY[i];

        // if outside of block
        if (nextX >= BOARD_SIZE || nextY >= BOARD_SIZE) break;
        // if already filled position
        if (visitedPositions[[nextX, nextY].toString()] === 1) continue;

        // get next color
        let [nextRed, nextGreen, nextBlue] = getNextColor();

        // if next color is not available
        if (nextRed === -1 || nextGreen === -1 || nextBlue === -1) {
          if (Object.keys(unusedColors).length === 0) {
            continue;
          }
          [nextRed, nextGreen, nextBlue] = Object.keys(unusedColors)
            .shift()
            ?.split(",") as any as STEP_COLOR;
          nextRed /= 8;
          nextGreen /= 8;
          nextBlue /= 8;
        }

        // Push to BFS result
        colorsMapping[[nextX, nextY].toString()] = [
          nextRed,
          nextGreen,
          nextBlue,
        ];

        // Mark color as used
        usedColors[[nextRed, nextGreen, nextBlue].toString()] = 1;
        delete unusedColors[[nextRed * 8, nextGreen * 8, nextBlue * 8].join()];
        // Mark position as filled
        visitedPositions[[nextX, nextY].toString()] = 1;

        // push the found position to queue
        BFSQueue.push([nextX, nextY]);
      }
    }

    return colorsMapping;
  };

  return getBFSResult();
};

export { getBFSColors };
