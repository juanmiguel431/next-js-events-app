import React from "react";
import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/models/dummy-data";

const EventsPage: React.FC = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div className="events-page">
      Events Page (Show all events)
      <EventList items={featuredEvents} />
    </div>
  );
}

export default EventsPage;
