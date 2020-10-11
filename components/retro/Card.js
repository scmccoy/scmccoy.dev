import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

/* TODO
*   1. DONE! Allow deletion of card
*   2. Action / Follow-up item added (on click of card - bring in input) IN PROGRESS
*   3. Allow UP / DOWN arrows (brighten/darken the card...)
*   4. 
*/

const REMOVE_CARD = gql`
  mutation removeCard($cardId: ID) {
    removeCard(cardId: $cardId) {
      _id
      statement
      category
      actionItems
    }
  }
`;
const ADD_ACTION = gql`
  mutation addAction($cardId: ID, $action: String) {
    addAction(cardId: $cardId, action: $action) {
      _id
      actionItems
    }
  }
`;
const REMOVE_ACTION = gql`
  mutation removeAction($cardId: ID, $action: String) {
    removeAction(cardId: $cardId, action: $action) {
      _id
      actionItems
    }
  }
`;

const Card = ({ actions, statement, cardId }) => {
  // console.log('CARD: action: ', actions, statement, cardId)
  const [removeCard] = useMutation(REMOVE_CARD, {
    refetchQueries: ["getCards"],
  });
  const [addAction] = useMutation(ADD_ACTION, {
    refetchQueries: ['getCards']
  });
  const [removeAction] = useMutation(REMOVE_ACTION, {
    refetchQueries: ['getCards']
  })
  const [value, setValue] = useState('');
  
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
      <form
        onSubmit={(event) => {
          event.preventDefault()
          addAction({
            variables: {
                cardId: cardId,
                action: value,
            },
          });
        }}
      >
        <button disabled={value.length === 0}>Action Item</button>
        <input type="text" placeholder="Add action..." name="action" value={value} onChange={e => setValue(e.target.value)} />
      </form>
      {actions ? <ul>
        {actions.map(item => {
          return <li key={item}><button onClick={() => removeAction({
            variables: {
              cardId: cardId,
              action: item
            }
          })}>X</button>{item}</li>
        })}
      </ul> : null}
      
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

export default Card;