import styled from 'styled-components';
import { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

/* TODO
*   1. POST input text & radio btn selection to mongodb
*   2. That's it. pretty simple
*/

const ADD_CARD = gql`
  mutation addCard($card: CardInput) {
    addCard(card: $card) {
      _id
      statement
      category
    }
  }
`;

const Input = () => {

    const [addCard] = useMutation(ADD_CARD, {
        refetchQueries: ['getCards']
    });

    const [value, setValue] = useState('');
    const [radioValue, setRadioValue] = useState('positive');

    return (
        <Form
            onSubmit={(data) => {
                addCard({
                    variables: {
                        card: {
                            statement: value,
                            category: radioValue,
                        },
                    },
                });
            }}
        >
            <label>Input
            <input type="text" placeholder="Add text..." name="statement" value={value} onChange={e => setValue(e.target.value)} /></label>
            <Fieldset id="group1">
                <label htmlFor="positive">Positive
                    <InputRadio id="positive" type="radio" value="positive" name="group1" checked={radioValue === "positive"} onChange={e => setRadioValue(e.target.value)} />
                </label>
                <label htmlFor="negative">Negative
                    <InputRadio id="negative" type="radio" value="negative" name="group1" checked={radioValue === "negative"} onChange={e => setRadioValue(e.target.value)} />
                </label>
                <label htmlFor="improve">Improvement
                    <InputRadio id="improve" type="radio" value="improve" name="group1" checked={radioValue === "improve"} onChange={e => setRadioValue(e.target.value)} />
                </label>
            </Fieldset>
        </Form>
    )
}

const Form = styled.form`
  border: 3px solid darkorange;
  min-height: 3rem;
  display: flex;
`;

const Fieldset = styled.fieldset`
  border: 3px solid bisque;
  min-height: 3rem;
  width: 100%;
`;

const InputRadio = styled.input`
  margin-right: 4rem;
`;

export default Input;