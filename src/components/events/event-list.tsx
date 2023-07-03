import React from "react";
import { Event } from '@/models';
import EventItem from "@/components/events/event-item";
import classes from "./event-list.module.css";

interface EventListProps {
  items: Array<Event>;
}

const EventList: React.FC<EventListProps> = (props) => {
  return (
    <div className="event-list">
      <div className={classes.list}>
        {props.items.map(e => {
          return <div key={e.id}><EventItem event={e} /></div>;
        })}
      </div>
    </div>
  );
}

export default EventList;
