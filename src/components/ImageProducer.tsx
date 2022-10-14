import styled from "styled-components";

import { getAllBlockGradientColors } from "../utils/color-search/blockGradient";
import { getStandardColors } from "../utils/color-search/standard";
import { getBFSColors } from "../utils/color-search/bfs";
import { getIntelReverseColors } from "../utils/color-search/intelReverse";
import { STEP_COLOR_PAIRS } from "../@types/colors";
import ImageCanvas from "./ImageCanvas";
import ImageBFSCanvas from "./ImageBFSCanvas";

const ImageProducer = () => {
  const standardColors: STEP_COLOR_PAIRS = getStandardColors();
  const blockGradientColors: STEP_COLOR_PAIRS = getAllBlockGradientColors();
  const bfsColors = getBFSColors();
  const intelReversedColors = getIntelReverseColors();

  return (
    <StyledImageProducer>
      <ImageCanvas colors={standardColors} imageStyle="Standard" />
      <ImageCanvas colors={intelReversedColors} imageStyle="Intel Reverse" />
      <ImageCanvas colors={blockGradientColors} imageStyle="Box Gradient" />
      <ImageBFSCanvas
        colors={bfsColors}
        imageStyle="BFS(Breadth-First Search)"
      />
    </StyledImageProducer>
  );
};

export default ImageProducer;

// ========== Start styled-components ==========
const StyledImageProducer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
`;
// ========== End styled-components ==========
