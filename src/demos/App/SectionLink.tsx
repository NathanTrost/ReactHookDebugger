import classNames from "classnames";
import { Link } from "react-router";

const SectionLink = ({
  label,
  path,
  isOpen,
  onClick,
}: {
  label: string;
  path: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <Link
      className={classNames(
        "flex",
        "items-center",
        "justify-between",
        "w-full",
        "px-8",
        "py-4",
        "text-left",
        "text-lg",
        "font-semibold",
        "text-gray-300",
        "transition-colors",
        "hover:bg-gray-800",
        "hover:text-text-on-dark",
        "no-underline"
      )}
      to={path}
      onClick={onClick}
    >
      <span>{label}</span>
      <span className={classNames("text-blue-400", "text-4xl", "leading-none", "-mt-2")}>
        {isOpen ? "⌄" : "›"}
      </span>
    </Link>
  );
};

export default SectionLink;
