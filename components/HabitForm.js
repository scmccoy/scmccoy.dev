import { Form, Field } from "@leveluptuts/fresh";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_HABIT = gql`
  mutation addHabit($habit: HabitInput) {
    addHabit(habit: $habit) {
      _id
      name
    }
  }
`;

const HabitForm = () => {
  const [addHabit] = useMutation(ADD_HABIT, {
    refetchQueries: ['getHabits']
  });

  return (
    <div className="form-style">
      <Form
        onSubmit={(data) => {
          addHabit({
            variables: {
              habit: {
                name: data.habit,
              },
            },
          });
          // console.log("DATA in Form: ", data);
          // setHabits((prevState) => [...prevState, data.habit]);
        }}
      >
        <Field>Habit</Field>
      </Form>
      <style jsx>{`
        .form-style {
          margin: 0 2rem;
        }
      `}</style>
    </div>
  );
};

export default HabitForm;
