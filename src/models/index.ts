
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface NotificationFooterProps {
  title: string;
  message: string;
  status: string;
}


export interface NewsletterData {
  message: string
}
