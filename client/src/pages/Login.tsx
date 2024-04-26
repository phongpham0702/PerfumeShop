import { useState } from "react";
import { AiOutlineMail, AiTwotoneLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform login logic (e.g., API call)
    fetch(`${import.meta.env.VITE_SERVER_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, Password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          //   onLoginSuccess(data.token); // Call callback with token if login is successful
          setEmail("");
          setPassword("");

          const expires = new Date();
          expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
          document.cookie = `accessToken=${
            data.metadata.token
          }; expires=${expires.toUTCString()}; path="/"`;

          navigate("/");
        } else {
          alert(data.message); // Handle login errors (optional)
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex w-[600px] flex-col items-center gap-6 rounded-sm p-4 font-space shadow-2xl"
    >
      <h1 className="mb-0 mt-4 text-4xl font-bold">Hello Again!</h1>
      <p className="text-lg text-[#767373]">
        Enter your credentials to acces your account.
      </p>
      <div className="mx-auto flex w-[80%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
        <AiOutlineMail />
        <input
          className="w-full p-2 outline-none"
          type="email"
          placeholder="Enter your email"
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mx-auto flex w-[80%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
        <AiTwotoneLock />
        <input
          className="w-full p-2 outline-none"
          type="password"
          placeholder="Password"
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex w-[80%] justify-between">
        <div className="flex gap-2">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <Link to="/forgot">Forgot password</Link>
      </div>
      <button
        type="submit"
        className=" w-[80%] bg-[#f50963] p-3 text-lg font-bold text-white transition-all duration-300 hover:bg-[#181717]"
      >
        Sign In
      </button>
      <div className="mb-8 flex justify-center gap-2">
        <p>Don't have an account?</p>
        <Link to="/signup" className="font-medium text-[#f50963]">
          Register Now
        </Link>
      </div>
    </form>
  );
};

export default Login;
