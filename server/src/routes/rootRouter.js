import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
const rootRouter = new express.Router()

import recipesRouter from "./api/v1/recipesRouter.js"

rootRouter.use("/", clientRouter)

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/recipes", recipesRouter)

export default rootRouter;
