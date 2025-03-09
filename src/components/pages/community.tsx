import { useState, useEffect } from "react";
import WorkoutLayout from "../layout/WorkoutLayout";
import CommunityFeed from "../workout/CommunityFeed";
import { supabase } from "../../../supabase/supabase";
import { useToast } from "@/components/ui/use-toast";

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

export default function CommunityPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("workouts")
          .select(
            `
            id, 
            title, 
            description, 
            difficulty, 
            is_public,
            created_at,
            user_id,
            users:user_id (full_name, avatar_url),
            workout_exercises (id)
          `,
          )
          .eq("is_public", true)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data) {
          // Transform data to match our component's expected format
          const transformedWorkouts = data.map((workout) => ({
            id: workout.id,
            title: workout.title,
            description: workout.description || "No description provided",
            difficulty: workout.difficulty,
            exerciseCount: workout.workout_exercises?.length || 0,
            estimatedTime: `${Math.round((workout.workout_exercises?.length || 0) * 5)} min`,
            rating: 4.5, // Placeholder for now
            author: {
              name: workout.users?.full_name || "Anonymous",
              avatar:
                workout.users?.avatar_url ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${workout.user_id}`,
            },
          }));

          setWorkouts(transformedWorkouts);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
        toast({
          title: "Error",
          description:
            "Failed to load community workouts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, [toast]);

  const handleWorkoutClick = (workout: Workout) => {
    // For now, just show a toast. Later we can navigate to a workout detail page
    toast({
      title: workout.title,
      description: `Viewing details for ${workout.title}`,
    });
  };

  return (
    <WorkoutLayout>
      {loading ? (
        <div className="container mx-auto p-4 flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Loading community workouts...
            </p>
          </div>
        </div>
      ) : (
        <CommunityFeed
          workouts={workouts}
          onWorkoutClick={handleWorkoutClick}
        />
      )}
    </WorkoutLayout>
  );
}
