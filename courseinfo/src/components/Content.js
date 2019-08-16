import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const rowParts = () =>
    parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ));

  return <div>{rowParts()}</div>;
};

export default Content;
