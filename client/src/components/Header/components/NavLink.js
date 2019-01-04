import React from "react";
import { Link } from "react-router-dom";

const NavLink = props => {
  return (
    <li>
      <Link
        className={props.style}
        id={props.id}
        exact={props.exact}
        to={props.path}
        onClick={() => props.handleClick(props.name)}
      >
        {props.text}
      </Link>
    </li>
  );
};

export default NavLink;
