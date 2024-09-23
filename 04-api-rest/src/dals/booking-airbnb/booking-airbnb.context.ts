import { db } from "#core/servers/index.js";
import { BookingAirbnb, Review } from "./booking-airbnb.model.js";

export const getBookingAirbnbContext = () =>
  db?.collection<BookingAirbnb>("listingsAndReviews");

export const getReviewContext = () =>
  db?.collection<Review>("listingsAndReviews");
