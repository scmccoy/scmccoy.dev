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
      actionItems
    }
  }
`;

const Column = ({category}) => {
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
    // console.log('CARDS: ', cards)
    cards.forEach(element => {
      if(element.category === category) {
        displayCards.push(element);
      }
    });
  }
  
  return (
    <Container>
      <Title>{category}</Title>
      {displayCards.map((card) => (
        <Card key={card._id} statement={card.statement} cardId={card._id} actions={card.actionItems} />
      ))}
    </Container>
  )
}

/* *********
*  STYLES  *
********* */

const Container = styled.div`
  border: 3px solid yellow;
  min-height: 10rem;
  width: 100%;
`;
const Title = styled.h2`
  color: green;
`;

export default Column;