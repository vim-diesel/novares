// 'use client';
import Link from 'next/link';
import HeaderArrow from './SortingArrow';
import type { Event } from '@prisma/client';

const statusColors: { [key: string]: string } = {
  open: 'bg-green-200',
  closed: 'bg-neutral-200',
  waitlist: 'bg-yellow-100',
};

export default function EventsTableSorted({
  events,
  direction,
  orderBy,
  searchParams,
}: {
  events: Event[] | undefined;
  direction: string;
  orderBy:
    | 'title'
    | 'startDate'
    | 'endDate'
    | 'location'
    | 'price'
    | 'status'
    | undefined;
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>
            Events
          </h1>
          <p className='mt-2 text-sm text-gray-700'>A list of all the events</p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add event
          </button>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                  >
                    <Link
                      href={`?${new URLSearchParams({
                        ...searchParams,
                        orderBy: 'title',
                        direction: (orderBy === 'title' && direction === 'desc'
                          ? 'asc'
                          : 'desc'
                        ).toString(),
                      })}`}
                      className='group inline-flex'
                    >
                      Title
                      <HeaderArrow
                        current={orderBy === 'title'}
                        desc={direction === 'desc'}
                      />
                    </Link>
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    <Link
                      href={`?${new URLSearchParams({
                        ...searchParams,
                        orderBy: 'startDate',
                        direction: (orderBy === 'startDate' &&
                        direction === 'desc'
                          ? 'asc'
                          : 'desc'
                        ).toString(),
                      })}`}
                      className='group inline-flex'
                    >
                      Start Date
                      <HeaderArrow
                        current={orderBy === 'startDate'}
                        desc={direction === 'desc'}
                      />
                    </Link>
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    <Link
                      href={`?${new URLSearchParams({
                        ...searchParams,
                        orderBy: 'location',
                        direction: (orderBy === 'location' &&
                        direction === 'desc'
                          ? 'asc'
                          : 'desc'
                        ).toString(),
                      })}`}
                      className='group inline-flex'
                    >
                      Location
                      <HeaderArrow
                        current={orderBy === 'location'}
                        desc={direction === 'desc'}
                      />
                    </Link>
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    <Link
                      href={`?${new URLSearchParams({
                        ...searchParams,
                        orderBy: 'price',
                        direction: (orderBy === 'price' && direction === 'desc'
                          ? 'asc'
                          : 'desc'
                        ).toString(),
                      })}`}
                      className='group inline-flex'
                    >
                      Price
                      <HeaderArrow
                        current={orderBy === 'price'}
                        desc={direction === 'desc'}
                      />
                    </Link>
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    <Link
                      href={`?${new URLSearchParams({
                        ...searchParams,
                        orderBy: 'status',
                        direction: (orderBy === 'status' && direction === 'desc'
                          ? 'asc'
                          : 'desc'
                        ).toString(),
                      })}`}
                      className='group inline-flex'
                    >
                      Status
                      <HeaderArrow
                        current={orderBy === 'status'}
                        desc={direction === 'desc'}
                      />
                    </Link>
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {events?.length === 0 && (
                  <div className='text-center'>No events found</div>
                )}
                {events?.map((event) => (
                  <tr key={event.id}>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      {event.title}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {event.startDate.toLocaleDateString()}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {event.location}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {event.price}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      <span
                        className={
                          'px-2 py-1 rounded-full ' +
                          (event.status ? statusColors[event.status] : '')
                        }
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0'>
                      <a
                        href='#'
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit<span className='sr-only'>, {event.title}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
