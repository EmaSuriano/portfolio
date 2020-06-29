import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import styled from '../helpers/styled';

export const Container = styled.div`
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

export const Content = styled.div`
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

export const Text = styled.p`
  margin: 0 auto 30px;
  color: ${(p) => p.theme.colors.grey};
  line-height: 1.75;

  ${mediaqueries.tablet`
  padding: 0 26px;
  margin: 0 auto 25px;
`}
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;

  & > div {
    margin-right: 10px;
  }

  & > div:last-child {
    margin-right: 0px;
  }

  ${mediaqueries.tablet`
  flex-direction: column;
  padding: 0 26px;
  
  & > div {
    margin-right: 0px;
    margin-bottom: 10px;
  }

  & > div:last-child {
    margin-bottom: 0px;
  }
`}
`;

export const Heading = styled(Headings.h3)`
  margin-bottom: 20px;

  ${mediaqueries.tablet`
    margin-bottom: 15px;
  `}
`;

export const ConfirmButton = styled.button`
  height: 40px;
  margin: 10px 0;
  padding: 5px;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  background-color: transparent;
  transition: 0.3s border ease;
  color: ${(p) => p.theme.colors.accent};

  &[disabled] {
    cursor: not-allowed;
    color: ${(p) => p.theme.colors.secondary};
    border-bottom-color: ${(p) => p.theme.colors.secondary};
  }

  &:focus,
  &:hover {
    border-bottom-color: ${(p) => p.theme.colors.accent};
  }
`;
