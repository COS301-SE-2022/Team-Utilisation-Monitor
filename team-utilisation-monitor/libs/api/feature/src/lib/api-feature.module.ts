import { Module } from '@nestjs/common';
import { ApiFeatureResolver } from './api-feature/api-feature.resolver';
import { ServiceFeatureModule } from '@team-utilisation-monitor/service/feature';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  controllers: [],
  providers: [ApiFeatureResolver],
  imports: [
    ServiceFeatureModule,
    GraphQLModule.forRoot({
      autoSchemaFile:true,
      playground:true,
      driver:ApolloDriver
    })
  ],
  exports: [],
})
export class ApiFeatureModule {}
