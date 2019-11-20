import React from 'react';
import Section from '../components/Section';

const About = () => {
  // const [email, setEmail] = React.useState('');
  // const [name, setName] = React.useState('');

  return (
    <Section title="Get in Touch">
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="bot-field" />

        <label>
          Name
          <input type="text" name="name" id="name" required />
        </label>
        <label>
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
        </div>
      </form>
      {/* <form name="contact" method="POST" data-netlify="true">
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
      </form> */}
    </Section>
  );
};

export default About;
