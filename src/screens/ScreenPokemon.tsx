import clsx from "clsx";
import { NavLink, useParams } from "react-router-dom";
import { NavButton } from "../components/NavButton";
import ABILITIES from "../data/abilities.json";
import POKEMON from "../data/pokemon.json";
import STATS from "../data/stats.json";
import TYPES from "../data/types.json";
import styles from "./ScreenPokemon.module.css";

export function ScreenPokemon() {
  const { id } = useParams();
  const data = POKEMON[id as keyof typeof POKEMON];
  if (!data) throw Error(`Could not retrieve data for Pokémon '${id}'.`);

  window.scrollTo({ top: 0 });

  return (
    <div className={styles.root}>
      <NavButton to="/pokemon" className={styles.backButton}>
        To Pokédex
      </NavButton>
      <div className={styles.nameContainer}>
        <div className={styles.name}>{data.name}</div>
        {data.form && <div className={styles.form}>{data.form}</div>}
      </div>
      <div className={clsx(styles.species, !data.species && styles.missing)}>
        {data.species ? `The ${data.species} Pokémon` : "Unknown Pokémon species"}
      </div>
      <div className={styles.imageContainer}>
        <img src={`art/${id}.png`} className={styles.image} />
        {(() => {
          const bst = Object.values(data.stats).reduce((p, c) => c + p);
          return bst > 0 ? (
            <div className={styles.statsContainer}>
              {Object.entries(data.stats).map(([stat, value], i) => {
                return (
                  <>
                    <div className={styles.statKey} style={{ gridRow: i + 1 }}>
                      {STATS[stat as keyof typeof STATS].shortName}
                    </div>
                    <div className={styles.statValue} style={{ gridRow: i + 1 }}>
                      {value}
                    </div>
                    <div
                      className={styles.statBar}
                      style={{ width: `${value > 0 ? (value / 255) * 100 : 0}%`, gridRow: i + 1 }}
                    ></div>
                  </>
                );
              })}
              <div className={styles.statKey}>BST</div>
              <div className={styles.statValue}>
                {Object.values(data.stats).reduce((p, c) => c + p)}
              </div>
            </div>
          ) : (
            <div className={clsx(styles.missing, styles.missingStats)}>No recorded stats...</div>
          );
        })()}
      </div>
      <div className={styles.typeContainer}>
        {data.types.map((type) => {
          const typeData = TYPES[type as keyof typeof TYPES];
          return (
            <NavLink
              key={type}
              to={`/types/${type}`}
              className={styles.type}
              style={
                {
                  "--type-light": `var(--type-${type}-light)`,
                  "--type-dark": `var(--type-${type}-dark)`,
                } as React.CSSProperties
              }
            >
              {typeData?.name || type}
            </NavLink>
          );
        })}
      </div>
      <div className={styles.abilityContainer}>
        {data.abilities.join("").trim() ? (
          data.abilities.map((ability) => {
            const abilityData = ABILITIES[ability as keyof typeof ABILITIES];
            return (
              <NavLink key={ability} to={`/abilities/${ability}`} className={styles.ability}>
                {abilityData?.name ?? ability}
              </NavLink>
            );
          })
        ) : (
          <div className={styles.missing}>No abilities...</div>
        )}
      </div>
      <div className={styles.pokedexEntryContainer}>
        {data.pokedexEntries.join("").trim() ? (
          data.pokedexEntries.map((pokedexEntry) => <div key={pokedexEntry}>{pokedexEntry}</div>)
        ) : (
          <div className={styles.missing}>No Pokédex entries...</div>
        )}
      </div>
    </div>
  );
}
