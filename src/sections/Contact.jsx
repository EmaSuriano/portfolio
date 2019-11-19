import React from 'react';
import Section from '../components/Section';

const About = () => {
  // const [email, setEmail] = React.useState('');
  // const [name, setName] = React.useState('');

  return (
    <Section title="Get in Touch">
      <form name="contact" method="POST" data-netlify="true">
        <label>
          Your Name: <input type="text" name="name" />
        </label>
        <label>
          Your Email: <input type="email" name="email" />
        </label>
        <div>
          <label>
            Message: <textarea name="message"></textarea>
          </label>
          <button type="submit">Send</button>
        </div>
      </form>
    </Section>
  );
};

export default About;
