import React from 'react';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <BeatLoader
                color={"red"}
                loading={true}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default NotFound;