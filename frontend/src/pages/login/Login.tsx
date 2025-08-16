import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { homePage } from "../../constants";
import Supabase from "../../lib/supabase";
import type React from "react";
import { useEffect } from "react";

interface LoginT {
  redirect?: boolean;
}

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const Login: React.FC<LoginT> = ({ redirect = true }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!redirect) {
      console.log("Redirection désactivée");
    }
  }, [redirect]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Try to sign in user
    const { error } = await Supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    // If user does not exist - create a new user
    if (error) {
      const { error: signUpError } = await Supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (signUpError) {
        console.error("Error creating new user:", signUpError.message);
        return;
      }
    }
    navigate(homePage);
  };
  return (
    <div className=" w-screen h-screen bg-[#222936] text-white ">
      <div className=" flex justify-center items-center h-full ">
        <form
          className="w-1/3 p-6 border-3 md:p-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-6">
            <Label htmlFor="email">Votre email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@exemple.com"
              autoComplete="email"
              required
              {...form.register("email")}
            />
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                {...form.register("password")}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#FAEAE1] text-[#222936] hover:bg-[#E83C75] hover:text-white cursor-pointer transition-colors duration-300 text-lg"
            >
              Se connecter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
