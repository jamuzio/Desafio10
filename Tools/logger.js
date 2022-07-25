import log4js from 'log4js'

log4js.configure({
  appenders: {
    Console: { type: 'console' },
    WarningFile: { type: 'file', filename: './Logs/warn.log' },
    ErrorFile: { type: 'file', filename: './Logs/error.log' },
    loggerConsole: {
      type: 'logLevelFilter',
      appender: 'Console',
      level: 'info',
    },
    loggerWarningFile: {
      type: 'logLevelFilter',
      appender: 'WarningFile',
      level: 'warn',
      maxLevel: 'warn'
    },
    loggerErrorFile: {
      type: 'logLevelFilter',
      appender: 'ErrorFile',
      level: 'error',
    },
  },
  categories: {
    default: {
      appenders: ['loggerConsole', 'loggerWarningFile', 'loggerErrorFile'],
      level: 'all'
    }
  },
})

const logger = log4js.getLogger()

export default logger
