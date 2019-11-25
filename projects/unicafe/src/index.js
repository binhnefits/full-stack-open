import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatRow = ({ text, score }) => (
  <tr>
    <td> {text} </td>
    <td> {score} </td>
  </tr>
);

const Statistics = ({ text, feedback }) => {
  const average = feedback.good - feedback.bad;
  const positive = feedback.good / (feedback.all * 1.0);

  if (feedback.all > 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatRow text="Good" score={feedback.good} />
            <StatRow text="Neutral" score={feedback.neutral} />
            <StatRow text="Bad" score={feedback.bad} />
            <StatRow text="All" score={feedback.all} />
            <StatRow text="Average" score={average} />
            <StatRow text="Positive" score={`${positive}%`} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given.
      </div>
    );
  }
};

const App = () => {
  const headerText = "Give Feedback";
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0
  });

  const sendFeedback = flag => {
    const newFeedback = { ...feedback };
    newFeedback[flag] = feedback[flag] + 1;
    newFeedback.all = newFeedback.all + 1;
    setFeedback(newFeedback);
  };

  return (
    <div>
      <Header text={headerText} />
      <Button onClick={() => sendFeedback("good")} text="Good" />
      <Button onClick={() => sendFeedback("neutral")} text="Neutral" />
      <Button onClick={() => sendFeedback("bad")} text="Bad" />
      <Statistics feedback={feedback} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
