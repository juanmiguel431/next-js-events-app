import React from "react";
import { Event } from '@/models';
import Link from "next/link";
import Image from "next/image";

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
    <div className="event-item">
      <Image src={event.image} alt={event.title} width={200} height={200}/>
      <div>
        <div><h2>{event.title}</h2></div>
        <div><time>{date}</time></div>
        <div><address>{location}</address></div>
        <div>
          <Link href={{
            pathname: '/events/[id]',
            query: {
              id: event.id
            }
          }} >Explore event</Link>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
