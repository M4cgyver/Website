"use client";

import useSWR, { SWRConfiguration } from 'swr'; // Importing SWRConfiguration for better type safety.
import { addAndGetViews } from './actions';
import { usePathname, useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';

interface ViewsProps {
  path?: string;
  sessionIdx?: string;
  date?: Date
}

export const Views: React.FC<ViewsProps> = ({ path, sessionIdx, date }) => {
  const pathDefined = path ?? (usePathname()?.toString() + useSearchParams()?.toString())
  const sessionIdxDefined = sessionIdx ?? getCookie('sessionidx')?.toString() ?? "undefined";

  const { data, isLoading, isValidating } = useSWR(
    ["views", path ?? "/"],
    () => addAndGetViews({ sessionIdx: sessionIdxDefined, path: pathDefined, valid: true, datetime: date }),
  );

  const body = isLoading || isValidating ? "#" : data;

  return <>{body}</>;
};
