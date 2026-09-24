import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateWhatsAppUrl(
  whatsappNumber: string,
  message: string
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
}

export function generateAppointmentMessage(data: {
  name: string;
  phone: string;
  service: string;
  treatment: string;
  date: string;
  time: string;
  message?: string;
}): string {
  return `New Appointment Request

Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}
Treatment: ${data.treatment}
Date: ${data.date}
Time: ${data.time}${data.message ? `\nMessage: ${data.message}` : ''}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}
