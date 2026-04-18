"use client";

import { config } from "../config";

export default function EPDisplay() {
  return (
    <div id="EPDisplayOuter" className={config.styles.EPContainer}>
      <span id="EPDisplay"> 0</span> <span>EP</span>
    </div>
  );
}
