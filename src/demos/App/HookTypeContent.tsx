import classNames from "classnames";
import { sectionContent } from "../UseCallbacks/sectionContent";
import { HookType } from "../../hook/types";

const HookTypeContent = ({ hookType }: { hookType?: HookType }) => {
  if (!hookType) {
    return null;
  }

  const content = sectionContent[hookType];

  return (
    <div>
      <h2 className={classNames("underline", "underline-offset-6")}>{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
};

export default HookTypeContent;
