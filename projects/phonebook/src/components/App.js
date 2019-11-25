import React, { useState, useEffect } from "react";
import Person from "./Person";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import personService from "../services/persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete: ${id} - ${name}?`)) {
      personService.deleteId(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
    }
  };

  const listPersons = () => {
    const filteredPersons = persons.filter(person =>
      person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return filteredPersons.map(person => (
      <Person
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        deletePerson={deletePerson}
      />
    ));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} messageType={messageType} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <h2>Numbers</h2>
      <Filter setFilter={setFilter} />
      <ul>{listPersons()}</ul>
    </div>
  );
};

export default App;
