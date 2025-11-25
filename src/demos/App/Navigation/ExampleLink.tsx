import { Link } from "react-router";
import "./navigation.css";

const ExampleLink = ({ label, path }: { label: string; path: string }) => {
  return (
    <Link className="nav-exampleLink" to={path}>
      {label}
    </Link>
  );
};

export default ExampleLink;
