import classNames from "classnames";
import "./navigation.css";
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
    <Link className="nav-sectionLink" to={path} onClick={onClick}>
      <span>{label}</span>
      <span className={classNames("nav-sectionLinkArrow", isOpen && "open")}>
        {isOpen ? "⌄" : "›"}
      </span>
    </Link>
  );
};

export default SectionLink;
