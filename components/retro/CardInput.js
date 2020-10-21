import styled from 'styled-components';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

/* TODO
 *   1. DONE: POST input text & radio btn selection to mongodb
 *   2. That's it. pretty simple
 */

const ADD_CARD = gql`
  mutation addCard($card: CardInput) {
    addCard(card: $card) {
      _id
      statement
      category
      actionItems
      # voteHappyTally
      # voteSadTally
      voteTally
    }
  }
`;

const CardInput = ({ category }) => {
  const [addCard] = useMutation(ADD_CARD, {
    refetchQueries: ['getCards'],
  });
  const [value, setValue] = useState('');

  return (
    <Form
      onSubmit={(data) => {
        data.preventDefault(),
          addCard({
            variables: {
              card: {
                statement: value,
                category: category,
                actionItems: [],
                voteTally: '0'
                // voteHappyTally: 0,
                // voteSadTally: 0,
              },
            },
          });
        // set input value to empty
        setValue('');
      }}
    >
      <Label htmlFor={category}>{category}</Label>
      <Input
        type="text"
        placeholder="Add text..."
        name={category}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Form>
  );
};

/* *********
 *  STYLES  *
 ********* */

const Form = styled.form`
  min-height: 2rem;
  display: flex;
`;

const Label = styled.label`
  margin-right: 1rem;
  border-radius: 3px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.5rem;
`;

const Input = styled.input`
  min-width: 15rem;
  border-top: none;
  border-right: none;
  border-left: none;
  background: #eeeeee85;
`;

export default CardInput;
