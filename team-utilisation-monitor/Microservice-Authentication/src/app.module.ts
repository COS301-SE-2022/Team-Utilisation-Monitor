import { Module } from '@nestjs/common';
import { AuthResolverModule } from 'auth-res/auth-resolver';
import { ServicesModule } from 'micro-auth-service/services';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthResolverModule,ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
