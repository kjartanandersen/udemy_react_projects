import React from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function EventsPage() {
  const router = useRouter();
  const events = getAllEvents();

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
