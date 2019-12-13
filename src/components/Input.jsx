import React, { useState } from 'react';
import styled from '@emotion/styled';

const Field = styled.div`
  width: 100%;
  border-radius: 4px;
  position: relative;
  background-color: ${p => p.theme.colors.background};
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;

  &:hover {
    background: ${p => p.theme.colors.hover};
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }

  input {
    width: 100%;
    height: 56px;
    position: relative;
    padding: 0px 16px;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    color: ${p => p.theme.colors.grey};
    outline: none;
    box-shadow: 0px 4px 20px 0px transparent;
    transition: 0.3s background-color ease, 0.3s box-shadow ease,
      0.3s padding ease;
    -webkit-appearance: none;
    resize: none;

    ${p => p.active && `padding: 24px 16px 8px 16px;`}
  }

  input::placeholder {
    color: ${p => (p.active ? 'transparent' : p.theme.colors.grey)};
  }

  .wrapper + label {
    position: absolute;
    top: 24px;
    left: 16px;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    color: transparent;
    opacity: 0;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    ${p =>
      p.active &&
      `
      top: 4px;
      opacity: 1;
      color: ${p.theme.colors.accent};
    `}
  }
`;

const Input = ({ label = '', id, pattern, type = 'text' }) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);

  return (
    <Field active={active || value}>
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
    </Field>
  );
};

export default Input;
