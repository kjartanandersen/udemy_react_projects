import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

function HomePage(props) {
  const featuredEvents = props.events;

  if (!featuredEvents) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events" />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const data = await getFeaturedEvents();

  return {
    props: {
      events: data,
    },
    revalidate: 1800,
  };
}
