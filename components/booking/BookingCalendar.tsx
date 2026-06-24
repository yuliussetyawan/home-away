'use client';
import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useProperty } from '@/utils/store';

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from '@/utils/calendar';
import { useToast } from '@/hooks/use-toast';

function BookingCalendar() {
  const currentDate = new Date();
  const { toast } = useToast();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
  const bookings = useProperty((state) => state.bookings)
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate
  })

  const unavailableDate = generateDisabledDates(blockedPeriods)

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if (unavailableDate[date]) {
        setRange(defaultSelected);
        toast({
          description: 'Some dates are booked. Please select again'
        })
        return true;
      }
      return false;
    })
    useProperty.setState({ range });
  }, [range])

  return (
    <Calendar mode='range' defaultMonth={currentDate} selected={range} onSelect={setRange} className='mb-4'
      // add disabled
      disabled={blockedPeriods}
    />
  )
}

export default BookingCalendar