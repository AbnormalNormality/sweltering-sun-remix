import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DiscordIcon from "../assets/discord.svg?react";
import ScreenAbilities from "../screens/ScreenAbilities";
import ScreenAbility from "../screens/ScreenAbility";
import ScreenError from "../screens/ScreenError";
import ScreenPokedex from "../screens/ScreenPokedex";
import { ScreenPokemon } from "../screens/ScreenPokemon";
import ScreenRoot from "../screens/ScreenRoot";
import ScreenType from "../screens/ScreenType";
import ScreenTypes from "../screens/ScreenTypes";
import styles from "./App.module.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ScreenRoot />,
      errorElement: <ScreenError />,
    },
    {
      path: "/pokemon",
      element: <ScreenPokedex />,
      errorElement: <ScreenError />,
    },
    {
      path: "/pokemon/:id",
      element: <ScreenPokemon />,
      errorElement: <ScreenError />,
    },
    {
      path: "/abilities/",
      element: <ScreenAbilities />,
      errorElement: <ScreenError />,
    },
    {
      path: "/abilities/:id",
      element: <ScreenAbility />,
      errorElement: <ScreenError />,
    },
    {
      path: "/types/",
      element: <ScreenTypes />,
      errorElement: <ScreenError />,
    },
    {
      path: "/types/:id",
      element: <ScreenType />,
      errorElement: <ScreenError />,
    },
  ],
  {
    basename: "/sweltering-sun-remix",
  },
);

export default function App() {
  void styles;

  return (
    <div>
      <RouterProvider router={router} />
      <a href="https://discord.gg/2wgfHBGAtH" className={styles.discordLink}>
        {/* Currently uses Dooz's link, maybe change to one made by me for separation purposes */}
        <DiscordIcon className={styles.discordIcon} />
      </a>
    </div>
  );
}
