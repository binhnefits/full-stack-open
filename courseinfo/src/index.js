import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

const Content = props => {
  return (
    <div>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercise} />
      <Part name={props.parts[1].name} exercise={props.parts[1].exercise} />
      <Part name={props.parts[2].name} exercise={props.parts[2].exercise} />
    </div>
  );
};

const Part = props => {
  return (
    <div>
      <p>
        {props.name} {props.exercise}
      </p>
    </div>
  );
};

const Footer = props => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.parts[0].exercise +
          props.parts[1].exercise +
          props.parts[2].exercise}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercise: 10
      },
      {
        name: "Using props to pass data",
        exercise: 7
      },
      {
        name: "State of a component",
        exercise: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Footer parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
