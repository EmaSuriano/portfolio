import React, { useState } from 'react';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import { copyToClipboard } from '@narative/gatsby-theme-novela/src/utils';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';
import styled from '../../../helpers/styled';

const isBrowser = typeof window !== 'undefined';

// Original component --> node_modules/@narative/gatsby-theme-novela/src/components/Subscription/Subscription.tsx
const Subscription = () => {
  const url = isBrowser ? window.location.href : '';
  const [hasCopied, setHasCopied] = useState(false);

  function copyToClipboardOnClick() {
    if (hasCopied) return;

    copyToClipboard(url);
    setHasCopied(true);

    setTimeout(() => setHasCopied(false), 1000);
  }

  const shareUrl = 'http://github.com';
  const title = 'GitHub';

  return (
    <Section narrow>
      <SubscriptionContainer>
        <Content>
          <Headings.h3>Share this article</Headings.h3>

          <IconContainer>
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <EmailShareButton url={shareUrl} subject={title} body="body">
              <EmailIcon size={32} round />
            </EmailShareButton>

            <RedditShareButton url={shareUrl} title={title}>
              <RedditIcon size={32} round />
            </RedditShareButton>
          </IconContainer>

          <Headings.h4>Or copy link</Headings.h4>
          <Form>
            <Input value={url} readOnly />
            <Button onClick={copyToClipboardOnClick} disabled={hasCopied}>
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Form>
        </Content>
      </SubscriptionContainer>
    </Section>
  );
};

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

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 30px 10px;

  & > button {
    padding: 10px !important;
    border: 1px solid ${(p) => p.theme.colors.track} !important;
    border-radius: 50%;
    transition: border-color 0.2s var(--ease-in-out-quad),
      background 0.2s var(--ease-in-out-quad),
      opacity 0.2s var(--ease-in-out-quad);
    opacity: 0.7;

    &:hover {
      background: ${(p) => p.theme.colors.inputBackground} !important;
      border: 1px solid ${(p) => p.theme.colors.accent} !important;
      opacity: 1;
    }
  }
`;

const Input = styled.input`
  position: relative;
  background: ${(p) => p.theme.colors.inputBackground};
  border-radius: 35px;
  border: none;
  padding: 13px 21px;
  width: 100%;
  color: ${(p) => p.theme.colors.grey};

  ${mediaqueries.tablet`
    width: calc(100% - 36px);
    margin: 0 18px;
    padding: 14px 14px 14px 30px;
    margin-bottom: 30px;
  `}
`;

const Button = styled.button`
  position: absolute;
  right: 4px;
  top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 38px;
  border: 1px solid ${(p) => p.theme.colors.accent};
  color: ${(p) => p.theme.colors.accent};
  background: ${(p) => p.theme.colors.background};
  font-weight: 600;
  border-radius: 35px;
  letter-spacing: 0.42px;
  transition: border-color 0.2s var(--ease-in-out-quad),
    background 0.2s var(--ease-in-out-quad), color 0.2s var(--ease-in-out-quad);
  opacity: 1;

  &:hover {
    background: ${(p) => p.theme.colors.accent};
    color: ${(p) => p.theme.colors.background};
  }

  &:disabled {
    opacity: 0.7;
  }

  svg * {
    fill: ${(p) => p.theme.colors.background};
  }

  ${(p) => mediaqueries.tablet`
    position: relative;
    height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0;
    border-top: 1px solid ${p.theme.colors.horizontalRule};

    &:hover {
      color: initial;
      background: initial;
    }
  `}
`;

const Form = styled.div`
  position: relative;
  margin: 20px 0;
`;

export default Subscription;
