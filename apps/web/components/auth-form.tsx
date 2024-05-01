"use client";

import Link from "next/link";

import { authorizeUser, createUser } from "@/lib/actions";
import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Icons } from "./icons";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    setLoading(true);
    e.preventDefault();

    if (fields.password !== fields.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await createUser(fields);
      setLoading(false);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      if (
        error.message.includes(
          "Unique constraint failed on the fields: (`email`)",
        )
      ) {
        setError("Account with this email already exists!");
      } else {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "mx-auto max-w-sm shadow-md dark:border-[1px]",
        "light:border-none",
      )}
    >
      <CardHeader>
        <CardTitle className="text-3xl text-center font-bold">
          Sign Up
        </CardTitle>
        <CardDescription className="text-balance text-muted-foreground text-center text-base">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="firstName"
                  placeholder="Max"
                  autoComplete="first-name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  autoComplete="last-name"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Robinson"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={handleChange}
                name="email"
                autoComplete="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                autoComplete="new-password"
                type="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                className={cn({
                  "border-red-600":
                    error && fields.password !== fields.confirmPassword,
                })}
                type="password"
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Icons.spinner className="w-6 h-6 animate-spin" />
                  <p>Creating Account...</p>
                </div>
              ) : (
                <>Sign Up</>
              )}
            </Button>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    setLoading(true);
    e.preventDefault();

    try {
      await authorizeUser(fields.email, fields.password);
      setLoading(false);
      toast.success("Logged in successfully");
      router.push("/platform");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Card
      className={cn(
        "mx-auto max-w-sm shadow-md dark:border-[1px]",
        "light:border-none",
      )}
    >
      <CardHeader>
        <CardTitle className="text-3xl text-center font-bold">Login</CardTitle>
        <CardDescription className="text-balance text-muted-foreground text-center text-base">
          Welcome back! Enter your credentials to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                name="password"
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Icons.spinner className="w-6 h-6 animate-spin" />
                  <p>Logging In...</p>
                </div>
              ) : (
                <>Login</>
              )}
            </Button>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
          </div>
          <div className="mt-2 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
