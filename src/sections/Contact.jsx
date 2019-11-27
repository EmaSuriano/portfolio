import React, { useState } from 'react';
import Section from '../components/Section';
import styled from '@emotion/styled';
import './styles.css';

const REGEX_EXPRESSIONS = {
  name: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
  email: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2, 4}$',
};

const Input = ({ label = '', id, pattern, type = 'text' }) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);
  const fieldClassName = `field ${(active || value) && 'active'}`;
  const Element = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={fieldClassName}>
      <div className="wrapper">
        <Element
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

const About = () => (
  <Section title="Get in Touch">
    <form
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      style={{ background: 'red', zIndex: 1, position: 'relative' }}
    >
      <input type="hidden" name="bot-field" />

      <Input id="name" label="Name" pattern={REGEX_EXPRESSIONS.name} />
      <Input
        id="email"
        label="Email"
        type="email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      />
      <Input id="message" label="Message" type="textarea" />
      <ul>
        <li>
          <input type="submit" value="Send Message" className="special" />
        </li>
        <li>
          <input type="reset" value="Clear" />
        </li>
      </ul>
      {/* <Field>
        <label>
          Name
          <input type="text" name="name" id="name" placeholder="Name" />
        </label>
      </Field> */}

      {/* <label>
        Email
        <input type="text" name="email" id="email" required />
      </label>
      <div>
        <label>
          Message
          <textarea name="message" id="message" rows="6" required />
        </label>
        <ul className="actions">
          <li>
            <input type="submit" value="Send Message" className="special" />
          </li>
          <li>
            <input type="reset" value="Clear" />
          </li>
        </ul>
      </div> */}
    </form>
  </Section>
);

export default About;
