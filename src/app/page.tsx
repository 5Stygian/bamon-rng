"use client";

import { useEffect } from "react";
import * as c from "./components/index";
import { config } from "./config";
import { _calculateEP, _rollNumber } from "./scripts/devFunctions";

declare global {
  interface Window {
    developerFunctions: object;
  }
}

export default function Index() {
  useEffect(() => {
    if (config.settings.noprod.enableDevFunctions) {
      window.developerFunctions = {
        _calculateEP,
        _rollNumber,
      };
      console.log("AVAILABLE DEV FUNCTIONS: \n", window.developerFunctions);
    }

    // makes the radial gradient that follows the mouse
    // biome-ignore format: Would make the code ugly if it was formatted
    const rollButton = document.getElementById("RollButton") as HTMLButtonElement;
    function getMousePos(event: MouseEvent): void {
      const x = event.clientX;
      const y = event.clientY;

      rollButton.style.backgroundImage = `radial-gradient(farthest-side at ${x - rollButton.offsetLeft}px ${y - rollButton.offsetTop}px, #d946ef 10%, #8b5cf6)`;
    }
    rollButton.addEventListener("transitionstart", () => {
      document.addEventListener("mousemove", getMousePos);

      if (!rollButton.matches(":hover")) {
        rollButton.style.backgroundImage = "";
        document.removeEventListener("mousemove", getMousePos);
      }
    });
  }, []);
  return (
    <main>
      <c.TopBar />
      <c.NumberDisplay />
      <c.EPDisplay />
      <c.RollButton />
      <c.AttributeDisplay />
    </main>
  );
}
