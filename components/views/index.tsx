"use client";

import { cookies } from 'next/headers';
import { Suspense, use, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { addView, getViews } from './actions';
import { fontToshibaTxL1 } from '@/libs/fonts';

export default function Views() {
  const sessionIdx = (getCookie('sessionidx') ?? "undefined").toString();
  const path = usePathname();

  const [viewsStats, setViewsStats] = useState<any>(['...', '...', '...', '...']);
  const [viewsSite, viewsPath, viewsSiteCurrent, viewsPathCurrent] = viewsStats;

  const getViewsState = async () => {
    try {

      const views = await Promise.all([
        getViews({}),
        getViews({ path: path }),
        getViews({ datetime: new Date(Date.now() - 1000 * 60 * 5) }),
        getViews({ path: path, datetime: new Date(Date.now() - 1000 * 60 * 5) }),
      ]);

      setViewsStats(views);

    } catch (error) {
      console.error('Error fetching views:', error);
    }
  }

  useEffect(() => {
    getViewsState();
    addView({sessionIdx: sessionIdx, path: path});
  }, [path]);

  return <table className={fontToshibaTxL1.className}>
    <thead>
      <tr>
        <th></th>
        <th>Website</th>
        <th>Page</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Views</td>
        <td>{viewsSite}</td>
        <td>{viewsPath}</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Current</td>
        <td>{viewsSiteCurrent}</td>
        <td>{viewsPathCurrent}</td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
}
