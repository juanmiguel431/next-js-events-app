
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
  status: 'success' | 'error' | 'pending';
}


export interface NewsletterData {
  message: string
}
