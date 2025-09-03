import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseFilter } from './utils/database-error.filter';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { DatabaseModule } from './modules/database/database.module';
import { RestaurantSeeder } from './modules/restaurants/restaurants.seeder';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    DatabaseModule,
    RestaurantsModule,
  ],
  controllers: [],
  providers: [
    RestaurantSeeder,
    {
      provide: APP_FILTER,
      useClass: DatabaseFilter,
    },
  ],
})
export class AppModule {}
