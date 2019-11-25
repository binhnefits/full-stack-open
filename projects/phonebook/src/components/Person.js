import React from "react";

const Person = ({ id, name, number, deletePerson }) => {
  const deletePersonHandler = () => deletePerson(id, name);

  return (
    <li>
      {name} - {number} <button onClick={deletePersonHandler}>delete</button>
    </li>
  );
};

export default Person;
