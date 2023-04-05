import { config } from "dotenv";
config();

export const appConfig = {
  TEST_NETWORK: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
  TX_KEY: process.env.SENDER_PRIVATE_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
  SENDER_ADDRESS: process.env.SENDER_ADDRESS,
  RECEIVER_ADDRESS: process.env.RECEIVER_ADDRESS,
  INVALID_SENDER_ADDRESS: process.env.INVALID_SENDER_ADDRESS,
};
