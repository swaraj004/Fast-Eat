
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get user type from URL params or default to customer
  const defaultUserType = new URLSearchParams(location.search).get("type") as "customer" | "seller";
  const [userType, setUserType] = useState<"customer" | "seller">(
    defaultUserType === "seller" ? "seller" : "customer"
  );
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      // Form validation
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields");
      }
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const { error } = await signUp(
        formData.email,
        formData.password,
        userType
      );

      if (error) throw error;

      toast.success(`Signup successful! Welcome to FastEat.`);
      
      // Redirect based on user type
      if (userType === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
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

          {/* Customer Signup Form */}
          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create Customer Account</CardTitle>
                <CardDescription>
                  Sign up to order from your favorite restaurants
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
                    <Label htmlFor="customer-password">Password</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="customer-confirm-password">Confirm Password</Label>
                    <Input
                      id="customer-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
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
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-brand hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Seller Signup Form */}
          <TabsContent value="seller">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Register Restaurant</CardTitle>
                <CardDescription>
                  Partner with FastEat to reach more customers
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seller-email">Business Email</Label>
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
                    <Label htmlFor="seller-password">Password</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="seller-confirm-password">Confirm Password</Label>
                    <Input
                      id="seller-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
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
                    {isLoading ? "Creating account..." : "Register restaurant"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-brand hover:underline"
                    >
                      Login
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
