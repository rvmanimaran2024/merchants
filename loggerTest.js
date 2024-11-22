// import * as winston from 'winston';
// import { WinstonModuleOptions } from 'nest-winston';

// export const winstonConfig: WinstonModuleOptions = {
//   transports: [
//     // Console Transport (optional, logs everything to console)
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//         winston.format.printf(({ timestamp, level, message }) => {
//           return `${timestamp} [${level}]: ${message}`;
//         }),
//       ),
//     }),

//     // Info level log (JSON format)
//     new winston.transports.File({
//       filename: 'logs/info.log',
//       level: 'info',
//       format: winston.format.combine(
//         winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//         winston.format.json(),
//       ),
//     }),

//     // Error level log (JSON format)
//     new winston.transports.File({
//       filename: 'logs/error.log',
//       level: 'error',
//       format: winston.format.combine(
//         winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//         winston.format.json(),
//       ),
//     }),

//     // Debug level log (only captures debug level)
//     new winston.transports.File({
//       filename: 'logs/debug.log',
//       level: 'debug', // Capture only debug logs
//       format: winston.format.combine(
//         winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//         // Custom filter to allow only 'debug' level logs
//         winston.format((info) => {
//           return info.level === 'debug' ? info : false; // Filter out non-debug levels
//         })(),
//         winston.format.printf(({ timestamp, level, message }) => {
//           return `${timestamp} [${level}]: ${message}`; // Custom printf format for debug
//         }),
//       ),
//     }),
//   ],
// };
