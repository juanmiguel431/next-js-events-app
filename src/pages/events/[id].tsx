import React from "react";
import { useRouter } from "next/router";
import { getEventById } from "@/models/dummy-data";
import EventSummary from "@/components/events/details/event-summary";
import EventLogistics from "@/components/events/details/event-logistics";
import EventContent from "@/components/events/details/event-content";

const EventDetailPage: React.FC = () => {

  const router = useRouter();

  const eventId = router.query.id as string;

  const event = getEventById(eventId);

  if (!event) {
    return <div>No event found</div>;
  }

  return (
    <div className="event-detail-page">
      <EventSummary title={event.title}/>
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </div>
  );
}

export default EventDetailPage;
