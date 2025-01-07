import { CoursePart } from "../types/types";
import { assertNever } from "../utils/helper";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>Proyectos en grupo: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>
            Material de fondo:{" "}
            <a
              href={part.backgroundMaterial}
              target='_blank'
              rel='noopener noreferrer'
            >
              {part.backgroundMaterial}
            </a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>Requirements: </p>
          <ul>
            {part.requirements.map((req) => (
              <li>{req}</li>
            ))}
          </ul>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
