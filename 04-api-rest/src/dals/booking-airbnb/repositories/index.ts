import { mockRepository } from "./booking-airbnb.mock-repository.js";
import { dbRepository } from "./booking-airbnb.db-repository.js";
import { envConstants } from "#core/constants/index.js";

export const bookingAirbnbRepository = envConstants.isApiMock
  ? mockRepository
  : dbRepository;
