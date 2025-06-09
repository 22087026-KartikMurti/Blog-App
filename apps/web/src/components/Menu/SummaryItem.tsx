import Link from 'next/link';
import { memo } from 'react';

type SummaryItemProps = {
  name: string;
  link: string;
  count: number;
  isSelected: boolean;
  title?: string;
};

function SummaryItemBase({
  name,
  link,
  count,
  isSelected,
  title,
}: SummaryItemProps) {
  // TODO: Implement the summary item
  // must show the number of posts in that category and the name
  // if if is selected it must show in different color/background
  return (
    <li style={{
      listStyle: 'none',
      padding: '8px 12px',
      margin: '4px 0',
      borderRadius: '4px',
      backgroundColor: isSelected ? 'var(--text-secondaryHover)' : 'transparent',
    }}>
      <Link 
        href={link} 
        title={title}
        className={`
          flex justify-between items-center w-full no-underline
          text-gray-700 dark:text-gray-300
          ${isSelected ? 'text-black dark:text-white font-bold selected' : 'font-normal'}
        `}
      >
        <span>{name}</span>
        <span data-test-id="post-count" className={`
          ml-[10px]
          ${isSelected 
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-100'
            : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-100'
          }
          rounded-[12px]
          px-2
          py-[2px]
          text-[0.85em]
          min-w-[24px]
          text-center
          inline-block
        `}>
          {count}
        </span>
      </Link>
    </li>
  );
}

export const SummaryItem = memo(SummaryItemBase);