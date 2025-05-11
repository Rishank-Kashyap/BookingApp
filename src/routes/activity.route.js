import express from "express";
import { listActivities, addActivity, bookActivity, getMyBookings } from "../controllers/activity.controller.js";
import userAuth from "../middlewares/auth.js";

const activityRoute = express.Router();

activityRoute.route("/list").get(listActivities);

activityRoute.route("/add").post(addActivity);

activityRoute.route("/book").post(userAuth, bookActivity);

activityRoute.route("/bookings").get(userAuth, getMyBookings);

export default activityRoute;
