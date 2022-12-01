import winston from 'winston'

const transports = []
if (process.env.FUNCTIONS_EMULATOR !== 'true') {
    transports.push(
        new winston.transports.Stream({ stream: process.stdout })

    )
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
            )
        })
    )
}
const logger = winston.createLogger({
    level: 'info',
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf(info => `${info.timestamp} [${info.level}] ${info.message}`)
    ),
    transports
})

export default logger