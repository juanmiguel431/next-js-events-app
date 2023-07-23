import EventList from '@/components/events/event-list';
import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Event } from '@/models'
import { getFeaturedEvents } from '@/helpers/api-utils';
import NewsletterRegistration from '@/components/input/newsletter-registration';

interface HomeProps {
  featuredEvents: Event[];
}

const Home: NextPage<HomeProps> = ({ featuredEvents }) => {
  return (
    <div className="home-page">
      <h1 style={{ textAlign: 'center' }}>Juan Miguel Paulino Carpio</h1>
      <NewsletterRegistration/>
      <EventList items={featuredEvents}/>
    </div>
  );
}

export default Home;


export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const events = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: events,
    },
    revalidate: 1800 // 30 mins
  };
}
