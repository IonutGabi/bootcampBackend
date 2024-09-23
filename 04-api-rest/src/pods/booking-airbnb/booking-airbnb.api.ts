import { Router } from "express";
import { bookingAirbnbRepository } from "#dals/booking-airbnb/repositories/index.js";
import {
  mapBookingAirbnbListFromModelToApi,
  mapBookingAirbnbFromModelToApi,
  mapReviewFromApiToModel,
} from "./booking-airbnb.mappers.js";
export const bookingAirbnbApi = Router();

bookingAirbnbApi
  .get("/", async (req, res, next) => {
    try {
      const bookingAirbnb = await bookingAirbnbRepository.getBookingList();

      res.send(mapBookingAirbnbListFromModelToApi(bookingAirbnb));
    } catch (error) {
      next(error);
    }
  })
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const bookingAirbnb = await bookingAirbnbRepository.getBooking(id);
      res.send(mapBookingAirbnbFromModelToApi(bookingAirbnb));
    } catch (error) {
      next(error);
    }
  })
  .patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = req.body;
      const newReview = await bookingAirbnbRepository.saveReview(id, review);
      res.status(201).send(mapReviewFromApiToModel(newReview));
    } catch (error) {
      next(error);
    }
  });
