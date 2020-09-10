// import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

/* TODO
*   1. DONE! Allow deletion of card
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
// const ADD_ACTION = gql`
//   mutation addAction($cardId: ID, $action: String) {
//     addAction(cardId: $cardId, action: $action) {
//       _id
//       action
//     }
//   }
// `;

const Card = ({ actions, statement, cardId }) => {

  const [removeCard] = useMutation(REMOVE_CARD, {
    refetchQueries: ["getCards"],
  });
  // const [addAction] = useMutation(ADD_ACTION, {
  //   refetchQueries: ['getCards']
  // });
  // const [value, setValue] = useState('');
  // console.log("actions: ", actions)
  // console.log("value: ", value)

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
      {/* <form
        onSubmit={() => {
          console.log('Hello from Action Item submit')
          addAction({
            variables: {
              card: {
                _id: cardId,
                action: value,
              },
            },
          });
        }}
      >
        <button>Action Item</button>
        <input type="text" placeholder="Add action..." name="action" value={value} onChange={e => setValue(e.target.value)} />
      </form>
      <ul>{actions.map((item, index) => {
        return <ActionItems key={index} >{item}</ActionItems>
      })}
      </ul> */}
    </Container>
  )
}

/* *********
*  STYLES  *
********* */

const Container = styled.div`
  border: 3px solid lightblue;
  min-height: 5rem;
`;
const Content = styled.p`
  color: red;
`;
// const ActionItems = styled.li`
//   border: 2px solid purple;
//   width: 80%;
//   margin: 1rem;
// `;

export default Card;