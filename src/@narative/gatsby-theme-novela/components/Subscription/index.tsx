import React from 'react';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import styled from '@emotion/styled';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';

const Subscription = () => (
  <Section narrow>
    <SubscriptionContainer>
      <Content>
        <Heading>Share this article</Heading>
      </Content>
    </SubscriptionContainer>
  </Section>
);

const SubscriptionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 64px 0 55px;
  margin: 10px auto 100px;
  background: ${(p) => p.theme.colors.card};
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

export default Subscription;
