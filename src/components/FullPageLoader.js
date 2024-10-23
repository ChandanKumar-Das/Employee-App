import React from 'react';

const FullPageLoader = () => {
    return (
        <div className="fixed  inset-0 z-50 flex items-center justify-center bg-gray-100">
            <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default FullPageLoader;
