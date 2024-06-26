import express from "express";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";
import { authorizeRoles, isAutheticated } from "../middlewares/auth";
const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  isAutheticated,
  authorizeRoles("admin"),
  getNotifications
);
notificationRoute.put(
  "/update-notification/:id",
  isAutheticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRoute;
