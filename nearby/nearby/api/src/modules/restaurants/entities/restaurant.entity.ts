import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  address: string;

  @Field()
  openingHours: string;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field()
  isOpened: boolean;
}
