import { Resolver, Query, Args, Float } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './entities/restaurant.entity';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Query(() => [Restaurant], { name: 'nearbyRestaurants' })
  findNearByRestaurant(
    @Args('latitude', { type: () => Float }) latitude: number,
    @Args('longitude', { type: () => Float }) longitude: number,
    @Args('radius', { type: () => Float, nullable: true }) radius?: number,
    @Args('minRating', { type: () => Float, nullable: true })
    minRating?: number,
    @Args('isOpened', { type: () => Boolean, nullable: true })
    isOpened?: boolean,
    @Args('sortBy', { type: () => String, nullable: true })
    sortBy?: 'distance' | 'rating',
  ) {
    return this.restaurantsService.findNearbyRestaurants(
      latitude,
      longitude,
      radius,
      { minRating, isOpened },
      sortBy,
    );
  }
}
