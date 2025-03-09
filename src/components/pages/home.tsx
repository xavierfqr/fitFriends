import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dumbbell,
  Settings,
  User,
  Users,
  BarChart,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { motion } from "framer-motion";

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Dumbbell className="h-10 w-10 text-primary" />,
      title: "Workout Builder",
      description:
        "Create custom street workout routines with our drag-and-drop interface",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Feed",
      description:
        "Share your workouts and discover new routines from the community",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Progress Tracker",
      description:
        "Track your fitness journey with visual charts and photo comparisons",
    },
    {
      icon: <Share2 className="h-10 w-10 text-primary" />,
      title: "Mobile-First Design",
      description: "Access your workouts anywhere, even at outdoor locations",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <Link to="/" className="font-bold text-xl">
              StreetFit
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                          alt={user.email || ""}
                        />
                        <AvatarFallback>
                          {user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-block">
                        {user.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => signOut()}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Build Your <span className="text-primary">Street Workout</span>{" "}
                Routine
              </h1>

              <p className="text-xl text-muted-foreground">
                Create, share, and track your street workout routines with our
                community of fitness enthusiasts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                alt="Street Workout"
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, share, and track your street
                workout routines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80"
                  alt="Community"
                  className="rounded-lg shadow-xl w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 space-y-6"
              >
                <h2 className="text-3xl font-bold">Join Our Community</h2>
                <p className="text-muted-foreground">
                  Connect with like-minded fitness enthusiasts, share your
                  workout routines, and get inspired by others.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Share your workout routines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Discover new exercises and techniques</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Track your progress and celebrate achievements</span>
                  </li>
                </ul>
                <Link to="/signup">
                  <Button>Join Now</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Create your account today and start building your street workout
              routines.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">StreetFit</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} StreetFit. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
