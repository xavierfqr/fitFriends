import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Calendar, Award, Users, Edit } from "lucide-react";
import WorkoutCard from "./WorkoutCard";

interface ProfileDashboardProps {
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
  };
  stats?: {
    workoutsCreated: number;
    workoutsCompleted: number;
    followers: number;
    following: number;
  };
  workouts?: any[];
  achievements?: {
    id: string;
    title: string;
    description: string;
    icon: string;
    date: string;
  }[];
}

const defaultAchievements = [
  {
    id: "1",
    title: "First Workout",
    description: "Completed your first workout",
    icon: "🏆",
    date: "June 15, 2023",
  },
  {
    id: "2",
    title: "Workout Streak",
    description: "Completed workouts 5 days in a row",
    icon: "🔥",
    date: "July 3, 2023",
  },
  {
    id: "3",
    title: "Community Contributor",
    description: "Created and shared 5 workouts",
    icon: "🌟",
    date: "July 18, 2023",
  },
];

export default function ProfileDashboard({
  user = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    bio: "Fitness enthusiast and calisthenics practitioner. Love sharing workout routines and helping others achieve their fitness goals.",
  },
  stats = {
    workoutsCreated: 12,
    workoutsCompleted: 45,
    followers: 128,
    following: 87,
  },
  workouts = [],
  achievements = defaultAchievements,
}: ProfileDashboardProps) {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>

              <p className="text-sm">{user.bio}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.workoutsCreated}</p>
                  <p className="text-sm text-muted-foreground">
                    Workouts Created
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {stats.workoutsCompleted}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Workouts Completed
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.followers}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.following}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="workouts">
        <TabsList className="mb-6">
          <TabsTrigger value="workouts" className="gap-2">
            <Dumbbell className="h-4 w-4" />
            My Workouts
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Calendar className="h-4 w-4" />
            Workout History
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="following" className="gap-2">
            <Users className="h-4 w-4" />
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workouts">
          <Card>
            <CardHeader>
              <CardTitle>My Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              {workouts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} {...workout} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No workouts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't created any workouts yet. Start creating your
                    first workout routine.
                  </p>
                  <Button>Create Workout</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Workout History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No workout history</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't logged any completed workouts yet. Start tracking
                  your progress.
                </p>
                <Button>Log Workout</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div className="space-y-2">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                          <Badge variant="outline">{achievement.date}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="following">
          <Card>
            <CardHeader>
              <CardTitle>Following</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No users followed yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  You aren't following any users yet. Explore the community to
                  find fitness enthusiasts to follow.
                </p>
                <Button>Explore Community</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
