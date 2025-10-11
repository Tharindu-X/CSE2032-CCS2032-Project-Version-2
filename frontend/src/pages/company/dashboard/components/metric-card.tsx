import type React from "react"
import { Card, CardContent } from "../components/ui/card"

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  change: string
  icon: React.ReactNode
}

export function MetricCard({ title, value, description, change, icon }: MetricCardProps) {
  const isPositive = change.startsWith("+")
  const isNegative = change.startsWith("-")

  return (
    <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-muted rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
            {icon}
          </div>
          <div
            className={`text-sm font-medium transition-all duration-200 group-hover:scale-105 ${
              isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-muted-foreground"
            }`}
          >
            {change}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-foreground transition-all duration-300 group-hover:text-primary">
            {value}
          </div>
          <div className="font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
            {title}
          </div>
          <div className="text-sm text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
            {description}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
