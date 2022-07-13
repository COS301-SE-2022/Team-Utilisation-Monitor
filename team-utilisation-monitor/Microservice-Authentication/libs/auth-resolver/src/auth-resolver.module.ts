import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServicesModule, ServicesService } from 'micro-auth-service/services';
import { AuthenticationResolversResolver } from './authentication-resolvers.resolver';

/***
 * The AuthResolverService is useless at this stage
 */

@Module({
  providers: [AuthenticationResolversResolver],
  imports: [
    ServicesModule,
    GraphQLModule.forRoot({
      autoSchemaFile:true,
      playground:true,
      driver: ApolloDriver
    })
  ],
  exports: [],
})
export class AuthResolverModule {}
