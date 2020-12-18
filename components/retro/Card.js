import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Icon } from '@iconify/react';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import expandIcon from '@iconify/icons-fa-solid/expand-alt';
import CardVote from './CardVote';

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

const Card = ({ actions, statement, cardId, category, voteTallyUp, voteTallyDown }) => {
  // console.log('CARD: voteTallyUp: ', voteTallyUp);
  const [removeCard] = useMutation(REMOVE_CARD, {
    refetchQueries: ['getCards'],
  });
  const [addAction] = useMutation(ADD_ACTION, {
    refetchQueries: ['getCards'],
  });
  const [removeAction] = useMutation(REMOVE_ACTION, {
    refetchQueries: ['getCards'],
  });

  // Action item input
  const [value, setValue] = useState('');
  // card focus
  const [focused, setFocused] = useState(false);

  const expandCard = () => {
    const cardElem = document.getElementById(cardId);
    const overlay = document.getElementById('overlay');

    if (focused) {
      cardElem.style.position = 'relative';
      cardElem.style.zIndex = '0';
      cardElem.style.left = '0';
      cardElem.style.top = '0';
      cardElem.style.transform = 'scale(1)';
      // overlay
      overlay.style.display = 'none';

      setFocused(false);
      return;
    }
    cardElem.style.position = 'fixed';
    cardElem.style.zIndex = '999';
    cardElem.style.left = '40%';
    cardElem.style.top = '20%';
    cardElem.style.transform = 'scale(2)';
    // overlay
    overlay.style.display = 'block';
    setFocused(true);
  };

  const deleteButtonDisable = {
    display: 'none',
  };

  return (
    <div id={cardId}>
      <Container category={category}>
        <MainContent>
          <Statement>{statement}</Statement>
          <hr />

          <ActionContainer>
            <ActionForm
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
              <ButtonAddActionItem disabled={value.length === 0}>Action Item</ButtonAddActionItem>
              <InputAddAction
                type="text"
                placeholder="..."
                name="action"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </ActionForm>
          </ActionContainer>
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
                      <Icon height="0.8rem" icon={trashAlt} />
                    </ButtonActionItemDelete>
                    {item}
                  </ActionListItem>
                );
              })}
            </UnorderedListAction>
          ) : null}
        </MainContent>
        <SideContent>
          <ButtonDelete
            style={focused ? deleteButtonDisable : null}
            onClick={() =>
              removeCard({
                variables: {
                  cardId,
                },
              })
            }
          >
            <Icon id="trashcan-delete" height="1rem" icon={trashAlt} />
          </ButtonDelete>
          <ButtonExpandCard onClick={() => expandCard()}>
            <Icon id="expand-icon" icon={expandIcon} />
          </ButtonExpandCard>
          <CardVote cardId={cardId} voteTallyUp={voteTallyUp} voteTallyDown={voteTallyDown} />
        </SideContent>
      </Container>
    </div>
  );
};

/* **********
 *  STYLES  *
 ********* */

const MainContent = styled.div`
  width: 88%;
`;
const SideContent = styled.div`
  width: 12%;
  position: relative;
  border-left: 1px solid #33333315;
`;
const ActionContainer = styled.div`
  display: flex;
  width: 100%;
`;
const ActionForm = styled.form`
  display: flex;
  width: 100%;
`;

const ButtonExpandCard = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  bottom: 5px;
  right: 5px;
  visibility: hidden;
`;

const Container = styled.div`
  border-color: ${(props) =>
    props.category === 'upside' ? '#80bf7ef2' : props.category === 'downside' ? '#ffb0bdf2' : '#0000006b'};
  border-width: 4px 0 0 4px;
  border-style: solid;
  background: #d7e4e4;
  border-radius: 1.5rem;
  min-height: 7rem;
  max-width: 30rem;
  position: relative;
  padding: 0.5rem;
  margin: 1rem 0;
  display: flex;
  & svg {
    color: #ff2a2a85;
  }
  & svg:focus,
  button:focus {
    outline: none;
  }
  :hover svg#trashcan-delete, :hover svg#expand-icon {
    visibility: visible;
  }
  & svg:hover {
    color: #ff2a2a;
  }
`;
const Statement = styled.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

const ButtonDelete = styled.button`
  position: absolute;
  top: 0.2rem;
  right: 0;
  width: 85%;
  & svg {
    visibility: hidden;
  }
`;

const ButtonAddActionItem = styled.button`
  border: none;
  border-radius: 0.4rem;
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
  border-top: none;
  border-right: none;
  border-left: none;
  background: #eeeeee85;
  width: 74%;
  & :focus {
    padding: 0.2rem;
    outline-color: #33333333;
  }
`;

const UnorderedListAction = styled.ul`
  padding-inline-start: 1rem;
  margin-bottom: 0;
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
