import React, { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons, setMessage, setMessageType }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = event => {
    const personNames = persons.map(person => person.name);
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    if (personNames.includes(newName)) {
      const message = `${newName} is already in the phonebook, update the old number with ${newNumber}?`;
      const person = persons.find(p => p.name === newName);

      if (window.confirm(message)) {
        personService
          .update(person.id, newPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(p =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            );
            setMessage(`Updated ${newName}: ${newNumber}`);

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(error => {
            setMessage(`${newName} has already been deleted.`);
            setMessageType("error");

            personService.getAll().then(initialPersons => {
              setPersons(initialPersons);
            });

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Added ${newName}: ${newNumber}`);

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }

    setNewNumber("");
    setNewName("");
  };

  const handleNewName = event => {
    setNewName(event.target.value);
  };

  const handleNewNumber = event => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
