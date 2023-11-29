import { Sticky } from "@prisma/client";
import styles from "./index.module.css";
import Image from "next/image";
import DateTimeLocally from "../datetimelocal";

const regexYoutube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/i;
const regexImage = /^https?:\/\/\s*.*\/.*\.(jpg|jpeg|png|gif|svg)(\?.*)?(#.*)?$/i;

const StickyboardPostedNote = ({ sticky }: { sticky: Sticky }) => {
    const username = sticky.username || "Anonymous";

    const content = sticky.content?.split(" ").map((word, index) => {
        if (regexYoutube.test(word.trim())) {
            const match = word.match(
                /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/
            );
            const videoId = match ? match[1] : null;
            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

            return (
                <iframe key={index} src={embedUrl} allowFullScreen></iframe>
            );
        }

        if (regexImage.test(word.trim()))
            return (
                <div key={index}>
                    <Image
                        src={word}
                        alt={word}
                        width={100}
                        height={100}
                        layout="responsive"
                    />
                </div>
            );

        return <span key={index}>{word + " "}</span>
    });

    return (
        <div className={styles.note}>
            <h1>{username}</h1>
            <p>{content}</p>
            <h3>Posted on <DateTimeLocally date={sticky.datetime} /> by {username} </h3>
        </div>
    );
};

export default StickyboardPostedNote;
