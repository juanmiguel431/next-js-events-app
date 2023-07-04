import React from "react";
import EventList from "@/components/events/event-list";
import { getAllEvents } from "@/models/dummy-data";

const EventsPage: React.FC = () => {
  const allEvents = getAllEvents();

  return (
    <div className="events-page">
      <EventList items={allEvents} />
    </div>
  );
}

export default EventsPage;
