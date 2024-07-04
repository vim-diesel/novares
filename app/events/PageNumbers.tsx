// 'use client';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';
import range from '@/app/utils/range';

function Breadcrumbs() {
  return (
    <span className='inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500'>
      ...
    </span>
  );
}

export default function PageNumbers({
  currPage,
  totalPages,
}: {
  currPage: number;
  totalPages: number;
}) {
  return (
    <nav className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-0'>
      <div className='-mt-px flex w-0 flex-1'>
        <a
          href={`/events?page=${currPage - 1}`}
          className='inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
        >
          <ArrowLongLeftIcon
            className='mr-3 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
          Previous
        </a>
      </div>
      <div className='hidden md:-mt-px md:flex'>
        {totalPages <= 7 &&
          range(1, totalPages + 1).map((i) => {
            return (
              <a
                key={i}
                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                  i === currPage
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                href={`/events?page=${i}`}
              >
                {i}
              </a>
            );
          })}
        {totalPages > 7 &&
          range(1, 4).map((i) => {
            return (
              <a
                key={i}
                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                  i === currPage
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                href={`/events?page=${i}`}
              >
                {i}
              </a>
            );
          })}
        {totalPages > 7 && <Breadcrumbs />}

        {totalPages > 7 && currPage > 3 && currPage < 8 && (
          <>
            <a
              className='inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium border-indigo-500 text-indigo-600'
              href={`/events?page=${currPage}`}
            >
              {currPage}
            </a>
            <Breadcrumbs />
          </>
        )}

        {totalPages > 7 &&
          range(totalPages - 2, totalPages + 1).map((i) => {
            return (
              <a
                key={i}
                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                  i === currPage
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                href={`/events?page=${i}`}
              >
                {i}
              </a>
            );
          })}
      </div>
      <div className='-mt-px flex w-0 flex-1 justify-end'>
        <a
          href={`/events?page=${currPage + 1}`}
          className='inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
        >
          Next
          <ArrowLongRightIcon
            className='ml-3 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </a>
      </div>
    </nav>
  );
}
