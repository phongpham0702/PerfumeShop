import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMail, AiTwotoneLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/sign-in`,
        {
          Email: email,
          Password: password,
        },
        { withCredentials: true },
      )
      .then((res) => res.data)
      .then((data) => {
        if (data.status === 200) {
          onLoginSuccess();
          setEmail("");
          setPassword("");
          localStorage.setItem("accessToken", data.metadata.AT);
          localStorage.setItem("cartCount", data.metadata.userInfo.cartCount);
          localStorage.setItem(
            "wishlistCount",
            data.metadata.userInfo.wishlistCount,
          );
          window.dispatchEvent(new Event("storage"));
          setIsLoading(false);
          toast.success("Login successful");

          navigate("/");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid credentials");
      });
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex w-[96%] flex-col items-center gap-6 rounded-sm p-2 font-space shadow-2xl sm:w-[600px] sm:p-4"
    >
      <h1 className="mb-0 mt-4 text-3xl font-bold sm:text-4xl">Hello Again!</h1>
      <p className="text-center text-[#767373] sm:text-lg">
        Enter your credentials to access your account.
      </p>
      <div className="mx-auto flex w-[98%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-base">
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

      <div className="mx-auto flex w-[98%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-base">
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
      <div className="flex w-[98%] justify-between sm:w-[80%]">
        <div className="flex gap-1 sm:gap-2">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        {/* <span>|</span> */}
        <Link className="text-[#f50963]" to="/forgot">
          Forgot password
        </Link>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className=" w-[98%] bg-[#f50963] p-3 text-base font-bold text-white transition-all duration-300 hover:bg-[#181717] sm:w-[80%] sm:text-lg"
      >
        Sign In
      </button>
      <div className="mb-8 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <p>Don't have an account?</p>
        <Link to="/signup" className="font-medium text-[#f50963]">
          Register Now
        </Link>
      </div>
    </form>
  );
};

export default Login;
