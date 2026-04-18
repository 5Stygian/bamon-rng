"use client";

import { config } from "../config";
import roll from "../scripts/button";

export default function RollButton() {
  return (
    <button
      id="RollButton"
      className={config.styles.RollButton}
      onClick={() => {
        roll();
      }} // this way the MouseEventHandler is not passed into roll
      type="button"
    >
      ROLL
    </button>
  );
}
