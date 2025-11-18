import classNames from "classnames";
import { Link } from "react-router";

const ExampleLink = ({ label, path }: { label: string; path: string }) => {
  return (
    <Link
      className={classNames(
        "block",
        "px-12",
        "py-2",
        "text-gray-400",
        "transition-colors",
        "hover:text-text-on-dark",
        "no-underline"
      )}
      to={path}
    >
      {label}
    </Link>
  );
};

export default ExampleLink;
