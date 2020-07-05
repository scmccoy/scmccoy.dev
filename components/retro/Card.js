import styled from 'styled-components';

const Card = () => {
    return (
        <Container>
            <Title>Card</Title>
        </Container>
    )
}

const Container = styled.div`
  border: 3px solid lightblue;
  min-height: 5rem;
`;
const Title = styled.h2`
  color: red;
`;

export default Card;