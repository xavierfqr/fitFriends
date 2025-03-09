import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import WorkoutCard from "./WorkoutCard";

interface Workout {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  exerciseCount: number;
  estimatedTime: string;
  rating: number;
  author: {
    name: string;
    avatar?: string;
  };
}

interface CommunityFeedProps {
  workouts?: Workout[];
  onWorkoutClick?: (workout: Workout) => void;
}

const defaultWorkouts: Workout[] = [
  {
    id: "1",
    title: "Full Body Calisthenics",
    description:
      "A comprehensive workout targeting all major muscle groups using only bodyweight exercises.",
    difficulty: "Intermediate",
    exerciseCount: 8,
    estimatedTime: "45 min",
    rating: 4.8,
    author: {
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
  },
  {
    id: "2",
    title: "Advanced Pull Workout",
    description:
      "Focus on building back and bicep strength with advanced pull exercises.",
    difficulty: "Advanced",
    exerciseCount: 6,
    estimatedTime: "40 min",
    rating: 4.5,
    author: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  },
  {
    id: "3",
    title: "Beginner Street Workout",
    description:
      "Perfect for beginners looking to get started with street workouts and calisthenics.",
    difficulty: "Beginner",
    exerciseCount: 5,
    estimatedTime: "30 min",
    rating: 4.9,
    author: {
      name: "Mike Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
  },
  {
    id: "4",
    title: "Core Crusher",
    description:
      "Intense core workout to build strength and definition in your abs and lower back.",
    difficulty: "Intermediate",
    exerciseCount: 7,
    estimatedTime: "35 min",
    rating: 4.7,
    author: {
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
  },
];

export default function CommunityFeed({
  workouts = defaultWorkouts,
  onWorkoutClick = () => {},
}: CommunityFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    let filtered = workouts;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (workout) =>
          workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workout.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter(
        (workout) => workout.difficulty.toLowerCase() === activeTab,
      );
    }

    setFilteredWorkouts(filtered);
  }, [searchQuery, workouts, activeTab]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Community Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    {...workout}
                    onClick={() => onWorkoutClick(workout)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="beginner" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    {...workout}
                    onClick={() => onWorkoutClick(workout)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="intermediate" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    {...workout}
                    onClick={() => onWorkoutClick(workout)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    {...workout}
                    onClick={() => onWorkoutClick(workout)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
