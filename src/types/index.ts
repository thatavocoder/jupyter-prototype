import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface CodeCell {
  id: number;
  code: string;
  output: string;
}
