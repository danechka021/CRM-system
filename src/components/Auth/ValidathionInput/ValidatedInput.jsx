const ValidatedInput = ({ label, placeholder, type, id, isRequired }) => {
  return (
    <div>
      <label htmlFor={id}> {label} </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        required={isRequired}
      />
    </div>
  );
};

export default ValidatedInput;
