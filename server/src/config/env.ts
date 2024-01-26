import 'dotenv/config'

export default {
  port: process.env.PORT!,
  dbUrl: process.env.DB_URL!,
  dbName: process.env.DB_NAME!,
  jwtAccessToken: process.env.ACCESS_TOKEN!,
  jwtRefreshToken: process.env.REFRESH_TOKEN!,
  expAccessToken: process.env.EXP_ACCESS_TOKEN!,
  expRefreshToken: process.env.EXP_REFRESH_TOKEN!
}
