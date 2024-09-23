import { ObjectId } from "mongodb";
import { BookingAirbnbRepository } from "./booking-airbnb.repository.js";
import { Review } from "../booking-airbnb.model.js";
import {
  getBookingAirbnbContext,
  getReviewContext,
} from "../booking-airbnb.context.js";

export const dbRepository: BookingAirbnbRepository = {
  getBookingList: async () =>
    await getBookingAirbnbContext().find().limit(5).toArray(),
  getBooking: async (id: string) => {
    return await getBookingAirbnbContext().findOne({
      _id: new ObjectId(id),
    });
  },
  saveReview: async (id: string, review: Review) => {
    const newReview: Review = {
      date: new Date(),
      reviewerName: review.reviewerName,
      comments: review.comments,
    };
    return await getReviewContext().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: newReview },
      { upsert: true, returnDocument: "after" }
    );
  },
};
