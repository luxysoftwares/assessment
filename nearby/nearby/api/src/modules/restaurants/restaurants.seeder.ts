import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class RestaurantSeeder implements OnApplicationBootstrap {
  logger = new Logger(RestaurantSeeder.name);

  constructor(private db: DatabaseService) {}

  private restaurants = [
    {
      name: 'Novelli Bakery Restaurant & Lounge | ኖቬሊ ሬስቶራንት እና ላውንጅ',
      latitude: 9.018472556272794,
      longitude: 38.79562666422861,
      address: 'Near Lem Hotel &, Equatorial Guinea St, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Fri: 11pm-7am',
      rating: 4.5,
      isOpened: true,
    },
    {
      name: 'soweto bar & restaurant',
      latitude: 9.016861929609295,
      longitude: 38.7817220927517,
      address: '2Q8J+8JF, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-11pm',
      rating: 4.8,
      isOpened: true,
    },
    {
      name: 'Allebnany Restaurant',
      latitude: 9.013301571491834,
      longitude: 38.79674246317428,
      address: 'Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-1am',
      rating: 3.8,
      isOpened: true,
    },
    {
      name: 'Louvre Grand Hotel & Restaurant',
      latitude: 9.026271278456429,
      longitude: 38.787043595415696,
      address:
        'Togo Street/Yeka District, Sub City Kebele 13/14 Addis Ababa, Ethiopia Addis Ababa, 1175, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-11pm',
      rating: 4.8,
      isOpened: true,
    },
    {
      name: 'Africana Bar And Restaurant | Hayahulet | አፍሪካና ባርና ሬስቱራንት | ሃያሁለት',
      latitude: 9.014573131991712,
      longitude: 38.779576325548476,
      address: 'Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-12am',
      rating: 3.8,
      isOpened: true,
    },
    {
      name: 'Kibur Coffee and Restaurants /ክቡር ቡና እና ሬስቶራንት',
      latitude: 9.028220932660634,
      longitude: 38.79614164835738,
      address: '2QGW+HPP, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-11pm',
      rating: 5,
      isOpened: true,
    },
    {
      name: 'Hyatt Regency Addis Ababa',
      latitude: 9.010645230571352,
      longitude: 38.7640074707394,
      address: 'Meskel Square, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-11pm',
      rating: 4.4,
      isOpened: true,
    },
    {
      name: 'Gatsby Bar and Restaurant | Bole | ጋትስቢ ባርና ሬስቶራንት | ቦሌ',
      latitude: 8.989565864790551,
      longitude: 38.78818946246761,
      address: '2QCV+866, Kenenisa Ave, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-11pm',
      rating: 3.6,
      isOpened: true,
    },
    {
      name: 'Mami Traditional Restaurant',
      latitude: 9.038756183057703,
      longitude: 38.74859174671116,
      address: '2PPX+V9X, Arbeynoch St, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-11pm',
      rating: 3.8,
      isOpened: true,
    },
    {
      name: 'Yod Abyssinia Traditional Restaurant',
      latitude: 9.0108,
      longitude: 38.7633,
      address: 'Bole, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 11am-11pm',
      rating: 4.5,
      isOpened: true,
    },
    {
      name: 'La Mandoline French Restaurant',
      latitude: 9.0205,
      longitude: 38.7594,
      address: 'Kazanchis, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sat: 12pm-10pm',
      rating: 4.6,
      isOpened: true,
    },
    {
      name: 'Mamma Mia Italian Restaurant',
      latitude: 9.0156,
      longitude: 38.7639,
      address: 'Bole, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-10pm',
      rating: 4.4,
      isOpened: true,
    },
    {
      name: 'The Oriental',
      latitude: 9.0102,
      longitude: 38.7617,
      address: 'Bole, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-10pm',
      rating: 4.5,
      isOpened: true,
    },
    {
      name: 'Marcus Addis Restaurant & Sky Bar',
      latitude: 9.03,
      longitude: 38.75,
      address: 'Ras Desta Damtew St, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 11am-11pm',
      rating: 4.7,
      isOpened: true,
    },
    {
      name: 'Savor Addis',
      latitude: 9.0002,
      longitude: 38.7818,
      address: 'Atlas, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 8am-10pm',
      rating: 4.3,
      isOpened: true,
    },
    {
      name: "Chane's Restaurant",
      latitude: 9.0305,
      longitude: 38.752,
      address: 'Cazanches, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-9pm',
      rating: 4.6,
      isOpened: true,
    },
    {
      name: 'Oda Cultural Restaurant and Cafe',
      latitude: 9.03,
      longitude: 38.75,
      address: 'Near National Stadium, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 8am-10pm',
      rating: 4.5,
      isOpened: true,
    },
    {
      name: 'Tikus Shiro',
      latitude: 9.01,
      longitude: 38.74,
      address: 'Lideta, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 11am-9pm',
      rating: 4.4,
      isOpened: true,
    },
    {
      name: 'Brundo Butchery',
      latitude: 9.02,
      longitude: 38.76,
      address: 'Atlas, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 11am-10pm',
      rating: 4.5,
      isOpened: true,
    },
    {
      name: 'Castelli’s Restaurant',
      latitude: 9.03,
      longitude: 38.74,
      address: 'Piassa, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-10pm',
      rating: 4.6,
      isOpened: true,
    },
    {
      name: 'Abucci Restaurant',
      latitude: 9.015,
      longitude: 38.76,
      address: 'Bole, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-10pm',
      rating: 4.4,
      isOpened: true,
    },
    {
      name: 'Kategna Restaurant',
      latitude: 9.02,
      longitude: 38.75,
      address: 'Bole, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 8am-10pm',
      rating: 4.5,
      isOpened: true,
    },
    {
      name: 'Five Loaves',
      latitude: 9.01,
      longitude: 38.76,
      address: 'Bole, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 8am-10pm',
      rating: 4.3,
      isOpened: true,
    },
    {
      name: 'Sishu',
      latitude: 9.0,
      longitude: 38.75,
      address: 'Old Airport, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 8am-10pm',
      rating: 4.4,
      isOpened: true,
    },
    {
      name: 'Tomoca Coffee',
      latitude: 9.03,
      longitude: 38.74,
      address: 'Piassa, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 7am-9pm',
      rating: 4.7,
      isOpened: true,
    },
    {
      name: 'Aladdin Restaurant',
      latitude: 9.015,
      longitude: 38.76,
      address: 'Bole, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-10pm',
      rating: 4.5,
      isOpened: true,
    },
    {
      name: '2000 Habesha',
      latitude: 9.02,
      longitude: 38.76,
      address: 'Bole, Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 11am-11pm',
      rating: 4.6,
      isOpened: true,
    },
    {
      name: 'Belvedere Restaurant',
      latitude: 9.03,
      longitude: 38.75,
      address: 'Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 12pm-10pm',
      rating: 4.5,
      isOpened: true,
    },
    {
      name: 'Dashen Traditional Restaurant',
      latitude: 9.02,
      longitude: 38.75,
      address: 'Addis Ababa, Ethiopia',
      openingHours: 'Mon-Sun: 11am-10pm',
      rating: 4.4,
      isOpened: true,
    },
  ];

  async onApplicationBootstrap() {
    await this.seed();
  }

  private async seed() {
    this.logger.debug('Starting restaurant seeder');

    try {
      // Check if any restaurants already exist in the database
      const existingRestaurants = await this.db.restaurant.findMany();
      if (existingRestaurants.length > 0) {
        this.logger.log(
          'Restaurants already exist in the database. Skipping data population.',
        );
        return;
      }

      this.logger.log(
        'No existing restaurants found. Proceeding with data population.',
      );

      // Insert each restaurant into the database
      for (const restaurant of this.restaurants) {
        this.logger.debug(`Attempting to add restaurant: ${restaurant.name}`);

        const newRestaurant = await this.db.restaurant.create({
          data: restaurant,
        });

        this.logger.log(`Successfully added restaurant: ${newRestaurant.name}`);
      }

      this.logger.log('Restaurant data population completed successfully');
    } catch (error) {
      this.logger.error('Failed to populate restaurant data', error.stack);
    }
  }
}
