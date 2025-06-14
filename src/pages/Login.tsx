
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get user type from URL params or default to customer
  const defaultUserType = new URLSearchParams(location.search).get("type") as "customer" | "seller";
  const [userType, setUserType] = useState<"customer" | "seller">(
    defaultUserType === "seller" ? "seller" : "customer"
  );
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Redirect based on userType in auth context
      navigate(userType === "seller" ? "/seller/dashboard" : "/");
    }
  }, [user, navigate, userType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields");
      }

      const { error } = await signIn(
        formData.email,
        formData.password,
        userType
      );

      if (error) throw error;

      toast.success(`Login successful! Welcome back.`);
      
      // Redirect based on user type
      // Navigate will happen via the useEffect that watches for user changes
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <div className="w-full max-w-md">
        <Tabs
          defaultValue={userType}
          value={userType}
          onValueChange={(value) => setUserType(value as "customer" | "seller")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="seller">Restaurant Partner</TabsTrigger>
          </TabsList>

          {/* Customer Login Form */}
          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Customer Login</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input
                      id="customer-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="customer-password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-brand hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="customer-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button
                    type="submit"
                    className="w-full bg-brand hover:bg-brand-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      to="/signup?type=customer"
                      className="text-brand hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Seller Login Form */}
          <TabsContent value="seller">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Restaurant Partner Login</CardTitle>
                <CardDescription>
                  Access your restaurant dashboard to manage orders and menu
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seller-email">Email</Label>
                    <Input
                      id="seller-email"
                      name="email"
                      type="email"
                      placeholder="restaurant@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="seller-password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-brand hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="seller-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button
                    type="submit"
                    className="w-full bg-brand hover:bg-brand-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Want to register your restaurant?{" "}
                    <Link
                      to="/signup?type=seller"
                      className="text-brand hover:underline"
                    >
                      Register here
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
