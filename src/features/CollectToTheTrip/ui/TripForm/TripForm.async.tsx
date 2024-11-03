import { FC, lazy } from 'react';

export const TripFormAsync = lazy<FC>(() => new Promise((resolve) => {
    setTimeout(() => resolve(import('./TripForm')), 1500);
}));
