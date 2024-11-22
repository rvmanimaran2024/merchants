import { Module, OnModuleInit, Inject } from '@nestjs/common'; // Import Inject
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MerchantsModule } from './merchants/merchants.module';
import { MerchantsService } from './merchants/merchants.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonLoggerModule } from './winston-logger/winston-logger.module';
import { WinstonLoggerService } from './winston-logger/winston-logger.service'; // Import the Winston Logger Service
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/src/uploads'), // Actual path on your system
      serveRoot: '/uploads', // Route that will serve the files
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
      envFilePath: './config/.env', // Path to your .env file
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access environment variables
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>('DATABASE_PROTOCOL')}://${configService.get<string>('DATABASE_HOST')}:${configService.get<string>('DATABASE_PORT')}/${configService.get<string>('DATABASE_NAME')}`,
      }),
    }),
    MerchantsModule,
    WinstonLoggerModule,
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000, // 1 second
      limit: 3, // 3 requests
    }, {
      name: 'long',
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests
    }]),
  ],
  // providers: [
  //   MerchantsService,
  //   {
  //     provide: APP_GUARD,
  //     useClass: ThrottlerGuard,
  //   },
  // ],
  providers: [
     // Keep this if you plan to inject WinstonLoggerService in other parts of the module
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ]
})
export class AppModule implements OnModuleInit {

  constructor(private readonly winstonLoggerService: WinstonLoggerService) {} // Inject WinstonLoggerService

  onModuleInit() {
    // Log messages on module initialization
    this.winstonLoggerService.logInfo('AppModule initialized');
    // Log sample messages for testing
    this.winstonLoggerService.logError('Sample error log');
    this.winstonLoggerService.logDebug('Debugging log message');
  }
}
