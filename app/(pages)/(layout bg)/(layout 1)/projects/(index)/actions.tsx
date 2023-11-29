"use server";
 
import iconStartup from "@/public/static/images/startuposicon.png" 
import iconFriends from "@/public/static/images/Battlefield-Friends.png" 
import iconArchives from "@/public/static/images/pexels-ivo-rainha-1290141.jpg" 

const projects = [
    {
        name: "My Internet Archives",
        descShort: "Archives of websites and whatnots of stuff I find interesting.",
        date: new Date(),
        href: "/projects/archives",
        icon: iconArchives,
    },
    {
        name: "Friends of Mine",
        descShort: "Just a testfield for tsx and css. Making cool shit",
        date: new Date(),
        href: "/projects/archives",
        icon: iconFriends,
    },
    {
        name: "Startup OS",
        descShort: "A basic OS written in Assembly, based off of MikeOS",
        date: new Date('2018-04-25T08:00:00Z'),
        href: "/projects/startupos",
        icon: iconStartup,
    },
];

export const getProjects = async () => {
    return projects;
} 