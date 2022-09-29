import { Hero } from "./hero";

export interface LeasedHero extends Hero {
    isLeased: boolean,
}