import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
  return (
    <main className="h-screen overflow-hidden">
      <div className="flex justify-between h-screen">
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-sm px-4">
            <h2 className="text-2xl md:text-4xl font-passage font-semibold mb-2 text-center">
              Welcome Back!
            </h2>
            <p className="text-center md:text-xl font-thin">
              Log in to your getmylinks
            </p>

            <form className="flex flex-col gap-y-4 mt-12">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Johndoe@myself.co"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" />
              </div>
              <Button type="submit">Log in</Button>
            </form>

            <p className="capitalize text-sm mt-6">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-700 hover:opacity-90">
                Create one
              </a>
            </p>

            <div className="mt-3 flex items-start">
              <Checkbox id="update" defaultChecked className="mr-2 mt-1" />
              <Label
                htmlFor="update"
                className="capitalize leading-5 font-thin peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By clicking <b>Create Account</b>, you agree to GetMyLink's
                <span className="underline"> Terms & Conditions</span> and to
                accept offers, news, and updates.
              </Label>
            </div>

            <div className="mt-4 text-blue-700 text-sm flex justify-center items-center space-x-4">
              <a href="/forgot-password" className="hover:opacity-90">Forgot Password?</a>
              <Separator orientation="vertical" />
              <a href="/forgot-username" className="hover:opacity-90">Forgot Username?</a>
            </div>
          </div>
        </div>

        <div className="hidden md:block flex-1 relative">
          <a
            href="/"
            className="font-Gloock text-xl md:text-4xl absolute top-3 right-6 text-white shadow-black cursor-pointer z-10"
          >
            getmylinks
          </a>
          <img
            src="../images/spiral.webp"
            alt="seashore-img"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;