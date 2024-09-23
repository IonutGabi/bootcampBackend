import { BookingAirbnb, Review } from "../booking-airbnb.model.js";

export interface BookingAirbnbRepository {
  getBookingList: () => Promise<BookingAirbnb[]>;
  getBooking: (id: string) => Promise<BookingAirbnb>;
  saveReview: (id: string, review: Review) => Promise<Review>;
}
