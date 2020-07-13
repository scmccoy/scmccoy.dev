import styled from 'styled-components';

/* TODO
*   1. Clear entire board
*   2. Export current board (json?)
*/

const Header = () => {
    return (
        <Container>
            <Title>Retro</Title>
        </Container>
    )
}

const Container = styled.div`
  border: 3px solid blue;
  min-height: 4rem;
`;
const Title = styled.h2`
  color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Header;