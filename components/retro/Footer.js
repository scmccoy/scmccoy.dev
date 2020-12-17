import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

/* TODO
 *   1. Export Card text and action items - functioning - needs error reporting cleanup etc
 *   2. Delete all cards in DB
 */

const GET_CARDS = gql`
  query getCards {
    cards {
      statement
      category
      actionItems
    }
  }
`;
const Footer = () => {
  const { data, loading, error } = useQuery(GET_CARDS);
  if (loading) {
    // do some loading stuff
  }
  if (error) {
    console.error('Footer query', error);
  }

  const handleExport = (event) => {
    event.preventDefault();
    const exportableData = [];
    data.cards.forEach((element) => {
      exportableData.push({
        category: element.category,
        statement: element.statement,
        action_items: element.actionItems,
      });
    });

    const getDate = new Date().toLocaleDateString();
    const name = `retro-export-${getDate.replace(/\//g, '-')}.json`;
    const dataToDownload = JSON.stringify(exportableData);
    const element = document.createElement('a');
    element.href = URL.createObjectURL(new Blob([dataToDownload], { type: `application/json` }));
    element.download = name;
    element.click();
  };

  return (
    <Container>
      <PositioningContainer>
        {/* <CslearButton>Clear All Cards</CslearButton> */}
        <ExportButton onClick={handleExport}>Export All Cards</ExportButton>
      </PositioningContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ccc;
  border-top: 2px solid #333;
  bottom: 0;
  height: 4rem;
  position: fixed;
  right: 0;
  width: 100%;
`;

const PositioningContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: start;
  padding: 0 2rem;
`;
const ExportButton = styled.button`
  background: #fff;
  padding: 0.5rem;
`;
const ClearButton = styled.button``;

export default Footer;
