import styled from 'styled-components';
import Card from './Card';

const Column = () => {
    return (
        <Container>
            <Title>Column</Title>
            <Card />
            <Card />
            <Card />
            <Card />
        </Container>
    )
}

const Container = styled.div`
  border: 3px solid yellow;
  min-height: 10rem;
  width: 100%;
`;
const Title = styled.h2`
  color: green;
`;

export default Column;