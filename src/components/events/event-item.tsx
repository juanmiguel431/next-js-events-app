import React from "react";
import { Event } from '@/models';
import Link from "next/link";
import Image from "next/image";
import classes from "./event-item.module.css";
import Button from "@/components/ui/button";

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
        <div className={classes.summary}>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <time>{date}</time>
          </div>
          <div className={classes.address}>
            <address>{location}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button href={{
            pathname: '/events/[id]',
            query: {
              id: event.id
            }
          }}>Explore event</Button>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
