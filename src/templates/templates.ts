// templates.ts
import {
  beforeAfterScript,
  BeforeAfterSlider,
  beforeAfterStyles,
} from "./BeforeAfterSlider";
import { CarouselA, carouselAStyles, carouselAScript } from "./CarouselA";
import { CarouselB, carouselBStyles, carouselBScript } from "./CarouselB";

export type Template = {
  id: string;
  name: string;
  Component: React.FC<any>;
  styles: string;
  script: string;
};

export const templates: Template[] = [
  {
    id: "carouselA",
    name: "Carrusel A",
    Component: CarouselA,
    styles: carouselAStyles,
    script: carouselAScript,
  },
  {
    id: "carouselB",
    name: "Carrusel B",
    Component: CarouselB,
    styles: carouselBStyles,
    script: carouselBScript,
  },
  {
    id: "beforeAfter",
    name: "Antes y Después Slider",
    Component: BeforeAfterSlider,
    styles: beforeAfterStyles,
    script: beforeAfterScript,
  },
];
