import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import POKEMON from "../data/pokemon.json";
import styles from "./ScreenPokedex.module.scss";

type Pokemon = (typeof POKEMON)[keyof typeof POKEMON];
type Order = "default" | "alphabetical";
type Filter = { search: string };

const lowercasePokemonIds = Object.fromEntries(Object.keys(POKEMON).map((k) => [k.toLowerCase(), k]));

const getPokemon = (p: string) => (p in POKEMON ? POKEMON[p as keyof typeof POKEMON] : null);

export default function ScreenPokedex() {
  const [order, setOrder] = useState<Order>("default");
  const [filter, setFilter] = useState<Filter>({ search: "" });

  useEffect(() => {
    const saved = sessionStorage.getItem("pokedex-state");
    if (saved) {
      const { order, filter } = JSON.parse(saved);
      queueMicrotask(() => {
        setOrder(order);
        setFilter(filter);
      });
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("pokedex-scroll");
    if (saved) {
      window.scrollTo(0, Number(saved));
    }
  }, []);

  const saveScroll = () => sessionStorage.setItem("pokedex-scroll", String(window.scrollY));

  useEffect(() => {
    window.addEventListener("scroll", saveScroll);
    return () => window.removeEventListener("scroll", saveScroll);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("pokedex-state", JSON.stringify({ order, filter }));
  }, [order, filter]);

  const sortEntries = ([a]: [string, Pokemon], [b]: [string, Pokemon]) => {
    if (order === "alphabetical") return a.localeCompare(b);
    return 0;
  };

  let searchTarget = null;
  if (filter.search in lowercasePokemonIds) {
    const pid = lowercasePokemonIds[filter.search];
    if (pid in POKEMON) searchTarget = getPokemon(pid);
  }
  console.log(filter.search, searchTarget);

  const isRelated = (start: string, target: string, ignore: string[] = []) => {
    // Make a cache???? idk bro
    const data = getPokemon(start);
    if (data === null) return false;

    // Pre-evolutions
    for (const p of data.evolvesInto) {
      if (p === target) return true;
      if (!ignore.includes(p) && isRelated(p, target, [...ignore, p])) return true;
    }

    // Evolutions
    const todo = [target];
    ignore = [];
    while (todo.length > 0) {
      const p = todo.shift();
      if (!p || ignore.includes(p)) continue;
      const data = getPokemon(p);
      if (!data) continue;
      ignore.push(p);
      for (const i of data.evolvesInto) {
        // FIXME SHOULD ALLOW IF RELATED YADA YADA save a "true" start / first start throughout recursions
        // to test, search for kadabra and see if alakazam shows up
        // idfk bro
        // waaaahhhh
        if (i === start) return true;
        if (!todo.includes(i)) todo.push(i);
      }
    }

    return false;
  };

  const filterEntries = ([, data]: [string, Pokemon]) => {
    data = {
      ...data,
      name: data.name.toLowerCase(),
      types: data.types.map((t) => t.toLowerCase()),
    };

    const typeFilter = filter.search.startsWith("type:") ? filter.search.slice(5) : filter.search;
    const abilityFilter = filter.search.startsWith("ability:") ? filter.search.slice(8) : filter.search;

    const fitsName = data.name.includes(filter.search);
    const fitsType = data.types.includes(typeFilter);
    const fitsAbility = data.abilities.some((a) => a.toLowerCase() === abilityFilter);
    const fitsPrevo = (data.evolvesInto as string[]).includes(filter.search);
    const fitsRelated = isRelated(data.name, filter.search);

    return fitsName || fitsType || fitsAbility || fitsPrevo || fitsRelated;
  };

  return (
    <div className={styles.root}>
      <input
        onInput={(e) =>
          setFilter({
            ...filter,
            search: (e.target as HTMLSelectElement).value.toLocaleLowerCase(),
          })
        }
        value={filter.search}
        placeholder="Filter"
      ></input>
      <select onInput={(e) => setOrder((e.target as HTMLSelectElement).value as Order)}>
        <option value="default">Default</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
      {(() => {
        const a = Object.entries(POKEMON).filter(filterEntries).toSorted(sortEntries);
        return (
          <>
            <div style={{ gridColumnEnd: -1 }}>{Object.keys(a).length} results</div>
            {a.map(([id, { name, form, types }]) => (
              <NavLink
                key={id}
                to={`/pokemon/${id}`}
                onClick={saveScroll}
                className={styles.entry}
                style={
                  types.length > 0
                    ? ({
                        "--type-1-light": `var(--type-${types[0]}-light)`,
                        "--type-1-dark": `var(--type-${types[0]}-dark)`,
                        "--type-2-light": `var(--type-${types[1] ?? types[0]}-light)`,
                        "--type-2-dark": `var(--type-${types[1] ?? types[0]}-dark)`,
                        color: "transparent",
                      } as React.CSSProperties)
                    : {}
                }
              >
                <div className={styles.mask}>
                  <div className={styles.name}>{name}</div>
                  {form && <div className={styles.form}>{form}</div>}
                </div>
                <img src={`art/${id}.png`} className={styles.image} />
              </NavLink>
            ))}
          </>
        );
      })()}
    </div>
  );
}
