import { Injectable, Logger } from '@nestjs/common';
import { Restaurant } from '@prisma/client'; // Import the Restaurant model from Prisma
import { DatabaseService } from '../database/database.service';

@Injectable()
export class RestaurantsService {
  private readonly logger = new Logger(RestaurantsService.name);

  constructor(private prisma: DatabaseService) {}

  /**
   * Calculate the distance between two points using the Haversine formula.
   * @param lat1 - Latitude of the first point.
   * @param lon1 - Longitude of the first point.
   * @param lat2 - Latitude of the second point.
   * @param lon2 - Longitude of the second point.
   * @returns The distance in kilometers.
   */
  private haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  /**
   * Find nearby restaurants within a specified radius (in kilometers).
   * @param latitude - The latitude of the user's location.
   * @param longitude - The longitude of the user's location.
   * @param radius - The radius in kilometers (default is 5 km).
   * @param filters - Optional filters (e.g., minRating, isOpened).
   * @param sortBy - Optional sorting criteria (e.g., 'distance', 'rating').
   * @returns A list of nearby restaurants.
   */
  async findNearbyRestaurants(
    latitude: number,
    longitude: number,
    radius: number = 5,
    filters?: {
      minRating?: number;
      isOpened?: boolean;
    },
    sortBy?: 'distance' | 'rating',
  ): Promise<Restaurant[]> {
    this.logger.debug(
      `Finding nearby restaurants for latitude: ${latitude}, longitude: ${longitude}, radius: ${radius} km`,
    );

    try {
      // Fetch all restaurants from the database
      const allRestaurants = await this.prisma.restaurant.findMany();

      // Filter restaurants within the specified radius
      // TODO: note we can use direct filtering from prisma
      // but to do this we need to add additional extention for
      // postgres so i kept it simple
      const nearbyRestaurants = allRestaurants
        .filter((restaurant) => {
          const distance = this.haversineDistance(
            latitude,
            longitude,
            restaurant.latitude,
            restaurant.longitude,
          );
          return distance <= radius;
        })
        .filter((restaurant) => {
          if (
            filters?.minRating !== undefined &&
            restaurant.rating < filters.minRating
          ) {
            return false;
          }
          if (
            filters?.isOpened !== undefined &&
            restaurant.isOpened !== filters.isOpened
          ) {
            return false;
          }
          return true;
        });

      if (sortBy === 'distance') {
        nearbyRestaurants.sort((a, b) => {
          const distanceA = this.haversineDistance(
            latitude,
            longitude,
            a.latitude,
            a.longitude,
          );
          const distanceB = this.haversineDistance(
            latitude,
            longitude,
            b.latitude,
            b.longitude,
          );
          return distanceA - distanceB;
        });
      } else if (sortBy === 'rating') {
        nearbyRestaurants.sort((a, b) => b.rating - a.rating);
      }

      this.logger.log(`Found ${nearbyRestaurants.length} nearby restaurants`);
      return nearbyRestaurants;
    } catch (error) {
      this.logger.error('Failed to find nearby restaurants', error.stack);
      throw error;
    }
  }
}
