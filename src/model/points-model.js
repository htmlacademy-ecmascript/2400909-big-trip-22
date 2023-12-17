import { getRandomPoint } from '../mock/points.js';
import { getRandomOffer } from '../mock/offers.js';
import { getRandomDestination } from '../mock/destinations.js';

const POINT_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);
  offers = getRandomOffer();
  destinations = getRandomDestination();

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
