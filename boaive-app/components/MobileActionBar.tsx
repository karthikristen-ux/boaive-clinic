'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function MobileActionBar() {
  const { config } = useTheme();
  const pathname = usePathname();
  if (pathname.startsWith('/appointment')) return null;

  return (
    <div className="action-bar">
      <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="btn btn-outline">
        <Phone size={17} /> Call
      </a>
      <a href={`https://wa.me/${config.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
        <MessageCircle size={17} /> Chat
      </a>
      <Link href="/appointment" className="btn btn-primary">
        <CalendarCheck size={17} /> Book Visit
      </Link>
    </div>
  );
}
