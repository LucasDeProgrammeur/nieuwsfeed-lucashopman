import * as React from "react";
import { FunctionComponent } from "react";

interface SelectableProps {
  checked: any;
  setChecked: any;
  title: any;
  useBigFont?: boolean;
}

const Selectable: FunctionComponent<SelectableProps> = ({
  checked,
  setChecked,
  title,
  useBigFont = false,
}) => {
  const [localChecked, setLocalChecked] = React.useState(checked);

  React.useEffect(() => {
    setLocalChecked(checked);
  }, [checked]);
  return (
    <div className="fullWidth slightMargin">
      <label className="switch round">
        <input
          type="checkbox"
          checked={localChecked}
          onClick={() => setChecked()}
        />
        <span className="slider round"></span>
      </label>
      {useBigFont ? (
        <label
          className="selectableLabel unselectable clickable biggerFont"
          onClick={() => setChecked()}
        >
          {title}
        </label>
      ) : (
        <label
          className="selectableLabel unselectable clickable"
          onClick={() => setChecked()}
        >
          {title}
        </label>
      )}
    </div>
  );
};

export default Selectable;
