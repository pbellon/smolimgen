export const drawWatermark = (
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  width: number,
  height: number
): void => {
  ctx.save(); // Save current state
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = 'grey';
  ctx.globalAlpha = 0.5;
  const { width: textWidth } = ctx.measureText(text);
  const x = width - textWidth - 10;
  const y = height - fontSize - 10;
  ctx.fillText(text, x, y);
  ctx.restore(); // Restore original state
};
