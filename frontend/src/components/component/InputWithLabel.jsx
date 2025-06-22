import Label from "../ui/Label";
import Input from "../ui/Input";

const InputWithLabel = ({ label, error, ...props }) => {
    return (
        <div className="mb-4 w-full max-w-md">
            {/*render label */}
            {/* <Label htmlFor={props.id || props.name} text={label}></Label> */}

            {/*render input */}
            <Input label={label} error={error} {...props} />
        </div>
    );
};

export default InputWithLabel;