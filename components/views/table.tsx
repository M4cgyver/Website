"use client"

import { fontToshibaTxL1 } from "@/libs/fonts";
import { getCookie } from "cookies-next";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Views } from "@/components/views"

export const ViewsTable = () => {
  const sessionIdx = getCookie('sessionidx')?.toString() ?? "undefined";
  const path = usePathname()?.toString() + useSearchParams()?.toString();
  const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);

  useEffect(() => { }, [path])

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
        <td><Views path={"/"} sessionIdx={sessionIdx}/></td>
        <td><Views path={path} sessionIdx={sessionIdx}/></td>
        <td></td>
        <td></td>
      </tr>
      {/*
      <tr>
        <td>Current</td>
        <td><Views path={"/"} sessionIdx={sessionIdx} date={threeMinutesAgo}/></td>
        <td><Views path={path} sessionIdx={sessionIdx} date={threeMinutesAgo}/></td>
        <td></td>
        <td></td>
      </tr>
    */}
    </tbody>
  </table>
}