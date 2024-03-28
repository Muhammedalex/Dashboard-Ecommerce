import React from "react";

const CustomInput = ({ onBlur , onChange ,type, label, i_id, i_class , name , value }) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
       className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
