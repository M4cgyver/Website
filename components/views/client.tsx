"use client"

import { useEffect, useState } from 'react'; 
import { addView, getViews } from './actions';
import { getCookie } from "cookies-next"
import { usePathname, useSearchParams } from 'next/navigation';
import { cookies } from 'next/headers';
import { fontToshibaTxL1 } from '@/libs/fonts';

interface ClientProps {
    sessionIdx: string,
    initialViewsTotalSite: number;
    initialViewsCurrentPage: number;
    initialViewingTotalSite: number;
    initialViewingCurrentPage: number;
}

export default async function Client({
    sessionIdx,
    initialViewsTotalSite,
    initialViewsCurrentPage,
    initialViewingTotalSite,
    initialViewingCurrentPage
}: ClientProps) {
    const currentUrl = usePathname() + useSearchParams().toString();

    const [viewsTotalSite, setViewsTotalSite] = useState<number>(initialViewsTotalSite);
    const [viewsCurrentPage, setViewsCurrentPage] = useState<number>(initialViewsCurrentPage);
    const [viewingTotalSite, setViewingTotalSite] = useState<number>(initialViewingTotalSite);
    const [viewingCurrentPage, setViewingCurrentPage] = useState<number>(initialViewingCurrentPage);

    useEffect(() => {
        addView({ sessionIdx: sessionIdx, path: currentUrl }).then(() => {
            Promise.all([
                getViews({}),
                getViews({ path: currentUrl }),
                getViews({ datetime: new Date(Date.now() - 1000 * 60 * 5) }),
                getViews({ path: currentUrl, datetime: new Date(Date.now() - 1000 * 60 * 5) })
            ]).then(([total1, total2, total3, total4]) => {
                setViewsTotalSite(total1);
                setViewsCurrentPage(total2);
                setViewingTotalSite(total3);
                setViewingCurrentPage(total4);
            });    
        });
    }, [currentUrl]);

    return (
        <table className={fontToshibaTxL1.className}>
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
                    <td>{viewsTotalSite}</td>
                    <td>{viewsCurrentPage}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Current</td>
                    <td>{viewingTotalSite}</td>
                    <td>{viewingCurrentPage}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}
