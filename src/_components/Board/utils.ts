import { IMoveProps } from "./types";

export const move = ({
  dir,
  pos,
}: IMoveProps): { pos: { x: number; y: number }; success: boolean } => {
  let x = pos.x;
  let y = pos.y;

  if (dir === "П") x += 1;
  if (dir === "Л") x -= 1;
  if (dir === "В") y -= 1;
  if (dir === "Н") y += 1;

  const success = x >= 0 && x <= 6 && y >= 0 && y <= 6;

  return {
    pos: {
      x: Math.max(0, Math.min(6, x)),
      y: Math.max(0, Math.min(6, y)),
    },
    success,
  };
};
