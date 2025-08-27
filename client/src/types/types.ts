
interface NotificationObject {
  message: string;
  from: string;
}

interface Notification extends NotificationObject {
  id: number;
  createdAt: Date;
}

export type {
  Notification, 
  NotificationObject
}