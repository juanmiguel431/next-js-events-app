import React from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "@/models/dummy-data";
import EventList from "@/components/events/event-list";

const FilteredEventsPage: React.FC = () => {
  const router = useRouter();

  const data = router.query.slug;

  if (!data) {
    return <p className="center">Loading...</p>
  }

  const year = +data[0];
  const month = +data[1];

  if (isNaN(year) || isNaN(month) || year < 1900 || month < 1 || month > 12) {
    return <p className="center">Invalid filters. Please, adjust the values.</p>
  }

  const events = getFilteredEvents({ year, month });

  if (events.length === 0) {
    return <p className="center">No events found.</p>
  }

  return (
    <div className="filtered-events-page">
      <EventList items={events} />
    </div>
  );
}

export default FilteredEventsPage;
