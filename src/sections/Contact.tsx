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
        <Heading>{`Contact ✉️`}</Heading>
        <Text>
          You can always contact me via any of the social platform at the bottom
          of the page. Nevertheless, if you prefer email communication you can
          use this contact form.
        </Text>
        <Text>
          Just drop me a message of whatever you feel like, a cool project idea,
          technical questions or maybe you just want to get in contact with me,
          and I will answer ASAP 🙏
        </Text>
        <form
          name="new-contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/success-form"
        >
          <input type="hidden" name="bot-field" />

          <input type="hidden" name="form-name" value="new-contact" />

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
