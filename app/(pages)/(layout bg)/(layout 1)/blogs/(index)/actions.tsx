"use server";

import { StaticImageData } from "next/image";

import iconNextJS13OrderedLayout from "@/public/static/images/blogsnextjs13flexandordericon.jpeg"

export interface Blog {
    title: string,
    description: string,
    logo: StaticImageData,
    date: Date,
    href: string
}

export const getBlogs = ():Blog[] => {
    return [
        {
            title: 'NextJS App Ordered Layouts',
            description: 'Explore effective strategies for structuring your NextJS 13 layouts with precision. Learn how to arrange elements seamlessly within page.tsx and layout.tsx. Use styles, flexbox, and flexbox ordering to decupple the components ordering dependence to enhance user experience. ',
            logo: iconNextJS13OrderedLayout,
            date: new Date(),
            href: "/blogs/nextjsapp-ordered-layout"
        }
    ]
}