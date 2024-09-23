import * as model from "#dals/index.js";
import { ObjectId } from "mongodb";
import * as apiModel from "./booking-airbnb.api-model.js";
import { mapBookingAirbinbListFromApiToModel } from "./booking-airbnb.mappers.js";

describe("booking-airbnb.mappers spec", () => {
  it.each<apiModel.BookingAirbnb[]>([undefined, null, []])(
    "should return empty array when it feeds bookingList %p",
    (bookingAirbnbList: any) => {
      // Arrange

      // Act
      const result = mapBookingAirbinbListFromApiToModel(bookingAirbnbList);

      // Assert

      const expectedResult: model.BookingAirbnb[] = [];

      expect(result).toEqual(expectedResult);
    }
  );
  it("should return one mapped item array when it feeds bookingList with one item", () => {
    // Arrange
    const bookingList: apiModel.BookingAirbnb[] = [
      {
        id: "66b4f995503ad6672b471b12",
        title: "fooooo",
        description: "foo",
        address: {
          country: "lorem",
        },
        bathrooms: 2,
        bedrooms: 4,
        beds: 8,
        reviews: [
          {
            date: new Date("2024-08-27T16:46:13.560Z"),
            reviewerName: "Juanito",
            comments: "hello world",
          },
        ],
      },
    ];
    // Act
    const result = mapBookingAirbinbListFromApiToModel(bookingList);
    // Assert
    const expectedResult: model.BookingAirbnb[] = [
      {
        _id: new ObjectId("66b4f995503ad6672b471b12"),
        title: "fooooo",
        description: "foo",
        address: {
          country: "lorem",
        },
        bathrooms: 2,
        bedrooms: 4,
        beds: 8,
        reviews: [
          {
            date: new Date("2024-08-27T16:46:13.560Z"),
            reviewerName: "Juanito",
            comments: "hello world",
          },
        ],
      },
    ];
    expect(result).toEqual(expectedResult);
  });
});
