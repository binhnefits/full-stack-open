import React, { useState } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  const listPersons = () => {
    const filteredPersons = persons.filter(person =>
      person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return filteredPersons.map(person => (
      <Person key={person.id} name={person.name} phone={person.phone} />
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
