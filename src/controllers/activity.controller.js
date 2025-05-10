import mongoose from "mongoose";
import Activity from "../models/activity.model.js";
import Booking from "../models/booking.model.js";

export const listActivities = async (req, res) => {
  try {
    const activities = await Activity.find();

    if (activities.length === 0) {
      return res.status(404).json({
        message: "No activities found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Activities fetched successfully.",
      success: true,
      activities,
    });
  } catch (err) {
    console.error("Error fetching activities:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// This API allows an admin to manually add an activity to the database.
// Currently, it is not used in the frontend, but it can be utilized in the future for an admin panel
// that would allow the admin to manage and add activities dynamically to the platform.
export const addActivity = async (req, res) => {
  try {
    const { title, description, location, date, time } = req.body;

    if (!title || !description || !location || !date || !time) {
      return res.status(400).json({
        message:
          "Please provide all the required fields (title, description, location, date, time).",
        success: false,
      });
    }

    const activity = new Activity({
      title,
      description,
      location,
      date,
      time,
    });

    const savedActivity = await activity.save();

    return res.status(201).json({
      message: "Activity added successfully.",
      success: true,
      activity: savedActivity,
    });
  } catch (err) {
    console.error("Error adding activity:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const bookActivity = async (req, res) => {
  try {

    const userId = req.user._id;
    const { activityId } = req.body;


    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      return res.status(400).json({
        message: "Invalid activity ID",
        success: false,
      });
    }

    const activity = await Activity.findById(activityId);
    console.log("Found activity:", activity);

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
        success: false,
      });
    }

    const existingBooking = await Booking.findOne({
      user: userId,
      activity: activityId,
    });
    if (existingBooking) {
      return res.status(400).json({
        message: "You have already booked this activity",
        success: false,
      });
    }

    const booking = new Booking({
      user: userId,
      activity: activityId,
    });

    const savedBooking = await booking.save();

    return res.status(201).json({
      message: "Activity booked successfully",
      booking: savedBooking,
      success: true,
    });
  } catch (err) {
    console.error("Booking error:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user: userId }).populate("activity");

    if (bookings.length === 0) {
      return res.status(404).json({
        message: "No bookings found for this user.",
        success: false,
      });
    }

    const activitiesBooked = bookings.map((booking) => ({
      id: booking.activity._id,
      title: booking.activity.title,
      description: booking.activity.description,
      location: booking.activity.location,
      date: booking.activity.date,
      time: booking.activity.time,
    }));

    return res.status(200).json({
      message: "Bookings fetched successfully.",
      success: true,
      bookings: activitiesBooked,
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
