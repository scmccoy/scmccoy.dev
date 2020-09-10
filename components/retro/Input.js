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
    #   actionItems {
    #       action
    #   }
    }
  }
`;

const Input = () => {

    const [addCard] = useMutation(ADD_CARD, {
        refetchQueries: ['getCards']
    });

    const [value, setValue] = useState('');
    const [radioValue, setRadioValue] = useState('upside');

    return (
        <Form
            onSubmit={(data) => {
                addCard({
                    variables: {
                        card: {
                            statement: value,
                            category: radioValue,
                            // actionItems: []
                        },
                    },
                });
            }}
        >
            <label>Input
            <input type="text" placeholder="Add text..." name="statement" value={value} onChange={e => setValue(e.target.value)} /></label>
            <Fieldset id="group1">
                <label htmlFor="upside">Upside
                    <InputRadio id="upside" type="radio" value="upside" name="group1" checked={radioValue === "upside"} onChange={e => setRadioValue(e.target.value)} />
                </label>
                <label htmlFor="downside">Downside
                    <InputRadio id="downside" type="radio" value="downside" name="group1" checked={radioValue === "downside"} onChange={e => setRadioValue(e.target.value)} />
                </label>
                <label htmlFor="improve">Improve
                    <InputRadio id="improve" type="radio" value="improve" name="group1" checked={radioValue === "improve"} onChange={e => setRadioValue(e.target.value)} />
                </label>
            </Fieldset>
        </Form>
    )
}

/* *********
*  STYLES  *
********* */

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