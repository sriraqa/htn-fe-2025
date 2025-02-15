"use client";

import Footer from "@/components/Footer";
import { UserContext } from "@/contexts/userProvider";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { authenticated, setAuthenticated } = useContext(UserContext);
  const router = useRouter();

  const handleAuth = () => {
    if (!authenticated) {
      // Validate input
      if (username === "") {
        setUsernameError("You must enter an username");
        return;
      } else if (username.includes(" ") || username.includes("\n")) {
        setUsernameError("Please do not include whitespace characters");
        return;
      }

      if (password === "") {
        setPasswordError("You must enter a password");
        return;
      } else if (password.length < 6) {
        setPasswordError("Your password must be at least 6 characters");
        return;
      }

      setPasswordError("");
      setUsernameError("");
      setPassword("");
      setUsername("");

      if (
        username.trim() === process.env.NEXT_PUBLIC_DEFAULT_USERNAME! &&
        password === process.env.NEXT_PUBLIC_DEFAULT_PASSWORD!
      ) {
        setAuthenticated(true);
        router.push("/");
      } else {
        setUsernameError("Invalid credentials");
      }
    } else {
      setAuthenticated(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-104px)] size-full">
      <div className="flex flex-col gap-6 size-full justify-center items-center pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-center">Log In</h1>
          <p className="text-base text-black/50 text-center">
            Are you participating in the hackathon? Sign in to see more events!
          </p>
        </div>
        <div className="relative flex flex-col gap-10 items-center bg-darkOffWhite rounded-2xl w-[95%] max-w-[360px] sm:w-[360px] p-6">
          {!authenticated ? (
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="username"
                  className="text-hgGray flex flex-row items-end gap-1"
                >
                  <p>Username</p>
                  {usernameError !== "" && (
                    <p className="text-red-500 text-sm">*{usernameError}</p>
                  )}
                </label>
                <input
                  id="username"
                  name="username"
                  className="rounded-md bg-hgGray/30 opacity-70 p-2"
                  type="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="password"
                  className="text-hgGray flex flex-row items-center gap-1"
                >
                  <p>Password</p>
                  {passwordError !== "" && (
                    <p className="text-red-500 text-sm">*{passwordError}</p>
                  )}
                </label>
                <input
                  id="password"
                  name="password"
                  className="rounded-md bg-hgGray/30 opacity-70 p-2"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-1 w-full pt-4">
              <Check />
              <h2 className="font-semibold text-lg">
                You are already signed in
              </h2>
            </div>
          )}

          <button
            className="py-2 px-6 w-full text-base text-center bg-offBlack text-white rounded-full active:scale-95 transition hover:opacity-70"
            onClick={handleAuth}
          >
            {!authenticated ? "Log In" : "Sign Out"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
