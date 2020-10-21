import addToMailchimp from 'gatsby-plugin-mailchimp';
import React, { useState } from 'react';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import styled from '@emotion/styled';
import {
  Container,
  Content,
  Text,
  Row,
  Heading,
  ConfirmButton,
} from '../../../../components/Form';
import Input from '../../../../components/Input';

const Error = styled.div`
  color: ${(p) => p.theme.colors.error};
  font-size: 12px;

  a {
    color: ${(p) => p.theme.colors.error};
    text-decoration: underline;
  }

  ${mediaqueries.tablet`
    left: 50px;
    top: 50px;
  `}
`;

const compose = (...fns) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    (value) => value,
  );

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    addToMailchimp(email, {
      PATHNAME: '/blog',
      FNAME: name,
    })
      .then((data) => {
        if (data.result === 'error') {
          throw data;
        }

        setSubscribed(true);
        setEmail('');
        setName('');

        setTimeout(() => {
          setSubscribed(false);
        }, 6000);
      })
      .catch((err) => {
        setError(err.msg);
      });
  }

  const cleanError = () => setError('');

  const cleanSubscribed = () => setSubscribed(false);

  return (
    <Section narrow>
      <Container>
        <Content>
          <Heading>{`Newsletter Subscription 🚨`}</Heading>
          <Text>
            {`Gets notified in case I published a new article.
            I tend to write about my challenges inside the weird and fast
            Frontend world, from learning a specific tool or framework to
            building a project from scratch ✨`}
          </Text>
          <Text>
            I try to publish one article per month, if life does not get in the
            middle ...{' '}
            <b>
              No SPAM, no hiring, no application marketing, just tech posts.
            </b>
          </Text>
          <form onSubmit={handleSubmit} hasError={error}>
            <Row>
              <Input
                id="name"
                label="Name"
                pattern="name"
                onChange={compose(cleanError, cleanSubscribed, setName)}
                value={name}
              />

              <Input
                id="email"
                label="Email"
                type="email"
                pattern="email"
                onChange={compose(cleanError, cleanSubscribed, setEmail)}
                value={email}
              />
            </Row>
            <Row>
              {error && <Error dangerouslySetInnerHTML={{ __html: error }} />}
              <ConfirmButton type="submit" value="Send Message">
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </ConfirmButton>
            </Row>
          </form>
        </Content>
      </Container>
    </Section>
  );
};

export default Subscription;
