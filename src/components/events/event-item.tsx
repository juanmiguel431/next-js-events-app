import React from 'react';
import { Event } from '@/models';
import Image from 'next/image';
import classes from './event-item.module.css';
import Button from '@/components/ui/button';
import DateIcon from '@/components/icons/date-icon';
import AddressIcon from '@/components/icons/address-icon';
import ArrowRightIcon from '@/components/icons/arrow-right-icon';

interface EventListProps {
  event: Event;
}

const EventItem: React.FC<EventListProps> = ({ event }) => {
  const date = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const location = event.location.replace(', ', '\n');

  return (
    <div className={`event-item ${classes.item}`}>
      <Image src={event.image} alt={event.title} width={200} height={200}/>
      <div className={classes.content}>
        <div>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <DateIcon/>
            <time>{date}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon/>
            <address>{location}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button href={{
            pathname: '/events/[id]',
            query: {
              id: event.id
            }
          }}>
            <span>Explore event</span>
            <span className={classes.icon}><ArrowRightIcon/></span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
