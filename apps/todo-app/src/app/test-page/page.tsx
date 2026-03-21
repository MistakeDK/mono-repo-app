'use client';

import { cn } from '@mono/ui-components';
import { TriangleIcon } from 'lucide-react';
import { useState } from 'react';
import './test-page.css';
const PageTest = () => {
  const [trigger, setTrigger] = useState<boolean>(false);
  return (
    <div className="flex justify-center w-full h-full">
      {/* Slide Down */}
      <div className="group flex gap-2">
        <TriangleIcon
          className={cn('fade-from-right-animate rotate-0', {
            'rotate-90': trigger,
          })}
          onClick={() => setTrigger((pre) => !pre)}
        />
        <div className="flex flex-col">
          <div>Title</div>
          <ul
            className={cn('bg-red-600 p-2 wrapper-slide-down-transition', {})}
            data-open={trigger}
          >
            <li>Card 1</li>
            <li>Card 2</li>
            <li>Card 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageTest;
