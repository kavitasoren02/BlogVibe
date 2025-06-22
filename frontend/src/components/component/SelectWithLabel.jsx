import Label from "../ui/Label";
import Select from "../ui/Select";

const SelectWithLabel = ({ label, options, error, ...props }) => {
  return (
    <div className="mb-4 w-full max-w-md">
      <Label htmlFor={props.id || props.name} text={label} />

      <Select
      options={options}
      error={error}
      {...props}/>
    </div>
  );
};

export default SelectWithLabel;

