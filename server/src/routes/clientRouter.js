import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();
const clientRoutes = ["/", "/recipes", "/recipes/:id", "/user-sessions/new", "/users/new", "/recipes/new"];

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
