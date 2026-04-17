"use client";

import { config } from "../config";

export default function NumberDisplay() {
  return (
    <div id="NumberDisplayOuter" className={config.styles.NumberDisplay}>
      <div id="NumberDisplay">0</div>
      <div id="AttributeDisplay" />
      <div>
        <span>EP: </span>
        <span id="EPDisplay" />
      </div>
    </div>
  );
}
