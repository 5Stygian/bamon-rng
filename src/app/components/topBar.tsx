import { config } from "../config";

export default function TopBar() {
  return (
    <nav className={config.styles.TopBar.Box}>
      <h1 className={config.styles.TopBar.Title}>Bamon RNG</h1>
    </nav>
  );
}
