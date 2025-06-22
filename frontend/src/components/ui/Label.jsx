
const Label = ({ htmlFor, text }) => {
    if (!text) return null;

    return (
        <label htmlFor= {htmlFor} className="block text-sm font-medium text-white mb-1 md:text-base">
            {text}
        </label>
    );
};

export default Label;