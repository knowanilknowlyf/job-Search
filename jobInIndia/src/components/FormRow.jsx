const FormRow = ({
  labelText,
  name,
  type,
  defaultValue,
  classNames,
  accept,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`form-input ${classNames}`}
        defaultValue={defaultValue || ""}
        accept={accept}
        required
      ></input>
    </div>
  );
};

export default FormRow;
