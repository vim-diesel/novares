import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function HeaderArrow({ current, desc }: { current: boolean; desc: boolean }) {
  const headerSelected =
    'ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200';
  const headerUnselected =
    'invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible';

  if (desc) {
    return current ? (
      <span className={headerSelected}>
        <ChevronDownIcon aria-hidden='true' className='h-5 w-5' />
      </span>
    ) : (
      <span className={headerUnselected}>
        <ChevronDownIcon aria-hidden='true' className='h-5 w-5' />
      </span>
    );
  }

  if (!desc) {
    return current ? (
      <span className={headerSelected}>
        <ChevronUpIcon aria-hidden='true' className='h-5 w-5' />
      </span>
    ) : (
      <span className={headerUnselected}>
        <ChevronUpIcon aria-hidden='true' className='h-5 w-5' />
      </span>
    );
  }
}

export default HeaderArrow;