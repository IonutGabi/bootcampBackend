export interface BookingAirbnb {
  id: string;
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
