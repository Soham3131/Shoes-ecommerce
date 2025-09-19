import React, { useState } from 'react';
import loaderGif from '../assets/loader.gif';

const LoadingSpinner = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex flex-col justify-center items-center w-full min-h-screen bg-transparent p-4 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={loaderGif}
                alt="Loading..."
                className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 animate-pulse mb-8"
            />
            <p
                className={`
                    font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center
                    bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text
                    transition-opacity duration-500 ease-in-out
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                `}
            >
                Good things take time. Please wait...
            </p>
        </div>
    );
};

export default LoadingSpinner;