import dotenv from "dotenv";

dotenv.config()

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5500
};

export default env;