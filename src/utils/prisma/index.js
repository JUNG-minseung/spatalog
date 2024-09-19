import { PrismaClient as GameDataClient} from "../../../prisma/game/GameDataClient/index.js";
import { PrismaClient as GameDataClient} from "../../../prisma/user/userDataClient/index.js";

export const gameDataClient = new GameDataClient({
    log: ["query", "info", "warn", "error"],
    errorFormat:"pretty",
});

export const userDataClient = new UserDataClient({
    log: ["query", "info", "warn", "error"],
    errorFormat:"pretty",
});
