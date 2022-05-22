import { Module } from '@nestjs/common';
import { ApiFeatureResolver } from './api-feature/api-feature.resolver';
import { ServiceFeatureService } from '@team-utilisation-monitor/service/feature';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { QueryBus } from '@nestjs/cqrs';

@Module({
  controllers: [],
  providers: [ApiFeatureResolver,ServiceFeatureService,QueryBus],
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile:true,
      playground:true,
      driver:ApolloDriver
    })
  ],
  exports: [],
})
export class ApiFeatureModule {}
