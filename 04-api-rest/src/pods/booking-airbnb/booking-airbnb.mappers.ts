import * as model from "#dals/index.js";
import * as apiModel from "./booking-airbnb.api-model.js";
import { ObjectId } from "mongodb";

const mapReviewFromModelToApi = (review: model.Review): apiModel.Review => ({
  date: review.date,
  reviewerName: review.reviewerName,
  comments: review.comments,
});

export const mapReviewFromApiToModel = (
  review: apiModel.Review
): model.Review => ({
  date: review.date,
  reviewerName: review.reviewerName,
  comments: review.comments,
});
export const mapBookingAirbinbFromApiToModel = (
  booking: apiModel.BookingAirbnb
): model.BookingAirbnb => ({
  _id: new ObjectId(booking.id),
  title: booking.title,
  description: booking.description,
  address: booking.address,
  bedrooms: booking.bedrooms,
  beds: booking.beds,
  bathrooms: booking.bathrooms,
  reviews: mapReviewListFromModelToApi(booking.reviews),
});

export const mapBookingAirbnbFromModelToApi = (
  booking: model.BookingAirbnb
): apiModel.BookingAirbnb => ({
  id: booking._id.toHexString(),
  title: booking.title,
  description: booking.description,
  address: booking.address,
  bedrooms: booking.bedrooms,
  bathrooms: booking.bathrooms,
  beds: booking.beds,
  reviews: mapReviewListFromModelToApi(booking.reviews),
});

const mapReviewListFromModelToApi = (
  reviews: model.Review[]
): apiModel.Review[] => reviews.map(mapReviewFromModelToApi);

export const mapBookingAirbinbListFromApiToModel = (
  bookings: apiModel.BookingAirbnb[]
): model.BookingAirbnb[] =>
  Array.isArray(bookings) ? bookings.map(mapBookingAirbinbFromApiToModel) : [];

export const mapBookingAirbnbListFromModelToApi = (
  bookings: model.BookingAirbnb[]
): apiModel.BookingAirbnb[] => bookings.map(mapBookingAirbnbFromModelToApi);
