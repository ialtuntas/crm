import React from "react";

export default function Custominput({
    title,
    type = "text",
    placeholder,
    value,
    handleChange,
    handleBlur,
}) {
    return (
        <div>
            <label htmlFor="floatingInput">{title}</label>
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                name={type}
                autoComplete="off"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    );
}
