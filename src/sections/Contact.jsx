import React from 'react';
import styled from '@emotion/styled';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import NovelaSection from '@narative/gatsby-theme-novela/src/components/Section';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';

import Input from '../components/Input';

const REGEX_EXPRESSIONS = {
  name: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
  email: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2, 4}$',
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 64px 0 55px;
  margin: 10px auto 100px;
  background: ${p => p.theme.colors.card};
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
  z-index: 1;

  ${mediaqueries.tablet`
    padding: 50px 0 0;
    text-align: center;
  `}

  ${mediaqueries.phablet`
    margin: -20px auto 80px;
  `}
`;

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;

  ${mediaqueries.tablet`
    h3 {
      padding: 0 50px;
    }
  `}

  ${mediaqueries.phone`
    h3 {
      padding: 0 24px;
    }
  `}
`;

const Heading = styled(Headings.h3)`
  margin-bottom: 20px;

  ${mediaqueries.tablet`
    margin-bottom: 15px;
  `}
`;

const Text = styled.p`
  margin: 0 auto 30px;
  color: ${p => p.theme.colors.grey};
  line-height: 1.75;

  ${mediaqueries.tablet`
    padding: 0 26px;
    margin: 0 auto 25px;
  `}
`;

const About = () => (
  <NovelaSection narrow>
    <Container>
      <Content>
        <Heading>Get in Touch</Heading>
        <Text>
          Do you want to contact me directly? Just fill out the following form
          and I will reply as soon as possible!
        </Text>
        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          style={{ zIndex: 1, position: 'relative' }}
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
        </form>
      </Content>
    </Container>
  </NovelaSection>
);

export default About;
