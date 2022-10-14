import { useEffect, useRef } from "react";
import styled from "styled-components";

import { STEP_COLOR_PAIRS } from "../@types/colors";

interface ImageCanvasProps {
  colors: STEP_COLOR_PAIRS;
  imageStyle: string;
}

const ImageCanvas = ({ colors, imageStyle }: ImageCanvasProps) => {
  const canvasRef = useRef<any>();

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas || !colors.length) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 256; x++) {
        const currentIndex = y * 256 + x;

        ctx.beginPath();
        ctx.fillStyle = `RGB(${colors[currentIndex][0]}, ${colors[currentIndex][1]}, ${colors[currentIndex][2]})`;
        ctx.fillRect(x * 3, y * 3, 3, 3);
      }
    }
  }, [colors]);

  return (
    <StyledContainer>
      <StyledTitle>{imageStyle}</StyledTitle>
      <StyledCanvas width={256 * 3} height={128 * 3} ref={canvasRef}>
        Your browser does not support the HTML5 canvas tag.
      </StyledCanvas>
    </StyledContainer>
  );
};

export default ImageCanvas;

// ========== Start styled-components ==========
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;
const StyledTitle = styled.h3`
  font-family: cursive;
  font-size: 36px;
  margin: 20px 0px 10px;
`;
const StyledCanvas = styled.canvas`
  display: block;
`;
// ========== End styled-components ==========
