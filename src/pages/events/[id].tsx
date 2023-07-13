import React from "react";
import EventSummary from "@/components/events/details/event-summary";
import EventLogistics from "@/components/events/details/event-logistics";
import EventContent from "@/components/events/details/event-content";
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getEventById, getFeaturedEvents } from '@/helpers/api-utils';
import { Event } from '@/models';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';

interface EventDetailPageProps {
  event: Event;
}

const EventDetailPage: NextPage<EventDetailPageProps> = ({ event}) => {
  if (!event) {
    return <div>No event found</div>;
  }

  return (
    <div className="event-detail-page">
      <Head>
        <title>{event.title}</title>
        <meta title="description" content={event.description}/>
      </Head>
      <EventSummary title={event.title}/>
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </div>
  );
}

export default EventDetailPage;

export const getStaticProps: GetStaticProps<EventDetailPageProps, IParams> = async (context) => {
  const eventId = context.params?.id;

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
    },
    revalidate: 30
  }
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map(e => {
    return {
      params: {
        id: e.id
      }
    };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  }
}
