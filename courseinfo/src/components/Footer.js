import React from "react";

const Footer = ({ parts }) => {
  const total = parts.reduce((a, b) => {
    return { exercises: a.exercises + b.exercises };
  }).exercises;

  return <h3>Number of exercises {total}</h3>;
};

export default Footer;
