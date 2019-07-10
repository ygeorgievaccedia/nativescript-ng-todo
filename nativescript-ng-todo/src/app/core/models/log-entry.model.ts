import { LoggingLevelEnum } from './enums/logging-level.enum';

export interface LogEntry {
    message: string;
    level: LoggingLevelEnum;
}
