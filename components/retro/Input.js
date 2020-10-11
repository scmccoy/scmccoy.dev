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
    }
  }
`;

const Input = () => {
  const [addCard] = useMutation(ADD_CARD, {
    refetchQueries: ['getCards'],
  });

  const [value, setValue] = useState('');
  const [radioValue, setRadioValue] = useState('upside');

  return (
    <Form
      onSubmit={(data) => {
        console.log('DATA: ', data);
        data.preventDefault(),
          addCard({
            variables: {
              card: {
                statement: value,
                category: radioValue,
                actionItems: [],
              },
            },
          });
        // set input value to empty
        setValue('');
      }}
    >
      <label>
        Input
        <input
          type="text"
          placeholder="Add text..."
          name="statement"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <Fieldset id="group1">
        <InputRadio
          id="upside"
          type="radio"
          value="upside"
          name="upside"
          checked={radioValue === 'upside'}
          onChange={(e) => setRadioValue(e.target.value)}
        />
        <Label htmlFor="upside">Upside</Label>
        <InputRadio
          id="downside"
          type="radio"
          value="downside"
          name="downside"
          checked={radioValue === 'downside'}
          onChange={(e) => setRadioValue(e.target.value)}
        />
        <Label htmlFor="downside">Downside</Label>
        <InputRadio
          id="ideas"
          type="radio"
          value="ideas"
          name="ideas"
          checked={radioValue === 'ideas'}
          onChange={(e) => setRadioValue(e.target.value)}
        />
        <Label htmlFor="ideas">Ideas</Label>
      </Fieldset>
    </Form>
  );
};

/* *********
 *  STYLES  *
 ********* */

const Form = styled.form`
  min-height: 3rem;
  display: flex;
`;

const Fieldset = styled.fieldset`
  min-height: 3rem;
  width: 100%;
  border: none;
`;

const Label = styled.label`
  width: 200px;
  border-radius: 3px;
  border: 1px solid #d1d3d4;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;
  font-size: 1.3rem;
  margin-right: 1rem;
`;

const InputRadio = styled.input`
  margin-right: 4rem;

  & :empty {
    margin-left: -999px;
  }

  & :empty ~ label {
    position: relative;
    float: left;
    line-height: 3rem;
    text-indent: 3.25rem;
    margin-top: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  & :checked + label {
    background-color: #4dcb6d;
  }

  & + label {
    background-color: #ff2a2a85;
  }
`;

export default Input;
