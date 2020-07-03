import { Fragments } from "react";
import { withApollo } from "../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";

/* See lib/apollo.js to reapply reddit url to work here */

const REDDIT_QUERY = gql`
  query RedditQuery {
    reddit {
      subreddit(name: "reactjs") {
        subscribers
        topListings {
          title
          url
        }
      }
    }
  }
`;
const RedditReact = () => {
  const { data, loading, error } = useQuery(REDDIT_QUERY);
  if (loading) return <h1>Loading</h1>;
  console.log("Data in react reddit: ", data);
  return (
    <div>
      <h1>Reddit ReactJS - Top 2 listings</h1>
      <h2>Subscribers: {data.reddit.subreddit.subscribers}</h2>
      <h3>
          <a href={data.reddit.subreddit.topListings[0].url}>{data.reddit.subreddit.topListings[0].title}</a>
      </h3>
      <h3>
          <a href={data.reddit.subreddit.topListings[1].url}>{data.reddit.subreddit.topListings[1].title}</a>
      </h3>
    </div>
  );
};

export default withApollo(RedditReact);
