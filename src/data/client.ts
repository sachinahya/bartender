import { ReactLocation } from '@tanstack/react-location';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({});

export const location = new ReactLocation();
