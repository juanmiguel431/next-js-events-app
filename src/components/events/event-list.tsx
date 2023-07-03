import React from "react";
import { Event } from '@/models';
import EventItem from "@/components/events/event-item";

interface EventListProps {
  items: Array<Event>;
}

const EventList: React.FC<EventListProps> = (props) => {
  return (
    <div className="event-list">
      <ul>
        {props.items.map(e => {
          return <li key={e.id}><EventItem event={e} /></li>;
        })}
      </ul>
    </div>
  );
}

export default EventList;
