import React from "react"
import ReactDOM from 'react-dom'

interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>Hello, {props.courseName}</h1>;
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part: CoursePart
}

const Part: React.FC<PartProps> = (props) => {
  switch (props.part.name) {
    case "Fundamentals":
      return (
        <p>{props.part.name} {props.part.exerciseCount} {props.part.description}</p>
      );
    case "Using props to pass data":
      return (
        <p>{props.part.name} {props.part.exerciseCount} {props.part.groupProjectCount}</p>
      );
    case "Deeper type usage":
      return (
        <p>{props.part.name} {props.part.exerciseCount} {props.part.description} {props.part.exerciseSubmissionLink}</p>
      );
    case "Graphql":
      return (
        <p>{props.part.name} {props.part.exerciseCount} {props.part.description}</p>
      );
    default:
      assertNever(props.part)
  }
  return null
}

interface Course {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courses: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <ul>
      {props.courses.map(course =>
        <Part part={course}/>
      )}
    </ul>
  )
};

interface TotalProps {
  courses: Array<Course>
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}


interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "Graphql";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Graphql",
      exerciseCount: 12,
      description: "Graphql is a new awesome way to handle API's"
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courses={courseParts}/>
      <Total courses={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
