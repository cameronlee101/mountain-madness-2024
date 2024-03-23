'use client';
import React from 'react';
import dynamic from 'next/dynamic';
const Map = dynamic(
    () => import('@components/Map'),
    {
        loading: () => null,
        ssr: false,
    },
);


const Main: React.FC = () => {
    return <div>
        <Map></Map>
    </div>
};

export default Main;
