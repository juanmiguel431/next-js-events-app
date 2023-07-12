import React from 'react';
import { useRouter } from 'next/router';
import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/results-title/results-title';
import Button from '@/components/ui/button';
import { GetServerSideProps, NextPage } from 'next';
import { Event } from '@/models';
import { ParsedUrlQuery } from 'querystring';
import { getFilteredEvents } from '@/helpers/api-utils';

interface FilteredEventsPageProps {
  events: Event[];
  year: number;
  month: number;
}

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = ({ events, year, month }) => {
  const router = useRouter();

  if (events.length === 0) {
    return <>
      <p className="center">No events found for the chosen filters.</p>
      <div className="center">
        <Button href="/events">Show all events</Button>
      </div>
    </>;
  }

  const date = new Date(year, month - 1);

  return (
    <div className="filtered-events-page">
      <ResultsTitle date={date}/>
      <EventList items={events}/>
    </div>
  );
}

export default FilteredEventsPage;


interface Params extends ParsedUrlQuery {
  slug: string[]
}

export const getServerSideProps: GetServerSideProps<FilteredEventsPageProps> = async (context) => {
  const data = context.query.slug;

  if (!data) {
    return {
      notFound: true
    };
  }

  const year = +data[0];
  const month = +data[1];

  if (isNaN(year) || isNaN(month) || year < 1900 || month < 1 || month > 12) {
    return {
      notFound: true
    };
  }

  const events = await getFilteredEvents({ year, month });

  return {
    props: {
      events: events,
      year: year,
      month: month
    }
  }
};
