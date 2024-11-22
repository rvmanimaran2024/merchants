import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './winston.config'; // Import the config
import { WinstonLoggerService } from './winston-logger.service';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig), // Register Winston with the configuration
  ],
  providers: [WinstonLoggerService], // Provide the WinstonLoggerService
  exports: [WinstonLoggerService], // Export the service so it can be used in other modules
})
export class WinstonLoggerModule {}
