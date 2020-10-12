import styled from 'styled-components';
import Card from './Card';
import CardInput from './CardInput';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

/* TODO
 *   1. IDEA: Expand a column to 2/3 - other 2 columns minimal view (but readable!)
 *   2. DONE: Get Query for cards data 
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

const Column = ({ category }) => {
  const { data, loading, error } = useQuery(GET_CARDS);
  let displayCards = [];

  if (loading) {
    // do some loading stuff
  }
  if (error) {
    console.error('COLUMNS DATA: ', error);
  }
  if (data) {
    const { cards } = data;
    // console.log('CARDS: ', cards)
    cards.forEach((element) => {
      if (element.category === category) {
        displayCards.push(element);
      }
    });
  }

  return (
    <Container>
      <CardInput category={category} />
      {displayCards.map((card) => (
        <Card
          key={card._id}
          statement={card.statement}
          cardId={card._id}
          actions={card.actionItems}
          category={category}
        />
      ))}
    </Container>
  );
};

/* *********
 *  STYLES  *
 ********* */

const Container = styled.div`
  min-height: 10rem;
  width: 100%;
  margin: 0 0.3rem;
`;
const Title = styled.h2`
  text-transform: uppercase;
`;

export default Column;
