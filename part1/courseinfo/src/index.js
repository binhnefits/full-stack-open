import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.content.part1} exercise={props.content.exercises1}/>
      <Part part={props.content.part2} exercise={props.content.exercises3}/>
      <Part part={props.content.part2} exercise={props.content.exercises3}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Footer = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.content.exercises1 + props.content.exercises2 + props.content.exercises3}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const content = {
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Footer content={content} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))