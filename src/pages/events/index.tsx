import React from "react";
import EventList from "@/components/events/event-list";
import { getAllEvents } from '@/helpers/api-utils';
import EventSearch from "@/components/events/event-search";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from 'next';
import { Event } from '@/models';
import Head from 'next/head';

interface EventsPageProps {
  events: Array<Event>;
}

const EventsPage: NextPage<EventsPageProps> = ({ events }) => {
  const router = useRouter();

  const onSearch = (year: number, month: number) => {
    router.push({
      pathname: '/events/browse/[...slug]',
      query: {
        slug: [year, month]
      }
    });
  };

  return (
    <div className="events-page">
      <Head>
        <title>All events</title>
        <meta title="description" content="Find a lot of great events that allow you to evolve."/>
      </Head>
      <EventSearch onSearch={onSearch}/>
      <EventList items={events}/>
    </div>
  );
}

export default EventsPage;


export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const events =  await getAllEvents();

  return {
    props: { events }
  };
}
