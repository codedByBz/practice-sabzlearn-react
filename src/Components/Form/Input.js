// Input.js

import React, { useEffect, useState } from "react";

import "./Input.css";

export default function Input(props) {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const allValid = props.validations.every((validation) => validation === true);  // بررسی همه بودن true
    setIsValid(allValid);  // استیت رو آپدیت میکنیم
  }, [props.validations]);

  return (
    <div>
      {
        props.element == 'textarea' ? (
          <textarea
            placeholder={props.placeholder}
            className={`${props.className} ${isValid ? "success" : "error"}`}
            value={props.value}
            onChange={(e) => { props.onChange(e.target.value) }}
          />
        ) : (
          <input
            type={props.type}
            placeholder={props.placeholder}
            className={`${props.className} ${isValid ? "success" : "error"}`}
            value={props.value}
            onChange={(e) => { props.onChange(e.target.value) }}
          />
        )
      }
    </div>
  );
}
