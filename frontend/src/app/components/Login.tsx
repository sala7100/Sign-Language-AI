
import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Brain, Mail, Lock, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import toast from "react-hot-toast";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {

      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        toast.success("Login Successful ✅");
        onLogin();
      } else {
        // toast هيظهر حتى لو فيه خطأ
        const msg = data.message || "Login failed: Wrong credentials";
        toast.error(msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error, try again later");
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("signup-email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("signup-password") as HTMLInputElement).value;

    try {

      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        // لو السيرفر رجع error مثل "Email already exists"
        toast.error(data.message || `Signup failed: ${res.status}`);
      } else if (data.user) {
        toast.success("Account created successfully 🎉");
        onLogin();
      } else {
        toast.error("Signup failed: Unknown error");
      }

    } catch (error) {
      console.error(error);
      toast.error("Server error, try again later");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Brain className="size-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">SignAI</h1>
          <p className="text-gray-600">AI-Powered Sign Language Learning</p>

        </div>

        <Card className="p-8">

          <Tabs defaultValue="login">

            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">

              <form onSubmit={handleLogin} className="space-y-4">

                <div className="space-y-2">

                  <Label>Email</Label>

                  <div className="relative">

                    <Mail className="absolute left-3 top-3 size-4 text-gray-400" />

                    <Input
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      className="pl-10"
                      required
                    />

                  </div>

                </div>

                <div className="space-y-2">

                  <Label>Password</Label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-3 size-4 text-gray-400" />

                    <Input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />

                  </div>

                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

              </form>

            </TabsContent>

            <TabsContent value="signup">

              <form onSubmit={handleSignup} className="space-y-4">

                <div className="space-y-2">

                  <Label>Full Name</Label>

                  <div className="relative">

                    <User className="absolute left-3 top-3 size-4 text-gray-400" />

                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="pl-10"
                      required
                    />

                  </div>

                </div>

                <div className="space-y-2">

                  <Label>Email</Label>

                  <div className="relative">

                    <Mail className="absolute left-3 top-3 size-4 text-gray-400" />

                    <Input
                      name="signup-email"
                      type="email"
                      placeholder="example@email.com"
                      className="pl-10"
                      required
                    />

                  </div>

                </div>

                <div className="space-y-2">

                  <Label>Password</Label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-3 size-4 text-gray-400" />

                    <Input
                      name="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      required
                      minLength={6}
                    />

                  </div>

                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

              </form>

            </TabsContent>

          </Tabs>

        </Card>

      </div>

    </div>
  );
}