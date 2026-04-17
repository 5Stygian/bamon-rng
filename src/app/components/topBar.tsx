import { config } from "../config";

export default function TopBar() {
  return (
    <nav className={config.styles.TobBar.Box}>
      <h1 className={config.styles.TobBar.Title}>Bamon RNG</h1>
    </nav>
  );
}
