import { Event } from '@/models';

const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE_BASE_URL;

export async function getAllEvents() {
  const response = await fetch(`${firebaseUrl}/events.json`);
  const data = await response.json();
  const events: Event[] = [];

  for (const key in data) {
    events.push(data[key]);
  }

  return events;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter(event => event.isFeatured);
}

export async function getFilteredEvents(dateFilter: any) {
  const events = await getAllEvents();
  const { year, month } = dateFilter;

  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });
}

export async function getEventById(id: string) {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
}
