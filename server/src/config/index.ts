import dotenv from "dotenv";
import { access } from "fs";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config ={
    connection_str :process.env.CONNECTION_STR,
    port:process.env.PORT,
    accessTokenSecret:process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret:process.env.REFRESH_TOKEN_SECRET
}
export default config