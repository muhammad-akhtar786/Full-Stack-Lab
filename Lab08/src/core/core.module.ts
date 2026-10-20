
import { Global, Module } from '@nestjs/common';
import { APP_CONFIG, appConfig } from './app-config';
import {
  AppLogger,
  ConsoleAppLogger,
  FileAppLogger,
  SilentAppLogger,
} from '../common/logger/app-logger';

@Global()
@Module({
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },

    {
      provide: AppLogger,
      useClass:
        process.env.LOG === 'off'
          ? SilentAppLogger
          : process.env.LOG_TO_FILE === 'true'
            ? FileAppLogger
            : ConsoleAppLogger,
    },
  ],
  exports: [APP_CONFIG, AppLogger],
})
export class CoreModule {}
