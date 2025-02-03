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
      const { value } = e.target;
      onChange(value); // Directly pass the single value
    },
    [onChange]
  );

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<EnrichedChildren>(child)) {
          return child;
        }
        return React.cloneElement(child, {
          onChange: onChangeHandler,
          checked: value === child.props.value, // Single selection check
        });
      })}
    </>
  );
};


export default CheckboxGroup;
