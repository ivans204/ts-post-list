import { FC, useEffect } from 'react';

const withMessage =
    (WrappedComponnet: FC<any>, componetName: string) => (props: any) => {
        useEffect(() => {
            console.log(`Hello from - ${componetName}`);
        }, []);

        return <WrappedComponnet message="Hello from" {...props} />;
    };

export default withMessage;
