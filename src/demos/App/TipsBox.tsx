import classNames from "classnames";

import { HookType } from "../../hook/types";
import { sectionContent } from "../UseCallbacks/sectionContent";

const TipsBox = ({ hookType }: { hookType?: HookType }) => {
  if (!hookType) {
    return null;
  }

  return (
    <div className={classNames("info-box", "bg-gray-300")}>
      <strong>💡 Tip:</strong>
      <div>{sectionContent[hookType].tips}</div>
    </div>
  );
};

export default TipsBox;
