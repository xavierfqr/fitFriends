import { useState, useEffect } from "react";
import WorkoutLayout from "../layout/WorkoutLayout";
import WorkoutBuilder from "../workout/WorkoutBuilder";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import { useToast } from "@/components/ui/use-toast";

interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscle_group?: string;
  difficulty?: string;
  image_url?: string;
  sets: number;
  reps: number;
}

export default function WorkoutBuilderPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchExercises() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("exercises")
          .select("*")
          .order("name");

        if (error) throw error;

        if (data) {
          setExercises(
            data.map((ex) => ({
              id: ex.id,
              name: ex.name,
              description: ex.description,
              muscleGroup: ex.muscle_group,
              difficulty: ex.difficulty,
              imageUrl: ex.image_url,
              sets: 3,
              reps: 10,
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
        toast({
          title: "Error",
          description: "Failed to load exercises. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchExercises();
  }, [toast]);

  const handleSaveWorkout = async (workout: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save workouts.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Insert workout
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .insert({
          user_id: user.id,
          title: workout.title,
          description: workout.description,
          difficulty: workout.difficulty,
          is_public: workout.isPublic,
        })
        .select()
        .single();

      if (workoutError) throw workoutError;

      // Insert workout exercises
      const workoutExercises = workout.exercises.map(
        (exercise: any, index: number) => ({
          workout_id: workoutData.id,
          exercise_id: exercise.id,
          sets: exercise.sets,
          reps: exercise.reps,
          order_index: index,
        }),
      );

      const { error: exercisesError } = await supabase
        .from("workout_exercises")
        .insert(workoutExercises);

      if (exercisesError) throw exercisesError;

      toast({
        title: "Success",
        description: "Workout saved successfully!",
      });
    } catch (error) {
      console.error("Error saving workout:", error);
      toast({
        title: "Error",
        description: "Failed to save workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <WorkoutLayout>
      {loading ? (
        <div className="container mx-auto p-4 flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading exercises...</p>
          </div>
        </div>
      ) : (
        <WorkoutBuilder
          availableExercises={exercises}
          onSave={handleSaveWorkout}
        />
      )}
    </WorkoutLayout>
  );
}
