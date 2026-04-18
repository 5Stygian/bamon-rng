"use client";

import { useEffect } from "react";
import * as c from "./components/index";

export default function Index() {
  useEffect(() => {
    // makes the radial gradient that follows the mouse
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
