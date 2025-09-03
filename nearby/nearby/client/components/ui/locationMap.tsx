'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, Star, Car, Footprints, SortAsc } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { LatLngTuple } from 'leaflet';
import { gql, useQuery } from '@apollo/client';
import { Restaurant } from '@/types/restaurant';

const NEARBY_RESTAURANTS = gql`
  query NearbyRestaurants(
    $latitude: Float!
    $longitude: Float!
    $radius: Float
    $minRating: Float
    $isOpened: Boolean
    $sortBy: String
  ) {
    nearbyRestaurants(
      latitude: $latitude
      longitude: $longitude
      radius: $radius
      minRating: $minRating
      isOpened: $isOpened
      sortBy: $sortBy
    ) {
      id
      name
      address
      latitude
      longitude
      openingHours
      rating
      isOpened
    }
  }
`;

interface Location {
  lat: number;
  lng: number;
}

interface FilterOptions {
  minRating: number;
  isOpened: boolean;
  sortBy: 'distance' | 'rating' | null;
}

// we are using custom function here to calculate the time so that we don't have
// to use any thrid party api
const calculateTravelTime = (
  start: Location,
  end: Location,
  mode: 'car' | 'walking'
) => {
  const R = 6371;
  const dLat = ((end.lat - start.lat) * Math.PI) / 180;
  const dLon = ((end.lng - start.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((start.lat * Math.PI) / 180) *
      Math.cos((end.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  const speeds = {
    car: 30,
    walking: 5,
  };

  return Math.round((distance / speeds[mode]) * 60);
};

// i am using dynamic import to avaoid ssr error since
// this is client component
const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full rounded-lg bg-gray-100 animate-pulse" />
  ),
});

export function LocationMap() {
  const [location, setLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    minRating: 0,
    isOpened: true,
    sortBy: null,
  });

  const {
    data,
    loading: queryLoading,
    error: queryError,
    refetch,
  } = useQuery(NEARBY_RESTAURANTS, {
    skip: !location,
    variables: location
      ? {
          latitude: location.lat,
          longitude: location.lng,
          radius: radius,
          minRating: filters.minRating || null,
          isOpened: filters.isOpened || null,
          sortBy: filters.sortBy || null,
        }
      : undefined,
  });

  useEffect(() => {
    if (location) {
      refetch({
        latitude: location.lat,
        longitude: location.lng,
        radius: radius,
        minRating: filters.minRating || null,
        isOpened: filters.isOpened || null,
        sortBy: filters.sortBy || null,
      });
    }
  }, [location, radius, filters, refetch]);

  const getLocation = () => {
    setIsLoading(true);
    setError('');
    setLocation(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleRadiusChange = (value: number[]) => {
    setRadius(value[0]);
  };

  const handleRatingChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, minRating: value[0] }));
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value as 'distance' | 'rating' }));
  };

  const handleOpenedToggle = (checked: boolean) => {
    setFilters((prev) => ({ ...prev, isOpened: checked }));
  };

  const getPosition = (): LatLngTuple => [
    location?.lat || 51.505,
    location?.lng || -0.09,
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Find Nearby Restaurants</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <Button
            onClick={getLocation}
            disabled={isLoading || queryLoading}
            variant="default"
          >
            {isLoading ? 'Getting Location...' : 'Get My Location'}
          </Button>

          {location && (
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Search radius (km):</p>
              <Slider
                defaultValue={[radius]}
                max={10}
                min={1}
                step={0.5}
                onValueChange={handleRadiusChange}
              />
            </div>
          )}
        </div>

        {location && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Minimum Rating:</p>
              <Slider
                defaultValue={[filters.minRating]}
                max={5}
                min={0}
                step={0.5}
                onValueChange={handleRatingChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={filters.isOpened}
                onCheckedChange={handleOpenedToggle}
              />
              <Label>Show only open restaurants</Label>
            </div>

            <div>
              <Select
                value={filters.sortBy as any}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort restaurants by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No sorting</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {(error || queryError) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || queryError?.message}</AlertDescription>
          </Alert>
        )}

        {location && (
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-4">
              <div className="h-96 w-full rounded-lg overflow-hidden">
                <Map
                  center={getPosition() as any}
                  radius={radius}
                  restaurants={data?.nearbyRestaurants || []}
                  userLocation={location}
                />
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              <div className="space-y-4">
                {data?.nearbyRestaurants.map((restaurant: Restaurant) => (
                  <Card key={restaurant.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">
                            {restaurant.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {restaurant.address}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{restaurant.rating}</span>
                          </div>
                          <p className="text-sm mt-2">
                            {restaurant.isOpened ? (
                              <span className="text-green-600">Open</span>
                            ) : (
                              <span className="text-red-600">Closed</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {restaurant.openingHours}
                          </p>
                        </div>
                        <div className="text-right text-sm">
                          <div className="flex items-center gap-1 justify-end">
                            <Car className="h-4 w-4" />
                            <span>
                              {calculateTravelTime(
                                location,
                                {
                                  lat: restaurant.latitude,
                                  lng: restaurant.longitude,
                                },
                                'car'
                              )}{' '}
                              min
                            </span>
                          </div>
                          <div className="flex items-center gap-1 justify-end mt-1">
                            <Footprints className="h-4 w-4" />
                            <span>
                              {calculateTravelTime(
                                location,
                                {
                                  lat: restaurant.latitude,
                                  lng: restaurant.longitude,
                                },
                                'walking'
                              )}{' '}
                              min
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {queryLoading && (
          <div className="text-center">
            <p>Loading restaurants...</p>
          </div>
        )}

        {data?.nearbyRestaurants && (
          <div className="text-sm text-gray-600">
            <p>
              Found {data.nearbyRestaurants.length} restaurants within {radius}
              km
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
