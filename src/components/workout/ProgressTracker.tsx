import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Camera, Upload, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface ProgressEntry {
  id: string;
  date: Date;
  notes: string;
  photoUrl?: string;
  workoutId?: string;
  workoutTitle?: string;
}

interface ProgressTrackerProps {
  entries?: ProgressEntry[];
  onAddEntry?: (entry: Omit<ProgressEntry, "id">) => void;
}

const defaultEntries: ProgressEntry[] = [
  {
    id: "1",
    date: new Date(2023, 6, 15),
    notes: "Completed full body workout. Increased pull-up reps to 12.",
    photoUrl:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
    workoutId: "1",
    workoutTitle: "Full Body Calisthenics",
  },
  {
    id: "2",
    date: new Date(2023, 6, 18),
    notes: "Core workout. Added 30 seconds to plank hold.",
    photoUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    workoutId: "4",
    workoutTitle: "Core Crusher",
  },
  {
    id: "3",
    date: new Date(2023, 6, 21),
    notes: "Pull day. First muscle-up achieved!",
    photoUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    workoutId: "2",
    workoutTitle: "Advanced Pull Workout",
  },
];

export default function ProgressTracker({
  entries = defaultEntries,
  onAddEntry = () => {},
}: ProgressTrackerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<ProgressEntry | null>(
    null,
  );

  const handleAddEntry = () => {
    if (!date) return;

    onAddEntry({
      date,
      notes,
      photoUrl,
    });

    // Reset form
    setNotes("");
    setPhotoUrl("");
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    const entry = entries.find(
      (e) =>
        e.date.getDate() === date?.getDate() &&
        e.date.getMonth() === date?.getMonth() &&
        e.date.getFullYear() === date?.getFullYear(),
    );
    setSelectedEntry(entry || null);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Progress Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calendar">
            <TabsList className="mb-6">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="photos">Photo Progress</TabsTrigger>
              <TabsTrigger value="add">Add Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="border rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  {selectedEntry ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">
                          {format(selectedEntry.date, "MMMM d, yyyy")}
                        </h3>
                        {selectedEntry.workoutTitle && (
                          <span className="text-sm text-muted-foreground">
                            Workout: {selectedEntry.workoutTitle}
                          </span>
                        )}
                      </div>

                      <p className="text-muted-foreground">
                        {selectedEntry.notes}
                      </p>

                      {selectedEntry.photoUrl && (
                        <div className="mt-4">
                          <img
                            src={selectedEntry.photoUrl}
                            alt="Progress"
                            className="rounded-md max-h-[300px] object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">
                        {date
                          ? "No entries for this date"
                          : "Select a date to view progress"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {entries
                  .filter((entry) => entry.photoUrl)
                  .map((entry) => (
                    <div key={entry.id} className="relative group">
                      <img
                        src={entry.photoUrl}
                        alt={format(entry.date, "MMMM d, yyyy")}
                        className="rounded-md w-full h-[200px] object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                        <div className="text-white text-center p-4">
                          <p className="font-semibold">
                            {format(entry.date, "MMMM d, yyyy")}
                          </p>
                          <p className="text-sm truncate">{entry.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="How was your workout? Any achievements?"
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="photo"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="Enter photo URL"
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter a URL or upload a photo
                    </p>
                  </div>

                  <Button onClick={handleAddEntry} className="w-full">
                    Add Progress Entry
                  </Button>
                </div>

                <div className="flex flex-col items-center justify-center border rounded-md p-6">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Preview"
                      className="max-h-[300px] object-contain rounded-md"
                    />
                  ) : (
                    <div className="text-center space-y-4">
                      <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">
                        Photo preview will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
