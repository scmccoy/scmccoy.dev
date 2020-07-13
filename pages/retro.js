import Layout from '../components/Layout'
import styled from 'styled-components';
import { withApollo } from "../lib/apollo";
// Components
import Header from '../components/retro/Header';
import Column from '../components/retro/Column';
import Footer from '../components/retro/Footer';
import Input from '../components/retro/Input';

const Retro = () => {
  return (
    <Container>
      <Header />
      <Input />
      <ColumnContainer >
        <Column category="upside" />
        <Column category="downside" />
        <Column category="improve" />
      </ColumnContainer>
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  border: 3px solid red;
`;
const ColumnContainer = styled.div`
  border: 3px solid yellowgreen;
  display: flex;
  
`;

export default withApollo(Retro);
