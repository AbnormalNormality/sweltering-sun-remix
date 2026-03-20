import { NavButton } from "../components/NavButton";
import styles from "./ScreenRoot.module.css";

export default function ScreenRoot() {
  return (
    <div className={styles.root}>
      <NavButton to="/pokemon">Pokédex</NavButton>
      <div className={styles.footer}>
        <div>
          All designs shown are based on Pokémon made by The Pokémon Company and have been modified
          by Dooz's ROM Hacks.
        </div>{" "}
        <a href="https://discord.gg/2wgfHBGAtH">
          <b>The Doozcord</b>
        </a>
      </div>
    </div>
  );
}
