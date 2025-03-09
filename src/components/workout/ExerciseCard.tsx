import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell } from "lucide-react";

interface ExerciseCardProps {
  name: string;
  description?: string;
  muscleGroup?: string;
  difficulty?: string;
  imageUrl?: string;
  sets?: number;
  reps?: number;
  onClick?: () => void;
  className?: string;
}

export default function ExerciseCard({
  name = "Exercise Name",
  description = "Exercise description goes here",
  muscleGroup = "Full Body",
  difficulty = "Intermediate",
  imageUrl,
  sets,
  reps,
  onClick,
  className = "",
}: ExerciseCardProps) {
  const difficultyColor =
    {
      Beginner: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-red-100 text-red-800",
    }[difficulty] || "bg-gray-100 text-gray-800";

  return (
    <Card
      className={`overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="relative h-40 bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Dumbbell className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Badge variant="outline" className={difficultyColor}>
            {difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <Badge variant="secondary">{muscleGroup}</Badge>
          {sets && reps && (
            <span className="text-sm text-muted-foreground">
              {sets} sets × {reps} reps
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
