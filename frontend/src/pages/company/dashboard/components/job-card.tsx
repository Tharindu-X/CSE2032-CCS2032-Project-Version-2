import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { MapPin, Clock, Users, Calendar } from "lucide-react"
import { Link } from "react-router-dom";
interface Job {
  job_id: string
  job_title: string
  job_type: string
  job_description: string
  benefits?: string[]
  skills?: string[]
  no_of_applicants: number
  job_location: string
  closing_date: string
  job_category: string
  job_tags?: string[]
  created_at: string
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const daysAgo = Math.floor(
    (Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24)
  )

  // Safe array defaults
  const skills = Array.isArray(job.skills) ? job.skills : []
  const benefits = Array.isArray(job.benefits) ? job.benefits : []
  const tags = Array.isArray(job.job_tags)
    ? job.job_tags
    : typeof job.job_tags === "string"
    ? job.job_tags.split(",").map((t) => t.trim())
    : []

  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1 cursor-pointer group border-border hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground transition-colors duration-200 group-hover:text-primary">
              {job.job_title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 transition-colors duration-200 group-hover:text-foreground">
                <MapPin className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                {job.job_location}
              </div>
              <div className="flex items-center gap-1 transition-colors duration-200 group-hover:text-foreground">
                <Clock className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                {daysAgo} days ago
              </div>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 transition-all duration-200 hover:bg-blue-100 hover:scale-105 hover:shadow-sm"
          >
            {job.job_type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2 transition-colors duration-200 group-hover:text-foreground">
          {job.job_description}
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-xs transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground cursor-pointer"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge
              variant="secondary"
              className="text-xs transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground cursor-pointer"
            >
              +{skills.length - 4} more
            </Badge>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs transition-all duration-200 hover:scale-105 hover:bg-purple-200 hover:text-purple-900 cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border transition-colors duration-200 group-hover:border-primary/20">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 transition-colors duration-200 group-hover:text-foreground">
              <Users className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              {job.no_of_applicants} applicants
            </div>
            <div className="flex items-center gap-1 transition-colors duration-200 group-hover:text-foreground">
              <Calendar className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              Closes {formatDate(job.closing_date)}
            </div>
          </div>
<Link to={`/job/${job.job_id}/applications`}>
  <Button variant="outline" size="sm">
    View Details
  </Button>
</Link>
        </div>
      </CardContent>
    </Card>
  )
}
