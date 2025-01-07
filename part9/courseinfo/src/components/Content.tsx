import { CoursePart } from "../types/types";
import Part from "./Part";

const Content = ({ part }: { part: CoursePart }) => {
    return <Part part={part} />;
  };

export default Content;
