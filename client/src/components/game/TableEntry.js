import React from "react";

const TableEntry = props => {
  return (
    <li className={props.elementClass}>
      <span className="player-name">{props.name}</span>
      <span className="player-score">{props.score}</span>
    </li>
  );
};

export default TableEntry;
