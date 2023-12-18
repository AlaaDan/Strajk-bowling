import {render, screen, fireEvent} from '@testing-library/react';
import BookingInfo from './BookingInfo';
import Booking from '../../views/Booking'
import { RouterProvider } from 'react-router-dom';
import router from '../../router';
// import { beforeEach, describe } from 'vitest';
import { booking } from '../../mocks/handlers'

describe('BookingInfo', () => {
    it("should render the inpute fields in the BookingInfo component for the lables data, time, number of players and number of lanes", () => {
        render(<RouterProvider router={router}><BookingInfo /></RouterProvider>);
        expect(screen.getByLabelText('Date')).toBeInTheDocument();
        expect(screen.getByLabelText('Time')).toBeInTheDocument();
        expect(screen.getByLabelText('Number of awesome bowlers')).toBeInTheDocument();
        expect(screen.getByLabelText('Number of lanes')).toBeInTheDocument();
    })

    it('shoule be possible to enter a date, time, number of players and number of lanes in the input fields', () => {
        // using booking object from Booking.test.jsx
        
        render(<RouterProvider router={router}><Booking /></RouterProvider>);
        const dateInput = screen.getByLabelText('Date');
        const timeInput = screen.getByLabelText('Time');
        const playersInput = screen.getByLabelText('Number of awesome bowlers');
        const lanesInput = screen.getByLabelText('Number of lanes');
        fireEvent.change(dateInput, { target: { value: booking.when } });
        fireEvent.change(timeInput, { target: { value: booking.time } });
        fireEvent.change(playersInput, { target: { value: booking.players } });
        fireEvent.change(lanesInput, { target: { value: booking.lanes } });
        expect(dateInput.value).toBe(booking.when);
        expect(timeInput.value).toBe(booking.time);
        expect(playersInput.value).toBe(booking.players);
        expect(lanesInput.value).toBe(booking.lanes);
    })


    

})
