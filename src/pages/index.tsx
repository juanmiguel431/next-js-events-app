import { getFeaturedEvents } from "@/models/dummy-data";
import EventList from "@/components/events/event-list";
import React from "react";

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div className="home-page">
      <EventList items={featuredEvents} />
    </div>
  );
}
