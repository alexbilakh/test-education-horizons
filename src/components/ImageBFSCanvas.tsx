import { useEffect, useRef } from "react";
import styled from "styled-components";

import { STEP_COLOR } from "../@types/colors";

interface ImageBFSCanvasProps {
  colors: { [key: string]: STEP_COLOR };
  imageStyle: string;
}

const ImageBFSCanvas = ({ colors, imageStyle }: ImageBFSCanvasProps) => {
  const canvasRef = useRef<any>();

  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    for (let key in colors) {
      const color: STEP_COLOR = colors[key];
      const position = key.split(",");
      ctx.beginPath();
      ctx.fillStyle = `RGB(${color[0] * 8}, ${color[1] * 8}, ${color[2] * 8})`;
      ctx.fillRect(Number(position[0]) * 2, Number(position[1]) * 2, 2, 2);
    }
  }, [colors]);

  return (
    <StyledContainer>
      <StyledTitle>{imageStyle}</StyledTitle>
      <StyledCanvas width="600" height="600" ref={canvasRef}>
        Your browser does not support the HTML5 canvas tag.
      </StyledCanvas>
    </StyledContainer>
  );
};

export default ImageBFSCanvas;

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
