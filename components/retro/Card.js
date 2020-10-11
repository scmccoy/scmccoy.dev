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
      <ButtonDelete onClick={
        () =>
          removeCard({
            variables: {
              cardId,
            },
          })
      }>Delete</ButtonDelete>
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
      {actions ? <UnorderedListAction>
        {actions.map(item => {
          return <ActionListItem key={item}><ButtonActionItemDelete onClick={() => removeAction({
            variables: {
              cardId: cardId,
              action: item
            }
          })}>X</ButtonActionItemDelete>{item}</ActionListItem>
        })}
      </UnorderedListAction> : null}
      
    </Container>
  )
}

/* *********
*  STYLES  *
********* */

const Container = styled.div`
  border: 3px solid lightblue;
  min-height: 5rem;
  position: relative;
`;
const Content = styled.p`
  color: red;
`;

const ButtonDelete = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const UnorderedListAction = styled.ul`
  padding-inline-start: 1rem;
`;

const ActionListItem = styled.li`
  list-style: none;
`;

const ButtonActionItemDelete = styled.button`
  margin-right: 0.5rem;
`;

export default Card;