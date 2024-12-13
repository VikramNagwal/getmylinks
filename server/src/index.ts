import app from "./app";
import chalk from "chalk"

const server = Bun.serve({
    fetch: app.fetch,
})

console.log(chalk.green(`server is up and running on port http://localhost:${server.port}`));