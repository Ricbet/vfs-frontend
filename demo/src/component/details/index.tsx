import React from "react";

import "./index.scss";

interface PropsDetails {
    content: string;
}

const Details = (props: PropsDetails): JSX.Element => {
    const { content } = props;
    return (
        <div className="details-main">
            <div className="pre-content">
                <pre>{content}</pre>
            </div>
        </div>
    );
};

export default Details;
