export class Job {
  constructor({
    job_id,
    com_id,
    job_title,
    job_type,
    job_location,
    job_description,
    job_category,
    requirements,
    responsibilities,
    no_of_applicants,
    job_tags,
    closing_date,
    created_at,
  }) {
    this.job_id = job_id;
    this.com_id = com_id;
    this.job_title = job_title;
    this.job_type = job_type;
    this.job_location = job_location;
    this.job_description = job_description;
    this.job_category = job_category;
    this.requirements = requirements || "";
    this.responsibilities = responsibilities || "";
    this.no_of_applicants = no_of_applicants || 0;
    this.job_tags = job_tags || "";
    this.closing_date = closing_date;
    this.created_at = created_at;
  }
}
