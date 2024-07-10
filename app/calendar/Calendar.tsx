/* eslint-disable @next/next/no-img-element */
'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { Event } from '@prisma/client';
import React from 'react';
import { useState } from 'react';

const meetings = [
  {
    id: 1,
    date: 'January 10th, 2022',
    time: '5:00 PM',
    datetime: '2022-01-10T17:00',
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Starbucks',
  },
  // More meetings...
];

const imgPlaceholder =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

type DaysArray = {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
}[];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function generateCalendarDays(
  selectedDate: string,
  events: Event[] | undefined
): Array<{
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  hasEvents?: boolean;
}> {
  const days = [];

  // To ensure the correct month is selected, regardless of time zone,
  // we have to split the selected date string and create a new date object.
  // If we pass the Date constructor a string without a timezone,
  // midnight @ UTC is still the previous day in local time.
  // so we can't use new Date('2024-07-01') directly.

  const [yearStr, monthStr, dayStr] = selectedDate
    .split('-')
    .map((num) => parseInt(num, 10));
  const date = new Date(yearStr, monthStr - 1, dayStr);

  const month = new Date(date).getMonth(); // zero-indexed

  const firstDayOfMonth = new Date(yearStr, month, 1);
  const lastDayOfMonth = new Date(yearStr, month + 1, 0);

  // Find start date for the calendar view, typically the previous Sunday of the first day of the month
  let startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Adjust to the previous Sunday

  // Find end date for the calendar view, typically the next Saturday after the last day of the month
  let endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // Adjust to the next Saturday

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dateStr = date.toISOString().split('T')[0]; // Format date as "YYYY-MM-DD"
    const isCurrentMonth = date.getMonth() === month;
    const isToday = dateStr === new Date().toISOString().split('T')[0];
    const isSelected = dateStr === selectedDate;
    const hasEvents = filterEventsByDate(dateStr, events).length > 0;

    days.push({
      date: dateStr,
      ...(isCurrentMonth && { isCurrentMonth }),
      ...(isToday && { isToday }),
      ...(isSelected && { isSelected }),
      ...(hasEvents && { hasEvents }),
    });
  }

  return days;
}

function filterEventsByDate(
  date: string,
  events: Event[] | undefined
): Event[] {
  if (!events) return [];

  const [nextYear, nextMonth, nextDay] = date
    .split('-')
    .map((num) => parseInt(num, 10));

  return events?.filter((event) => {
    const [eventYear, eventMonth, eventDay] = event.startDate
      .toISOString()
      .split('T')[0]
      .split('-')
      .map((num) => parseInt(num, 10));
    return (
      eventDay === nextDay && eventMonth === nextMonth && eventYear === nextYear
    );
  });
}

export default function Calendar({ events }: { events: Event[] | undefined }) {
  // format as "YYYY-MM-DD"
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  // our list of events filtered to the selectedDate
  const [currentEvents, setCurrentEvents] = useState<Event[]>(
    filterEventsByDate(selectedDate, events)
  );

  // To get correct month name, split the date string and create a new Date object
  // to avoid timezone issues.
  const [year, month, day] = selectedDate
    .split('-')
    .map((num) => parseInt(num, 10));
  const selectedMonthName = new Date(year, month - 1, day).toLocaleString(
    'default',
    {
      month: 'long',
    }
  );

  const days = generateCalendarDays(selectedDate, events);

  // React.useEffect(() => {
  //   setCurrentEvents(events?.filter((event) => {
  //     const [eventYear, eventMonth, eventDay] = event.startDate.toISOString().split('T')[0].split('-').map((num) => parseInt(num, 10));
  //     return day === eventDay && month === eventMonth && year === eventYear;
  //   }));
  //   console.log(currentEvents);
  // }, [events, currentEvents, day, month, year]);

  function handleDayClick(date: string, events: Event[] | undefined) {
    setSelectedDate(date);
    setCurrentEvents(filterEventsByDate(date, events));
  }

  return (
    <div>
      <h2 className='text-base font-semibold leading-6 text-gray-900'>
        Events on this day
      </h2>
      <div className='lg:grid lg:grid-cols-12 lg:gap-x-16'>
        <div className='mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9'>
          <div className='flex items-center text-gray-900'>
            <button
              type='button'
              className='-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>Previous month</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            <div className='flex-auto text-sm font-semibold'>
              {selectedMonthName}
            </div>
            <button
              type='button'
              className='-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>Next month</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500'>
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className='isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200'>
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type='button'
                className={classNames(
                  'py-1.5 hover:bg-gray-100 focus:z-10',
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  day.isSelected || day.isToday ? 'font-semibold' : '',
                  day.isSelected ? 'text-white' : '',
                  !day.isSelected && day.isCurrentMonth && !day.isToday
                    ? 'text-gray-900'
                    : '',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday
                    ? 'text-gray-400'
                    : '',
                  day.isToday && !day.isSelected ? 'text-indigo-600' : '',
                  day.hasEvents ? 'underline underline-offset-2' : '',
                  dayIdx === 0 ? 'rounded-tl-lg' : '',
                  dayIdx === 6 ? 'rounded-tr-lg' : '',
                  dayIdx === days.length - 7 ? 'rounded-bl-lg' : '',
                  dayIdx === days.length - 1 ? 'rounded-br-lg' : ''
                )}
                onClick={() => handleDayClick(day.date, events)}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday ? 'bg-indigo-600' : '',
                    day.isSelected && !day.isToday ? 'bg-gray-900' : ''
                  )}
                >
                  {day.date?.split('-').pop()?.replace(/^0/, '') ?? ''}
                </time>
              </button>
            ))}
          </div>
          <p className='text-left text-sm mt-2 italic text-slate-400'>
            *Underlined dates have events
          </p>
          <button
            type='button'
            className='mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add event
          </button>
        </div>

        {/* List of events */}
        <ol className='mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8'>
          {currentEvents.map((event) => (
            <li
              key={event.id}
              className='relative flex space-x-6 py-6 xl:static'
            >
              <img
                src={imgPlaceholder}
                alt=''
                className='h-14 w-14 flex-none rounded-full'
              />
              <div className='flex-auto'>
                <h3 className='pr-10 font-semibold text-gray-900 xl:pr-0'>
                  {event.title}
                </h3>
                <dl className='mt-2 flex flex-col text-gray-500 xl:flex-row'>
                  <div className='flex items-start space-x-3'>
                    <dt className='mt-0.5'>
                      <span className='sr-only'>Date</span>
                      <CalendarIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </dt>
                    <dd>
                      <time dateTime={event.startDate.toISOString()}>
                        {event.startDate.toDateString()}
                      </time>
                    </dd>
                  </div>
                  <div className='mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5'>
                    <dt className='mt-0.5'>
                      <span className='sr-only'>Location</span>
                      <MapPinIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </dt>
                    <dd>{event.location}</dd>
                  </div>
                </dl>
              </div>
              <Menu
                as='div'
                className='absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center'
              >
                <div>
                  <MenuButton className='-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600'>
                    <span className='sr-only'>Open options</span>
                    <EllipsisHorizontalIcon
                      className='h-5 w-5'
                      aria-hidden='true'
                    />
                  </MenuButton>
                </div>

                <MenuItems className='absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'>
                  <div className='py-1'>
                    <MenuItem>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900'
                      >
                        Edit
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900'
                      >
                        Cancel
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
