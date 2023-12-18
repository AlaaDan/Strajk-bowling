import './BookingInfo.scss';

import Input from '../Input/Input';

function BookingInfo({ updateBookingDetails }) {
    return (
        <section className='booking-info'>
            <header>
                <h2 className="booking-info__heading">When, WHAT & Who</h2>
            </header>
            <form className="booking-info__details">
                <section className='booking-info__when'>
                    <Input id="date" label="Date" type="date" customClass="booking-info__date" 
                    name="when" handleChange={ updateBookingDetails } />
                    <Input id="time" label="Time" type="text"
                    name="time" handleChange={ updateBookingDetails } />
                </section>
                <Input id="bowlers" label="Number of awesome bowlers" type="number" customClass="booking-info__who"
                name="people" handleChange={ updateBookingDetails } />
                <Input id="lanes" label="Number of lanes" type="number" customClass="booking-info__lanes"
                name="lanes" handleChange={ updateBookingDetails } />
            </form>
        </section>
    )
}

export default BookingInfo;