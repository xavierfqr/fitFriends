import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";
import ExerciseCard from "./ExerciseCard";

interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscleGroup?: string;
  difficulty?: string;
  imageUrl?: string;
  sets: number;
  reps: number;
}

interface WorkoutBuilderProps {
  onSave?: (workout: any) => void;
  availableExercises?: Exercise[];
  initialWorkout?: any;
}

// This is a placeholder component as we don't have react-beautiful-dnd installed yet
// We'll need to install it with: npm install react-beautiful-dnd
export default function WorkoutBuilder({
  onSave = () => {},
  availableExercises = [],
  initialWorkout = null,
}: WorkoutBuilderProps) {
  const [title, setTitle] = useState(initialWorkout?.title || "");
  const [description, setDescription] = useState(
    initialWorkout?.description || "",
  );
  const [difficulty, setDifficulty] = useState(
    initialWorkout?.difficulty || "Intermediate",
  );
  const [isPublic, setIsPublic] = useState(initialWorkout?.isPublic || false);
  const [exercises, setExercises] = useState<Exercise[]>(
    initialWorkout?.exercises || [],
  );

  // Placeholder for DnD functionality
  const handleDragEnd = (result: any) => {
    // We'll implement this when we have react-beautiful-dnd
    console.log("Drag ended", result);
  };

  const addExercise = (exercise: Exercise) => {
    setExercises([...exercises, { ...exercise, sets: 3, reps: 10 }]);
  };

  const removeExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const updateExercise = (index: number, field: string, value: any) => {
    const newExercises = [...exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setExercises(newExercises);
  };

  const handleSave = () => {
    const workout = {
      title,
      description,
      difficulty,
      isPublic,
      exercises,
    };
    onSave(workout);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Workout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Workout Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter workout title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your workout"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end space-x-2">
              <Label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="form-checkbox h-5 w-5"
                />
                <span>Make this workout public</span>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Workout Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              {exercises.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No exercises added yet. Add exercises from the library.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <div className="cursor-move">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {exercise.muscleGroup}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20">
                          <Label htmlFor={`sets-${index}`} className="text-xs">
                            Sets
                          </Label>
                          <Input
                            id={`sets-${index}`}
                            type="number"
                            min="1"
                            value={exercise.sets}
                            onChange={(e) =>
                              updateExercise(
                                index,
                                "sets",
                                parseInt(e.target.value),
                              )
                            }
                            className="h-8"
                          />
                        </div>
                        <div className="w-20">
                          <Label htmlFor={`reps-${index}`} className="text-xs">
                            Reps
                          </Label>
                          <Input
                            id={`reps-${index}`}
                            type="number"
                            min="1"
                            value={exercise.reps}
                            onChange={(e) =>
                              updateExercise(
                                index,
                                "reps",
                                parseInt(e.target.value),
                              )
                            }
                            className="h-8"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExercise(index)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Workout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Exercise Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {availableExercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center gap-2">
                    <div className="flex-1">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {exercise.muscleGroup}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => addExercise(exercise)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
