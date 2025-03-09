import { useState, useEffect } from "react";
import WorkoutLayout from "../layout/WorkoutLayout";
import ProgressTracker from "../workout/ProgressTracker";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import { useToast } from "@/components/ui/use-toast";

interface ProgressEntry {
  id: string;
  date: Date;
  notes: string;
  photoUrl?: string;
  workoutId?: string;
  workoutTitle?: string;
}

export default function ProgressPage() {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    async function fetchProgressEntries() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("progress_tracking")
          .select(`
            id, 
            date, 
            notes, 
            photo_url,
            workout_id,
            workouts:workout_id (title)
          `)
          .eq("user_id", user.id)
          .order("date", { ascending: false });

        if (error) throw error;

        if (data) {
          // Transform data to match our component's expected format
          const transformedEntries = data.map(entry => ({
            id: entry.id,
            date: new Date(entry.date),
            notes: entry.notes || "",
            photoUrl: entry.photo_url,
            workoutId: entry.workout_id,
            workoutTitle: entry.workouts?.title,
          }));
          
          setEntries(transformedEntries);
        }
      } catch (error) {
        console.error("Error fetching progress entries:", error);
        toast({
          title: "Error",
          description: "Failed to load progress data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProgressEntries();
  }, [user, toast]);

  const handleAddEntry = async (