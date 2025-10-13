import express from "express";
import studentController from "../controllers/studentController.js";

const { updateUser, getUser, deleteUser, getAllUsers, getAllUserEmails, getUserGroups, addBalance } = studentController;

const router = express.Router();

router.get("/:id", getUser);

export default router;
