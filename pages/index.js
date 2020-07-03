import Layout from "../components/Layout";
import { withApollo } from "../lib/apollo";
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import HabitList from "../components/HabitList";
import HabitForm from "../components/HabitForm";

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  // const [habits, setHabits] = useState(["Do the Dishes"]);

  if (loading) return <h1>Loading</h1>;
  console.log("DATA: ", data);
  return (
    <Layout>
      <div className="container">
        <h1 className="title">OH NO!</h1>
        <HabitForm />
        <HabitList />

        {/* scoped CSS */}
        <style jsx>{`
          .container {
            // min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            // align-items: center;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default withApollo(Home);
