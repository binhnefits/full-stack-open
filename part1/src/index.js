import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}
const App = () => {
  const age = 20

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Binh' age={age}/>
      <Hello name='Sho' age='23'/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))