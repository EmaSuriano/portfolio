import React, { useState } from 'react';
// import styled from '@emotion/styled';
import './styles.css';

// const Field = styled.div`
//   width: 100%;
//   border-radius: 4px;
//   position: relative;
//   background: ${p => p.theme.colors.inputBackground};
//   color: ${p => p.theme.colors.primary};
//   transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;

//   &:hover {
//     background-color: ${p => p.theme.colors.hover};
//     /* TODO: pick a better hover color */
//     box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
//   }

//   $
// `;

const Input = ({ label = '', id, pattern, type = 'text' }) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);
  const fieldClassName = `field ${(active || value) && 'active'}`;

  return (
    <div className={fieldClassName}>
      <div className="wrapper">
        <input
          id={id}
          type={type}
          value={value}
          placeholder={label}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          required
          pattern={pattern}
        />
      </div>

      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
