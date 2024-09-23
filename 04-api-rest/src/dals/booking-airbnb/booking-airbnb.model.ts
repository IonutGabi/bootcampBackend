import { ObjectId } from "mongodb";
export interface BookingAirbnb {
  _id: ObjectId;
  title: string;
  image?: string;
  description: string;
  address: {
    country: string;
  };
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: Review[];
}

export interface Review {
  date: Date;
  reviewerName: string;
  comments: string;
}
