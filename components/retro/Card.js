import styled from 'styled-components';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

/* TODO
*   1. Allow deletion of card
*   2. Action / Follow-up item added (on click of card - bring in input)
*   3. Allow UP / DOWN arrows (brighten/darken the card...)
*   4. 
*/

const REMOVE_CARD = gql`
  mutation removeCard($cardId: ID) {
    removeCard(cardId: $cardId) {
      _id
      statement
      category
    }
  }
`;

const Card = ({ statement, cardId }) => {

  const [removeCard] = useMutation(REMOVE_CARD, {
    refetchQueries: ["getCards"],
  });

  return (
    <Container>
      <Content>{statement}</Content>
      <button onClick={
        () =>
        removeCard({
          variables: {
            cardId,
          },
        })
      }>Delete</button>
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