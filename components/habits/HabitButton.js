// import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_EVENT = gql`
  mutation addEvent($date: Date, $habitId: ID) {
    addEvent(date: $date, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID, $habitId: ID) {
    removeEvent(eventId: $eventId, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const HabitButton = ({ date, habitId, events }) => {
  // console.log('Habit ID: ', habitId, events)
  // const [complete, setComplete] = useState(false);
  const [addEvent] = useMutation(ADD_EVENT, {
    refetchQueries: ["getHabits"],
  });

  const [removeEvent] = useMutation(REMOVE_EVENT, {
    refetchQueries: ["getHabits"],
  });

  const foundDate = events.find((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === date.getDate();
  });

  return (
    <span>
      {date.getMonth() + 1}/{date.getDate()}
      {foundDate ? (
        <button
          onClick={() =>
            removeEvent({
              variables: {
                habitId,
                eventId: foundDate._id,
              },
            })
          }
        >
          X
        </button>
      ) : (
        <button onClick={() => addEvent({ variables: { habitId, date } })}>
          O
        </button>
      )}
      <style jsx>{`
        span {
          display: flex;
          flex-direction: column;
        }
        span + span {
          margin-left: 10px;
        }
        button {
          border: none;
          margin-top: 1rem;
        }
      `}</style>
    </span>
  );
};

export default HabitButton;


// {"errors":[{"message":"Unknown argument \"eventId\" on field \"addEvent\" of type \"Mutation\".","locations":[{"line":2,"column":12}],"extensions":{"code":"GRAPHQL_VALIDATION_FAILED","exception":{"stacktrace":["GraphQLError: Unknown argument \"eventId\" on field \"addEvent\" of type \"Mutation\".","    at Object.Argument (/Users/shane.mccoy/OneDrive - Northwest Evaluation Association/Desktop/poc/nextjs-poc/node_modules/graphql/validation/rules/KnownArgumentNames.js:60:29)","    at Object.enter (/Users/shane.mccoy/OneDrive - Northwest Evaluation Association/Desktop/poc/nextjs-poc/node_modules/graphql/language/visitor.js:324:29)","    at Object.enter (/Users/shane.mccoy/OneDrive - Northwest Evaluation Association/Desktop/poc/nextjs-poc/node_modules/graphql/language/visitor.js:375:25)","    at visit (/Users/shane.mccoy/OneDrive - Northwest Evaluation Association/Desktop/poc/nextjs-poc/node_modules/graphql/language/visitor.js:242:26)","    at Object.validate (/Users/shane.mccoy/OneDrive - Northwest Evaluation Association/Desktop/poc/nextjs-poc/node_modules/graphql/validation/validate.js:73:24)","    at validate (/Users/shane.mccoy/OneDrive - Northwest Evaluation Association/Desktop/poc/nextjs-poc/node_modules/apollo-server-core/dist/requestPipeline.js:221:34)","    at Object.<anonymous> (/Users/shane.mccoy/OneDrive - Northwest Evaluation Association/Desktop/poc/nextjs-poc/node_modules/apollo-server-core/dist/requestPipeline.js:118:42)","    at Generator.next (<anonymous>)","    at fulfilled (/Users/shane.mccoy/OneDrive - Northwest Evaluation Association/Desktop/poc/nextjs-poc/node_modules/apollo-server-core/dist/requestPipeline.js:5:58)","    at process._tickCallback (internal/process/next_tick.js:68:7)"]}}}]}
