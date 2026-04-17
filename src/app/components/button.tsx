"use client";

import { config } from "../config";
import roll from "../scripts/button";

export default function RollButton() {
  return (
    <button
      id="RollButton"
      className={config.styles.RollButton}
      onClick={roll}
      type="button"
    >
      ROLL
    </button>
  );
}
