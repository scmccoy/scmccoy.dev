import styled from 'styled-components';

const Footer = () => {
    return (
        <Container>
            <Content>Footer Content</Content>
        </Container>
    )
}

const Container = styled.div`
  border: 3px solid darkkhaki;
  min-height: 2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;
const Content = styled.p`
  color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;