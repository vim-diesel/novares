
export default function SelectOrder() {
  return (
    <div>
      <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
        Order By
      </label>
      <select
        id="location"
        name="location"
        defaultValue="Start Date"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option>Start Date</option>
        <option>Title</option>
        <option>Location</option>
        <option>Price</option>
      </select>
    </div>
  )
}
