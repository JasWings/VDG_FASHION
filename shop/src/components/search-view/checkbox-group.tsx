import React, { useCallback } from 'react';

interface Props {
  values: string[];
  onChange: (value: string[]) => void;
  children?: React.ReactNode;
}
interface EnrichedChildren {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  checked: boolean;
  value: string;
  children?: React.ReactNode;
}
const CheckboxGroup: React.FC<Props> = ({ children, value, onChange }) => {
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value; // Get the current checkbox value
      console.log("Clicked value:", newValue,children);
      if (value !== newValue) {
        onChange(newValue); // Update only if the value changes
      }
    },
    [onChange, value] // Ensure the callback reflects the latest `value`
  );

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<EnrichedChildren>(child)) {
          return child;
        }
        const isChecked = value === child.props.value;
        // console.log(
        //   "Rendering child:",
        //   child.props.value,
        //   "Checked:",
        //   isChecked
        // );
        return React.cloneElement(child, {
          onChange: onChangeHandler,
          checked: isChecked,
        });
      })}
    </>
  );
};



export default CheckboxGroup;
