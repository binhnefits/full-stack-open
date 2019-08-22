import React, { useState, useEffect } from "react";
import axios from "axios";
import Person from "./Person";
import PersonForm from "./PersonForm";
import Filter from "./Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const listPersons = () => {
    const filteredPersons = persons.filter(person =>
      person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return filteredPersons.map(person => (
      <Person key={person.id} name={person.name} number={person.number} />
    ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Filter setFilter={setFilter} />
      <ul>{listPersons()}</ul>
    </div>
  );
};

export default App;
