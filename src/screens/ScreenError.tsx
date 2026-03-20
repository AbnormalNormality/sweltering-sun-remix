import { useNavigate, useRouteError } from "react-router-dom";
import { NavButton } from "../components/NavButton";
import styles from "./ScreenError.module.css";

export default function ScreenError() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  return (
    <div className={styles.root}>
      <NavButton to="/">Back to Root</NavButton>
      <NavButton to="#" onClick={() => navigate(-1)}>
        Back to Previous Page
      </NavButton>
      <div>{error.message}</div>
      <div>{error.stack}</div>
    </div>
  );
}
