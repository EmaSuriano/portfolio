import React from 'react';

import NovelaSection from '@narative/gatsby-theme-novela/src/components/Section';

import {
  Container,
  Content,
  Text,
  Row,
  Heading,
  ConfirmButton,
} from '../components/Form';
import Input from '../components/Input';

const About = () => (
  <NovelaSection narrow>
    <Container>
      <Content>
        <Heading>
          <span role="img" aria-label="mail">
            ✉️
          </span>{' '}
          Contact me
        </Heading>
        <Text>
          You can always contact me via any of the social platform at the bottom
          of the page. But I also know that a solid contact form will never fail
          you!{' '}
          <span role="img" aria-label="muscle">
            💪
          </span>
        </Text>
        <Text>
          Just drop me a message of whatever you feel like, a cool project idea,
          technical questions or maybe you just want to get in contact with me,
          and I will go back to as soon as I can.
        </Text>
        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="bot-field" />

          <Row>
            <Input id="name" label="Name" pattern="name" />

            <Input id="email" label="Email" type="email" pattern="email" />
          </Row>

          <Row>
            <Input id="message" label="Message" type="textarea" />
          </Row>

          <Row>
            <ConfirmButton type="submit" value="Send Message">
              Send Message
            </ConfirmButton>
          </Row>
        </form>
      </Content>
    </Container>
  </NovelaSection>
);

export default About;
