import { FC } from 'react';
import { Link } from 'react-router-dom';

import withMessage from '../hocs/withMessage';

interface TitleProps {
    href: string;
    title: string;
}

const Title: FC<TitleProps> = ({ href, title }) => {
    return href ? (
        <Link to={href}>
            <h1>{title}</h1>
        </Link>
    ) : (
        <h1>{title}</h1>
    );
};

export default withMessage(Title, 'Title');
