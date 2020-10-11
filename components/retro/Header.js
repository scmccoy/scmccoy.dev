import styled from 'styled-components';

/* TODO
*   1. Clear entire board
*   2. Export current board (json?)
*/

const Header = () => {
    return (
        <Container>
            <Title>Team MacGyver Retro-board</Title>
        </Container>
    )
}

const Container = styled.div`
  min-height: 4rem;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Header;