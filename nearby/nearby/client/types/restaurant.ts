export interface Restaurant {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  rating: number;
  isOpened: boolean;
}

export interface NearbyRestaurantsData {
  nearbyRestaurants: Restaurant[];
}

export interface NearbyRestaurantsVars {
  latitude: number;
  longitude: number;
  radius?: number;
}
