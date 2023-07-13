import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/results-title/results-title';
import Button from '@/components/ui/button';
import { NextPage } from 'next';
// import { GetServerSideProps } from 'next';
import { Event } from '@/models';
// import { ParsedUrlQuery } from 'querystring';
// import { getFilteredEvents } from '@/helpers/api-utils';
import useSWR from 'swr';
import ErrorAlert from '@/components/ui/error-alert/error-alert';
import Head from 'next/head';

interface FilteredEventsPageProps {
  events: Event[];
  year: number;
  month: number;
}

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = () => {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>([]);
  const { data, error } =  useSWR('https://next-js-course-53344-default-rtdb.firebaseio.com/events.json', url => fetch(url).then(res => res.json()));

  useEffect(() => {
    if (data) {
      const events: Event[] = [];

      for (const key in data) {
        events.push(data[key]);
      }

      setLoadedEvents(events);
    }
  }, [data]);

  const router = useRouter();
  const params = router.query.slug;

  if (!params) {
    return (
      <Fragment>
        <Head>
          <title>Filtered Events</title>
          <meta title="description" content="A list of filtered events"/>
        </Head>
        <p className="center">Loading...</p>
      </Fragment>
    )
  }

  const year = +params[0];
  const month = +params[1];

  const headData = (
    <Head>
      <title>Filtered Events</title>
      <meta title="description" content={`All events for ${month}/${year}`}/>
    </Head>
  );

  if (isNaN(year) || isNaN(month) || year < 1900 || month < 1 || month > 12 || error) {
    return <Fragment>
      {headData}
      <ErrorAlert>
        <p className="center">Invalid filters. Please, adjust the values.</p>
      </ErrorAlert>
      <div className="center">
        <Button href='/events'>Show all events</Button>
      </div>
    </Fragment>
  }

  const events = loadedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  if (events.length === 0) {
    return <Fragment>
      {headData}
      <p className="center">No events found for the chosen filters.</p>
      <div className="center">
        <Button href="/events">Show all events</Button>
      </div>
    </Fragment>;
  }

  const date = new Date(year, month - 1);

  return (
    <div className="filtered-events-page">
      {headData}
      <ResultsTitle date={date}/>
      <EventList items={events}/>
    </div>
  );
}

export default FilteredEventsPage;

// interface Params extends ParsedUrlQuery {
//   slug: string[]
// }
//
// export const getServerSideProps: GetServerSideProps<FilteredEventsPageProps> = async (context) => {
//   const data = context.query.slug;
//
//   if (!data) {
//     return {
//       notFound: true
//     };
//   }
//
//   const year = +data[0];
//   const month = +data[1];
//
//   if (isNaN(year) || isNaN(month) || year < 1900 || month < 1 || month > 12) {
//     return {
//       notFound: true
//     };
//   }
//
//   const events = await getFilteredEvents({ year, month });
//
//   return {
//     props: {
//       events: events,
//       year: year,
//       month: month
//     }
//   }
// };
