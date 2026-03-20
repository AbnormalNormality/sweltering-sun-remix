import clsx from "clsx";
import { type NavLinkProps, NavLink } from "react-router-dom";
import styles from "./NavButton.module.css";

export function NavButton(props: NavLinkProps) {
  return (
    <NavLink {...props} className={clsx(styles.root, props.className)}>
      {props.children}
    </NavLink>
  );
}
