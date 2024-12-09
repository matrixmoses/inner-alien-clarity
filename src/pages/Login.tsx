import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate("/dashboard");
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      } else if (event === "PASSWORD_RECOVERY") {
        toast({
          title: "Password Recovery",
          description: "Check your email for password reset instructions.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold text-center mb-6">Welcome Back</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Sign in to your account or create a new one to get started
          </p>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#9C8ADE',
                    brandAccent: '#7A71C3',
                  },
                },
              },
              className: {
                container: 'flex flex-col gap-4',
                button: 'rounded-md px-4 py-2',
                input: 'rounded-md px-4 py-2 border',
              },
            }}
            providers={[]}
            theme="light"
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  button_label: 'Sign in',
                  loading_button_label: 'Signing in...',
                },
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Create a password',
                  button_label: 'Create account',
                  loading_button_label: 'Creating account...',
                },
              },
            }}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default Login;