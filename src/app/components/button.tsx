"use client";

import roll from "../scripts/button";

export default function RollButton() {
  return (
    <button id="RollButton" onClick={roll} type="button">
      roll
    </button>
  );
}
