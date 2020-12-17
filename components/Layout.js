import Head from 'next/head';
import Nav from '../components/Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>S.McCoy Demos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
