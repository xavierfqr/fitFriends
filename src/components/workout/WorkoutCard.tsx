import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Star, Users } from "lucide-react";

interface WorkoutCardProps {
  title: string;
  description?: string;
  difficulty?: string;
  exerciseCount?: number;
  estimatedTime?: string;
  rating?: number;
  author?: {
    name: string;
    avatar?: string;
  };
  onClick?: () => void;
  className?: string;
}

export default function WorkoutCard({
  title = "Workout Title",
  description = "Workout description goes here",
  difficulty = "Intermediate",
  exerciseCount = 5,
  estimatedTime = "30 min",
  rating = 4.5,
  author = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  onClick,
  className = "",
}: WorkoutCardProps) {
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
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge variant="outline" className={difficultyColor}>
            {difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{exerciseCount} exercises</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{author.name}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
