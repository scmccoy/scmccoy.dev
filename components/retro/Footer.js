import styled from 'styled-components';

const Footer = ({ id, cardTotal, actionTotal }) => {
  return (
    <Container id={id}>
      <Content>
        {cardTotal} card{cardTotal > 1 || cardTotal === 0 ? 's' : ''} and{' '}
        {actionTotal} action item
        {actionTotal > 1 || actionTotal === 0 ? 's' : ''}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  min-height: 2rem;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #333;
  &#downside {
    height: 2rem;
    left: 0;
    width: 33%;
  }
  &#upside {
    height: 3rem;
    left: 33%;
    width: 33%;
    border-left: 2px solid #333;
    border-top-left-radius: 0.5rem;
  }
  &#ideas {
    height: 4rem;
    left: 66%;
    border-left: 2px solid #333;
    border-top-left-radius: 0.5rem;
    right: 0;
  }
`;
const Content = styled.h2`
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;
