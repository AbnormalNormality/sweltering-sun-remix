import { useParams } from "react-router-dom";
import ABILITIES from "../data/abilities.json";

export default function ScreenAbility() {
  const { id } = useParams();
  const data = ABILITIES[id as keyof typeof ABILITIES];
  if (!data) throw Error(`Could not retrieve data for ability '${id}'.`);

  return (
    <div>
      <div>{data.name ?? id}</div>
      {data.description ? <div>{data.description}</div> : <div>No description...</div>}
    </div>
  );

  return <div>{id}</div>;
}
