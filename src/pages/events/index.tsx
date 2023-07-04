import React from "react";
import EventList from "@/components/events/event-list";
import { getAllEvents } from "@/models/dummy-data";
import EventSearch from "@/components/events/event-search";
import { useRouter } from "next/router";

const EventsPage: React.FC = () => {
  const allEvents = getAllEvents();
  const router = useRouter();

  const onSearch = (year: number, month: number) => {
    router.push({
      pathname: '/events/[...slug]',
      query: {
        slug: [year, month]
      }
    });
  };

  return (
    <div className="events-page">
      <EventSearch onSearch={onSearch}/>
      <EventList items={allEvents}/>
    </div>
  );
}

export default EventsPage;
