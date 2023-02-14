import React from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../helpers/api-util";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function EventsPage(props) {
  const router = useRouter();
  const events = props.events;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <React.Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </React.Fragment>
  );
}

export default EventsPage;

export async function getStaticProps() {
  const data = await getAllEvents();

  return {
    props: {
      events: data
    },
    revalidate: 60
  }
}
