import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export default {
    // General
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    // Database
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    ACTIVATION_SECRET: process.env.ACTIVATION_SECRET,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_MAIL: process.env.SMTP_MAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD
}
