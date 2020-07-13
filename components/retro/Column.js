import styled from 'styled-components';
import Card from './Card';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

/* TODO
*   1. IDEA: Expand a column to 2/3 - other 2 columns minimal view (but readable!)
*   2. Get Query for cards data
*/

const GET_CARDS = gql`
  query getCards {
    cards {
      _id
      statement
      category
    }
  }
`;

const Column = () => {
  const { data, loading, error } = useQuery(GET_CARDS);

  let displayCards = [];

  if (loading) {
    // do some loading stuff
  }
  if (error) {
    console.error('COLUMNS DATA: ', error)
  }
  if (data) {
    const { cards } = data;
    displayCards = cards;
  }
  return (
    <Container>
      <Title>Column</Title>
      {displayCards.map((card) => (
        <Card key={card._id} statement={card.statement} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  border: 3px solid yellow;
  min-height: 10rem;
  width: 100%;
`;
const Title = styled.h2`
  color: green;
`;

export default Column;