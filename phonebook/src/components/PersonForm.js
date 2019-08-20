import React, { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addPerson = event => {
    const personNames = persons.map(person => person.name);
    event.preventDefault();

    if (personNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(
        persons.concat({
          id: persons.length + 1,
          name: newName,
          phone: newPhone
        })
      );
    }

    setNewPhone("");
    setNewName("");
  };

  const handleNewName = event => {
    setNewName(event.target.value);
  };

  const handleNewPhone = event => {
    setNewPhone(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newPhone} onChange={handleNewPhone} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
