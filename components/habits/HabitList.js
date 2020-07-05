import Habit from "./Habit";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_HABITS = gql`
  query getHabits {
    habits {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const HabitList = () => {
  const {data, loading, error } = useQuery(GET_HABITS);
  if(loading) {
    return <h1>Loading</h1>
  }

  if(error) {
    return <h1>Fool! You made an ERROR!</h1>
  }
  // console.log('HABITS: error ', error)
  // console.log('HABITS: data ', data)
  const { habits } = data;

  return (
    <section>
      <h2>My Habits</h2>
      {habits.map((habit, index) => (
        <Habit key={habit._id} habit={habit} index={index} />
      ))}

      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          margin: 1rem 2rem;
        }
      `}</style>
    </section>
  );
};

export default HabitList;
