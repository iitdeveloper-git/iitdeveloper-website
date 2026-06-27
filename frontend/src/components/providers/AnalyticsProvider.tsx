'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { track } from '@/lib/analytics';
export default function AnalyticsProvider(){const pathname=usePathname();const search=useSearchParams();useEffect(()=>{track('page_view',{path:pathname,query:search.toString()});},[pathname,search]);return null;}
