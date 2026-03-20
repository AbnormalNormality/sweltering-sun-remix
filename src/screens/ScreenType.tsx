import { useParams } from "react-router-dom";
import TYPES from "../data/types.json";

export default function ScreenType() {
  const { id } = useParams();
  const data = TYPES[id as keyof typeof TYPES];
  if (!data) throw Error(`Could not retrieve data for type '${id}'.`);

  return (
    <div>
      <div>{data.name ?? id}</div>
      <div style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data.weaknesses, null, 2)}</div>
    </div>
  );
}
