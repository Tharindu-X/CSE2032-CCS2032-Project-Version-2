import jobRepository from "../repositories/jobRepository.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobRepository.getAllJobs();
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};
