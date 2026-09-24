'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ClinicLogoProps {
  clinicName?: string;
  variant?: 'light' | 'dark'; // 'light' means light text for dark backgrounds, 'dark' means dark text for light backgrounds
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export default function ClinicLogo({
  clinicName,
  variant = 'dark',
  size = 'md',
  className = '',
}: ClinicLogoProps) {
  const isDark = variant === 'dark';
  
  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <Image
        src="/images/logo-icon.png"
        alt="Clinic Icon"
        width={100}
        height={100}
        className={`object-contain max-w-full h-auto w-auto max-h-[40px] md:max-h-[50px] ${isDark ? 'brightness-0' : 'brightness-0 invert'}`}
        priority
      />
      <Image
        src="/images/logo-wordmark.png"
        alt={clinicName || 'Clinic Logo'}
        width={300}
        height={100}
        className={`object-contain max-w-full h-auto w-auto max-h-[30px] md:max-h-[40px] ${isDark ? 'brightness-0' : 'brightness-0 invert'}`}
        priority
      />
    </div>
  );
}
