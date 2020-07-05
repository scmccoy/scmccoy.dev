import styled from 'styled-components';

const Input = () => {
    return (
        <Container>
            <label>Input</label>
            <input type="text" placeholder="Add text..." />
            <Fieldset id="group1">
                <label>Positive</label>
                <InputRadio type="radio" value="value1" name="group1" />
                <label>Negative</label>
                <InputRadio type="radio" value="value2" name="group1" />
                <label>Improvement</label>
                <InputRadio type="radio" value="value3" name="group1" />
            </Fieldset>
        </Container>
    )
}

const Container = styled.form`
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