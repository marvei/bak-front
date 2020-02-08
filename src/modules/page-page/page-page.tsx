import React from "react";
import { AppHistory } from "src/routing/app-history";

// interface Props {
//     text: string;
//     skaicius: number;
//     onClick(value: string): void;
// }

export const PagePage: React.FC = () => (
    <div>
        privet comrad
        <button onClick={() => AppHistory.goBack()}>shit go back</button>
    </div>
);
