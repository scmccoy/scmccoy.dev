import styled from 'styled-components';

/* TODO
*   1. Allow deletion of card
*   2. Action / Follow-up item added (on click of card - bring in input)
*   3. Allow UP / DOWN arrows (brighten/darken the card...)
*   4. 
*/

const Card = ({ statement }) => {
  return (
    <Container>
      <Content>{statement}</Content>
    </Container>
  )
}

const Container = styled.div`
  border: 3px solid lightblue;
  min-height: 5rem;
`;
const Content = styled.p`
  color: red;
`;

export default Card;