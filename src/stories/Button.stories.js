// Button.stories.js

import React from 'react';
import Button from '../components/Button/Button';


export default {
    title: 'Button',
    component: Button,
};

export const Primary = () => {

    return (
        <Button text="Click me!" />
    )
};

export const Secondary = () => (
    <Button text="Submit" onClick={() => console.log('Submit clicked!')} />
);