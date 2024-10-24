'use client';
import { createEvent } from '../../actions/actions';
import React, { FormEvent } from 'react';
import { DatePicker } from './DatePicker';
import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

const eventStatus = [
  { id: 'open', title: 'Open' },
  { id: 'closed', title: 'Closed' },
  { id: 'waitlist', title: 'Waitlist' },
];

export default function CreateEventForm() {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [price, setPrice] = React.useState<number>(0);
  const titleLabelRef = React.useRef<HTMLLabelElement>(null);
  const startDateLabelRef = React.useRef<HTMLLabelElement>(null);
  const priceLabelRef = React.useRef<HTMLLabelElement>(null);

  // Pass this function to the DatePicker component so that the error highlight
  // can be removed.
  const resetLabel = () => {
    startDateLabelRef.current?.classList.remove('text-red-500');
  };

  let toastid: string;
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    priceLabelRef.current?.classList.remove('text-red-500');

    const currPrice = Number(e.target.value);
    if (isNaN(currPrice)) {
      toast.remove(toastid);
      toastid = toast.error('Price must be a positive number');
      setPrice((prev) => prev || 0);
    } else if (currPrice > 2147483647) {
      toast.remove(toastid);
      toastid = toast.error('Wowww thats expensive! 🤑');
      setPrice((prev) => prev || 0);
    } else {
      setPrice(currPrice);
    }
  };

  const { executeAsync, result, status } = useAction(createEvent, {
    onSuccess() {
      toast.success('Event created!');
    },
    onError({ error }) {
      // We use our own error handling of inputs, this creates extra work but allows
      // a lot of flexibility in how we handle errors and display it to the user
      // as opposed to letting the browser do it though the HTML form elements.
      if (error.validationErrors) {
        toast.error('入力エラー 🤨 check all required fields');
        if ('title' in error.validationErrors) {
          titleLabelRef.current?.focus();
          titleLabelRef.current?.classList.add('text-red-500');
        } else if ('startDate' in error.validationErrors) {
          startDateLabelRef.current?.scrollIntoView();
          startDateLabelRef.current?.classList.add('text-red-500');
        } else if ('price' in error.validationErrors) {
          priceLabelRef.current?.focus();
          priceLabelRef.current?.classList.add('text-red-500');
        }
      } else if (error.serverError) {
        toast.error('サーバーが燃えている 🔥 server on fire');
      } else {
        toast.error('不明なエラー 🤔 error');
      }
    },
  });

  return (
    <form
      onSubmit={async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        await executeAsync({
          title: formData.get('title') as string,
          startDate: startDate?.toISOString() as string,
          endDate: endDate?.toISOString(),
          location: formData.get('location') as string | undefined,
          price: Number(formData.get('price')) as number | undefined,
          status: formData.get('eventStatus') as
            | 'open'
            | 'closed'
            | 'waitlist'
            | undefined,
        });
      }}
    >
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            New Event
          </h2>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
              <label
                htmlFor='title'
                className='block text-sm font-medium leading-6 text-gray-900'
                ref={titleLabelRef}
              >
                Event Name<span className='text-red-500'>*</span>
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='title'
                    id='title'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    onChange={() =>
                      titleLabelRef.current?.classList.remove('text-red-500')
                    }
                  />
                </div>
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='description'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Description
              </label>
              <div className='mt-2'>
                <textarea
                  id='description'
                  name='description'
                  rows={3}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  defaultValue={''}
                />
              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>
                Write a few sentences about your event.
              </p>
            </div>

            <div className='col-span-1 row-start-3'>
              <label
                htmlFor='price'
                className='block text-sm font-medium leading-6 text-gray-900'
                ref={priceLabelRef}
              >
                Price
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <span className='text-gray-500 sm:text-sm'>$</span>
                </div>
                <input
                  type='text'
                  name='price'
                  id='price'
                  className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  placeholder='0'
                  aria-describedby='price-currency'
                  value={price}
                  onChange={handlePriceChange}
                />
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <span
                    className='text-gray-500 sm:text-sm'
                    id='price-currency'
                  >
                    USD
                  </span>
                </div>
              </div>
            </div>

            <div className='col-span-2 row-start-4'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Location
              </label>
              <div className='mt-2'>
                <input
                  type='location'
                  name='location'
                  id='location'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='row-start-5'>
              <label
                className='block mb-2 text-sm font-medium leading-6 text-gray-900'
                ref={startDateLabelRef}
              >
                Start Date
                <span className='text-red-500'>*</span>
              </label>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                resetLabel={resetLabel}
              />
            </div>

            <div className='row-start-6'>
              <label className='block mb-2 text-sm font-medium leading-6 text-gray-900'>
                End Date
              </label>
              <DatePicker date={endDate} setDate={setEndDate} />
            </div>

            <fieldset className='row-start-7'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Event Status
              </legend>
              <div className='mt-6 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0'>
                {eventStatus.map((eventStatus) => (
                  <div key={eventStatus.id} className='flex items-center'>
                    <input
                      id={eventStatus.id}
                      name='eventStatus'
                      type='radio'
                      value={eventStatus.id}
                      defaultChecked={eventStatus.id === 'open'}
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                    <label
                      htmlFor={eventStatus.id}
                      className='ml-3 block text-sm font-medium leading-6 text-gray-900'
                    >
                      {eventStatus.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        {/* <p aria-live='polite' className='sr-only'>
          {state?.message}
        </p> */}
        <button
          type='button'
          className='text-sm font-semibold leading-6 text-gray-900'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          {status === 'executing' ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {/* <p>Result: {JSON.stringify(result)}</p> */}
    </form>
  );
}
