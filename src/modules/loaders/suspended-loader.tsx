import React, { useState, useEffect } from "react";

interface Props {
    time: number;
    children: React.ReactElement;
}

export const SuspendedLoader = ({ time, children }: Props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShow(true);
        }, time);

        return () => clearTimeout(timeoutId);
    }, []);

    if (!show) {
        return null;
    }

    return children;
};
