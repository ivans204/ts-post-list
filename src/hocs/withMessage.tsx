import { FC, useEffect } from 'react';

const withMessage =
    (WrappedComponent: FC<any>, componetName: string) => (props: any) => {
        useEffect(() => {
            // console.log(`Hello from - ${componetName}`);
        }, []);

        return <WrappedComponent message="Hello from" {...props} />;
    };

export default withMessage;
