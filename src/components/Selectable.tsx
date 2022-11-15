import * as React from "react";
import { FunctionComponent } from "react";

interface SelectableProps {
  checked: any;
  setChecked: any;
  title: any;
}

const Selectable: FunctionComponent<SelectableProps> = ({
  checked,
  setChecked,
  title,
}) => {
  return (
    <div className="fullWidth slightMargin">
      <label className="switch round">
        <input
          type="checkbox"
          defaultChecked={checked}
          onClick={() => setChecked()}
        />
        <span className="slider round"></span>
      </label>
      <label
        className="selectableLabel unselectable clickable"
        onClick={() => setChecked(!checked)}
      >
        {title}
      </label>
    </div>
  );
};

export default Selectable;