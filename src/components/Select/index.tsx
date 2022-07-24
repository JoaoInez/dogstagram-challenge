import { ActionMeta, default as ReactSelect, SingleValue } from "react-select";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  options?: Option[];
  onChange: (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
};

const Select = ({ options, onChange }: Props) => {
  return (
    <ReactSelect
      isClearable
      options={
        options?.length ? options : [{ value: "loading", label: "Loading" }]
      }
      onChange={onChange}
    />
  );
};

export default Select;
