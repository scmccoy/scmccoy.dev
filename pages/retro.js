import styled from 'styled-components';
import { withApollo } from '../lib/apollo';
// Components
import Header from '../components/retro/Header';
import Column from '../components/retro/Column';
import Footer from '../components/retro/Footer';

const Retro = () => {
  return (
    <Container>
      <Header />
      <ColumnContainer>
        <Overlay id="overlay" />
        {/* Set category names here */}
        <Column category="downside" />
        <Column category="upside" />
        <Column category="ideas" />
      </ColumnContainer>
      <Footer />
    </Container>
  );
};

const Overlay = styled.div`
  display: none;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: rgb(255 255 255 / 50%);
  z-index: 100;
`;

const Container = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  color: #333;
`;
const ColumnContainer = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 3.5rem;
`;

export default withApollo(Retro);
