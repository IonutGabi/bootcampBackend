import { ObjectId } from "mongodb";
import {
  BookingAirbnb,
  Review,
} from "./booking-airbnb/booking-airbnb.model.js";

export interface DB {
  bookingAirbnb: BookingAirbnb[];
}

export const db: DB = {
  bookingAirbnb: [
    {
      _id: new ObjectId("66b4f995503ad6672b471b12"),
      title: "Casa rural Málaga",
      address: {
        country: "España",
      },
      bedrooms: 5,
      bathrooms: 2,
      beds: 6,
      description: `Fantástica casa rural en Málaga disponible para todo el verano con 5 habitaciones 2 cuartos de baño, piscina`,
      reviews: [
        {
          date: new Date(),
          reviewerName: "Ana",
          comments: "foo",
        },
      ],
    },
    {
      _id: new ObjectId("66b4f995503ad6672b471b13"),
      title: "Casa rural Tomelloso",
      address: {
        country: "Portugal",
      },
      bathrooms: 2,
      bedrooms: 4,
      beds: 6,
      description: "foo",
      reviews: [
        {
          date: new Date(),
          reviewerName: "Miguel",
          comments: "foo",
        },
      ],
    },
  ],
};
