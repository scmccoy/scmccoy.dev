import Layout from '../components/Layout'
import styled from 'styled-components';
import { withApollo } from "../lib/apollo";
// Components
import Header from '../components/retro/Header';
import Column from '../components/retro/Column';
import Footer from '../components/retro/Footer';
import CardInput from '../components/retro/CardInput';

const Retro = () => {
  return (
    <Container>
      <Header />
      {/* <CardInput /> */}
      <ColumnContainer >
      {/* Set category names here */}
        <Column category="downside" />
        <Column category="upside" />
        <Column category="ideas" />
      </ColumnContainer>
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  color: #333;
`;
const ColumnContainer = styled.div`
  display: flex;
  position: relative;
  
`;

export default withApollo(Retro);
