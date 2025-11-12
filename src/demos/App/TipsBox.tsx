import classNames from "classnames";

import { HookType } from "../../hook/types";

const TipsBox = ({ hookType }: { hookType?: HookType }) => {
  if (!hookType) {
    return null;
  }

  const hookMessages = {
    useEffect: `Open you browser console to see detailed logs about when each useEffect runs.
    This includes render count, mount count, changed dependencies which triggered the useEffect,
    and processing time associated with useEffect logic.`,
    useMemo: `Open your browser console to see when each
        memoized value is recalculated. Notice that changing unrelated state
        doesn't trigger recalculation!`,
    useCallback: `Open your browser console to see detailed logs about when each
        callback is recreated and which dependencies changed!`,
  };

  return (
    <div className={classNames("info-box", "bg-gray-300")}>
      <strong>💡 Tip:</strong>
      <div>{hookMessages[hookType]}</div>
    </div>
  );
};

export default TipsBox;
