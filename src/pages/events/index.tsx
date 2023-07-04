import React from "react";
import EventList from "@/components/events/event-list";
import { getAllEvents } from "@/models/dummy-data";
import EventSearch from "@/components/events/event-search";

const EventsPage: React.FC = () => {
  const allEvents = getAllEvents();

  return (
    <div className="events-page">
      <EventSearch />
      <EventList items={allEvents} />
    </div>
  );
}

export default EventsPage;
