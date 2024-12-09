import { Hono } from "hono";

const app = new Hono()

app.get("/", (c) => {
    return c.json("hello world")
})

app.notFound((c) => {
    return c.text("not found", 404)
})

export default app