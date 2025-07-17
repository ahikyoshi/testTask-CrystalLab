export type TPosition = {
  x: number;
  y: number;
};

export interface IMoveProps {
  dir: string;
  pos: TPosition;
}
