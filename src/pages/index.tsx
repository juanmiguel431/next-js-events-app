import EventList from '@/components/events/event-list';
import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Event } from '@/models'
import { getFeaturedEvents } from '@/helpers/api-utils';
import NewsletterRegistration from '@/components/input/newsletter-registration';

interface HomeProps {
  featuredEvents: Event[];
  environment: 'production' | 'development' | 'test';
  port?: string;
}

const Home: NextPage<HomeProps> = ({ featuredEvents, environment, port }) => {
  return (
    <div className="home-page">
      <NewsletterRegistration/>
      <div style={{ textAlign: 'center' }}>
        <p><b>Environment:</b> {environment}</p>
        <p><b>Port:</b> {port}</p>
      </div>
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
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || '3000'
    },
    revalidate: 1800 // 30 mins
  };
}
