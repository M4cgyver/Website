import styles from "./index.module.css"

import { useFormStatus } from "react-dom";

export const FormButton = () => {
    const {pending} = useFormStatus();

    return <button className={styles.submit} type="submit" disabled={pending}>
        {/*/pending ? "Posting..." : "Post Sticky"*/}
        Post Sticky
        </button>;
};