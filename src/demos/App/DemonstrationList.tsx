import { HookType } from "../../hook/types";
import { sectionContent } from "../UseCallbacks/sectionContent";

export const DemonstrationList = ({ hookType }: { hookType?: HookType }) => {
  if (!hookType) {
    return null;
  }

  const content = sectionContent[hookType];

  return (
    <div className="description-box">
      <p>
        <strong>This example demonstrates:</strong>
      </p>
      <ol>
        {content.demonstrates.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
};
