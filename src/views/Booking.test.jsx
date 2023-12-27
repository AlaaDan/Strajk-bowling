import { render, screen, fireEvent } from "@testing-library/react";
import router from "../router";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Booking from "./Booking";
import Confirmation from "./Confirmation";
import { describe, expect } from "vitest";
import {booking, bookingRes} from "../mocks/handlers";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const button_text = "strIIIIIike!";
const x_API_KEY = '738c6b9d-24cf-47c3-b688-f4f4c5747662';


describe("Booking", () => {
    it("should show an error msg if the user fails to input all the reuired fields" , async () => {
        render(
            <Router>
                <Routes>
                    <Route path="/" element={<Booking />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </Router>
        );
        fireEvent.click(screen.getByText(button_text ));
        expect(screen.getByText('Fill out all the fields and make sure that people and shoes is the same number.')).toBeVisible()
        
    });

    it('should have a button to make a booking', () => {
        render(
            <Router>
                <Routes>
                    <Route path="/" element={<Booking />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </Router>
        );
        expect(screen.getByText(button_text)).toBeInTheDocument();
        expect(screen.getByText(button_text)).toBeVisible();
    })

    it('should be possible to click the button to make a booking', () => {
        render(
            <Router>
                <Routes>
                    <Route path="/" element={<Booking />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </Router>
        );
        fireEvent.click(screen.getByText(button_text));
    })

    it('should be possible to navigate between the booking page and the confirmation page from the navaigation menu', () => {
        render(
            <Router>
                <Routes>
                    <Route path="/" element={<Booking />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </Router>
        );
        fireEvent.click(screen.getByAltText('Navigation Icon'));
        fireEvent.click(screen.getByText("Confirmation"));
        expect(screen.getByText("See you soon!")).toBeInTheDocument();
        expect(screen.getByText("Inga bokning gjord!")).toBeInTheDocument();
        fireEvent.click(screen.getByAltText('Navigation Icon'));
        fireEvent.click(screen.getByText("Booking"));
        expect(screen.getByText(button_text)).toBeInTheDocument();
    })

    it('should return a booking id and the total price when a booking is made', async () => {
        render(
            <Router>
                <Routes>
                    <Route path="/" element={<Booking />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </Router>
        );  
        const dateInput = screen.getByLabelText('Date');
        const timeInput = screen.getByLabelText('Time');
        const playersInput = screen.getByLabelText('Number of awesome bowlers');
        const lanesInput = screen.getByLabelText('Number of lanes');
        const addingShoes = (booking => {
            const shoes = booking.shoes;
            shoes.forEach((shoe, i) => {
                const addButton = screen.getByRole('button', { name: '+' });
                fireEvent.click(addButton);
                fireEvent.change(screen.getByLabelText(`Shoe size / person ${i + 1}`), { target: { value: shoe } });
            
        });
        
        });
        fireEvent.change(dateInput, { target: { value: booking.when } });
        fireEvent.change(timeInput, { target: { value: booking.time } });
        fireEvent.change(playersInput, { target: { value: booking.players } });
        fireEvent.change(lanesInput, { target: { value: booking.lanes } });
        addingShoes(booking);
        expect(dateInput.value).toBe(booking.when);
        expect(timeInput.value).toBe(booking.time);
        expect(playersInput.value).toBe(booking.players);
        expect(lanesInput.value).toBe(booking.lanes);
        fireEvent.click(screen.getByText(button_text));
        expect(await screen.findByText("See you soon!")).toBeVisible();
        expect(await screen.getByLabelText("Booking number").value).toBe(bookingRes.id);
        // console.log(bookingRes.id)
        expect(await screen.getByText(`${bookingRes.price} sek`)).toBeVisible();

    });
});