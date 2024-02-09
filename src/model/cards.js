import { SPECIAL_CARD_VALUES } from "./cardSpecs";

export const CARDS = {
  "0": {
    label: "0"
  },
  "1": {
    label: "1"
  },
  "2": {
    label: "2"
  },
  "3": {
    label: "3"
  },
  "5": {
    label: "5"
  },
  "8": {
    label: "8"
  },
  "13": {
    label: "13"
  },
  "21": {
    label: "21"
  },
  [SPECIAL_CARD_VALUES.CUT.value.toString()]: {
    label: "✂️",
    description: "Cut into smaller parts",
  },
  [SPECIAL_CARD_VALUES.SHRUG.value.toString()]: {
    label: "🤷🏻",
    description: "Can't tell",
  },
  [SPECIAL_CARD_VALUES.BREAK.value.toString()]: {
    label: "🍵",
    description: "Need a break",
  },
};
