import React from "react";
import EventSummary from "@/components/events/details/event-summary";
import EventLogistics from "@/components/events/details/event-logistics";
import EventContent from "@/components/events/details/event-content";
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllEvents, getEventById } from '@/helpers/api-utils';
import { Event } from '@/models';

interface EventDetailPageProps {
  event: Event;
}

const EventDetailPage: NextPage<EventDetailPageProps> = ({ event}) => {
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

export const getStaticProps: GetStaticProps<EventDetailPageProps> = async (context) => {
  const eventId = context.params?.id as string;

  if (eventId === undefined) {
    return {
      notFound: true
    };
  }

  const event = await getEventById(eventId);

  if (event === undefined) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      event: event
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents();
  const paths = events.map(e => {
    return {
      params: {
        id: e.id
      }
    };
  });

  return {
    paths: paths,
    fallback: false,
  }
}
