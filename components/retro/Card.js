import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Icon } from '@iconify/react';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import eyeIcon from '@iconify/icons-fa-solid/eye';

/* TODO
 *   1. DONE! Allow deletion of card
 *   2. DONE! Action / Follow-up item added (on click of card - bring in input)
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

const Card = ({ actions, statement, cardId, category }) => {
  // console.log('CARD: action: ', category);
  const [removeCard] = useMutation(REMOVE_CARD, {
    refetchQueries: ['getCards'],
  });
  const [addAction] = useMutation(ADD_ACTION, {
    refetchQueries: ['getCards'],
  });
  const [removeAction] = useMutation(REMOVE_ACTION, {
    refetchQueries: ['getCards'],
  });
  const [value, setValue] = useState('');

  const [focused, setFocused] = useState(false);

  const expandCard = () => {
    const elem = document.getElementById(cardId);
    console.log('Focused: ', focused);
    if (focused) {
      elem.style.position = 'relative';
      elem.style.zIndex = '0';
      elem.style.left = '0';
      elem.style.top = '0';
      elem.style.transform = 'scale(1)';
      setFocused(false);
      return;
    }
    elem.style.position = 'absolute';
    elem.style.zIndex = '999';
    elem.style.left = '40%';
    elem.style.top = '20%';
    elem.style.transform = 'scale(2)';
    setFocused(true);
  };
  return (
    <div id={cardId}>
      <Container category={category}>
        <Content>{statement}</Content>
        <ButtonDelete
          onClick={() =>
            removeCard({
              variables: {
                cardId,
              },
            })
          }
        >
          <Icon height="1rem" icon={trashAlt} />
        </ButtonDelete>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addAction({
              variables: {
                cardId: cardId,
                action: value,
              },
            });
            // reset action input value to empty
            setValue('');
          }}
        >
          <ButtonAddActionItem disabled={value.length === 0}>
            Action Item
          </ButtonAddActionItem>
          <InputAddAction
            type="text"
            placeholder="Add action..."
            name="action"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
        {actions ? (
          <UnorderedListAction>
            {actions.map((item) => {
              return (
                <ActionListItem key={item}>
                  <ButtonActionItemDelete
                    onClick={() =>
                      removeAction({
                        variables: {
                          cardId: cardId,
                          action: item,
                        },
                      })
                    }
                  >
                    <Icon
                      id="action-item-trash-can"
                      height="0.8rem"
                      icon={trashAlt}
                    />
                  </ButtonActionItemDelete>
                  {item}
                </ActionListItem>
              );
            })}
          </UnorderedListAction>
        ) : null}
        <ButtonExpandCard onClick={() => expandCard()}>
          <Icon icon={eyeIcon} />
        </ButtonExpandCard>
      </Container>
    </div>
  );
};

/* *********
 *  STYLES  *
 ********* */

const ButtonExpandCard = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  right: 0;
  bottom: 0.1rem;
`;

const Container = styled.div`
  border: ${(props) =>
    props.category === 'upside'
      ? '4px inset #e3ffe2f2'
      : props.category === 'downside'
      ? '4px inset #ffe2e7f2'
      : '4px inset #d4d6626b'};
  background: #d7e4e4;
  min-height: 5rem;
  max-width: 30rem;
  position: relative;
  padding: 0.5rem;
  margin: 0.3rem 0;
  & svg {
    // trashcan
    color: #ff2a2a85;
  }
  & svg:hover {
    color: #ff2a2a;
    height: 1.2rem;
    width: 1.2rem;
  }
  & svg#action-item-trash-can:hover {
    color: #ff2a2a;
    height: 1rem;
    width: 1rem;
  }
`;
const Content = styled.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

const ButtonDelete = styled.button`
  position: absolute;
  top: 0.4rem;
  right: 0;
  border: none;
  background: transparent;
`;

const ButtonAddActionItem = styled.button`
  border: none;
  margin-right: 0.5rem;
  color: #fff;
  background: #489e5b;
  padding: 0.2rem 0.3rem;
  & :hover {
    transform: scale(1.06);
  }
  & :disabled {
    background: #004cff57;
    transform: scale(1);
  }
`;

const InputAddAction = styled.input`
  border: none;
  & :focus {
    padding: 0.2rem;
    outline-color: #33333333;
  }
`;

const UnorderedListAction = styled.ul`
  padding-inline-start: 1rem;
`;

const ActionListItem = styled.li`
  list-style: none;
`;

const ButtonActionItemDelete = styled.button`
  margin-right: 0.5rem;
  border: none;
  background-color: transparent;
`;

export default Card;
