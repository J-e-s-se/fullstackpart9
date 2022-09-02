import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const getPartDetail = (part: CoursePart) => {
  switch (part.type) {
    case "normal":
      return <p>{part.description}</p>;

    case "groupProject":
      return <p>project exercises {part.groupProjectCount}</p>;

    case "submission":
      return (
        <div>
          <p>{part.description}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );

    case "special":
      return <p>required skills: {part.requirements.join()}</p>;

    default:
      return assertNever(part);
  }
};

const Part = ({ part }: { part: CoursePart }) => {
  const partDetail = getPartDetail(part);
  return (
    <div style={{ padding: "5px 0px 0px" }}>
      <p>
        <strong>
          {part.name} {part.exerciseCount}
        </strong>
        {partDetail}
      </p>
    </div>
  );
};

export default Part;
