-- Create exercises table
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  muscle_group TEXT,
  difficulty TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workouts table
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workout_exercises junction table
CREATE TABLE IF NOT EXISTS workout_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  sets INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  rest_time INTEGER, -- in seconds
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workout_ratings table
CREATE TABLE IF NOT EXISTS workout_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(workout_id, user_id)
);

-- Create progress_tracking table
CREATE TABLE IF NOT EXISTS progress_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  notes TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table in public schema to mirror auth.users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Exercises policies
DROP POLICY IF EXISTS "Exercises are viewable by everyone" ON exercises;
CREATE POLICY "Exercises are viewable by everyone"
  ON exercises FOR SELECT
  USING (true);

-- Workouts policies
DROP POLICY IF EXISTS "Users can create their own workouts" ON workouts;
CREATE POLICY "Users can create their own workouts"
  ON workouts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own workouts" ON workouts;
CREATE POLICY "Users can update their own workouts"
  ON workouts FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own workouts" ON workouts;
CREATE POLICY "Users can delete their own workouts"
  ON workouts FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own workouts" ON workouts;
CREATE POLICY "Users can view their own workouts"
  ON workouts FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

-- Workout exercises policies
DROP POLICY IF EXISTS "Users can manage their own workout exercises" ON workout_exercises;
CREATE POLICY "Users can manage their own workout exercises"
  ON workout_exercises FOR ALL
  USING (EXISTS (SELECT 1 FROM workouts WHERE workouts.id = workout_exercises.workout_id AND workouts.user_id = auth.uid()));

-- Workout ratings policies
DROP POLICY IF EXISTS "Users can rate workouts" ON workout_ratings;
CREATE POLICY "Users can rate workouts"
  ON workout_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own ratings" ON workout_ratings;
CREATE POLICY "Users can update their own ratings"
  ON workout_ratings FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own ratings" ON workout_ratings;
CREATE POLICY "Users can delete their own ratings"
  ON workout_ratings FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view all ratings" ON workout_ratings;
CREATE POLICY "Users can view all ratings"
  ON workout_ratings FOR SELECT
  USING (true);

-- Progress tracking policies
DROP POLICY IF EXISTS "Users can manage their own progress" ON progress_tracking;
CREATE POLICY "Users can manage their own progress"
  ON progress_tracking FOR ALL
  USING (auth.uid() = user_id);

-- Users policies
DROP POLICY IF EXISTS "Users can view other users" ON users;
CREATE POLICY "Users can view other users"
  ON users FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON users;
CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Enable realtime for all tables
alter publication supabase_realtime add table exercises;
alter publication supabase_realtime add table workouts;
alter publication supabase_realtime add table workout_exercises;
alter publication supabase_realtime add table workout_ratings;
alter publication supabase_realtime add table progress_tracking;
alter publication supabase_realtime add table users;

-- Insert some default exercises
INSERT INTO exercises (name, description, muscle_group, difficulty, image_url) VALUES
('Pull-up', 'A classic upper body exercise that targets the back, biceps, and shoulders', 'Back', 'Intermediate', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80'),
('Push-up', 'A fundamental exercise that works the chest, shoulders, and triceps', 'Chest', 'Beginner', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80'),
('Dip', 'An upper body exercise that targets the triceps, chest, and shoulders', 'Triceps', 'Intermediate', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80'),
('Squat', 'A lower body exercise that works the quadriceps, hamstrings, and glutes', 'Legs', 'Beginner', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80'),
('Muscle-up', 'An advanced exercise that combines a pull-up and a dip', 'Full Body', 'Advanced', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80'),
('Handstand Push-up', 'An advanced exercise that targets the shoulders, triceps, and core', 'Shoulders', 'Advanced', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80'),
('Plank', 'A core exercise that also engages the shoulders, arms, and glutes', 'Core', 'Beginner', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80'),
('L-sit', 'A static hold that works the abs, hip flexors, and quads', 'Core', 'Intermediate', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80'),
('Human Flag', 'An advanced static hold that requires significant upper body and core strength', 'Full Body', 'Advanced', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80'),
('Front Lever', 'An advanced static hold that primarily targets the lats and core', 'Back', 'Advanced', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80');