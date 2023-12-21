import { config } from "dotenv";

//config();
const GameServerConfig = {
    url: process.env.NEXT_PUBLIC_GAME_SERVER_URL
};
export default GameServerConfig;