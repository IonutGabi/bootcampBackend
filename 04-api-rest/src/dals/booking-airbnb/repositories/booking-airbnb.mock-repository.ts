import { BookingAirbnbRepository } from "./booking-airbnb.repository.js";
import { Review } from "../booking-airbnb.model.js";
import { db } from "../../booking-airbnb-mock-data.js";

const insertReview = (id: string, review: Review) => {
  const newDate = new Date();
  const bookingFilter = db.bookingAirbnb.find(
    (booking) => booking._id.toHexString() === id
  );
  const newReview: Review = {
    date: newDate,
    reviewerName: review.reviewerName,
    comments: review.comments,
  };
  bookingFilter.reviews.push(newReview);

  return newReview;
};

export const mockRepository: BookingAirbnbRepository = {
  getBookingList: async () => db.bookingAirbnb,
  getBooking: async (id: string) =>
    db.bookingAirbnb.find((booking) => booking._id.toString() === id),
  saveReview: async (id: string, review: Review) => insertReview(id, review),
};
