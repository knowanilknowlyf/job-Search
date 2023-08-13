
const FormSelectRow = ({ labelText, name, defaultValue='',options }) => {
  return (

  <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText}</label>
            <select name={name} id={name} defaultValue={defaultValue} className="form-select" >
                {Object.values(options).map(val=>{
                return <option key={val} value={val}>{val}</option>
                })}
            </select>
          </div>

    
  );
};

export default FormSelectRow;
