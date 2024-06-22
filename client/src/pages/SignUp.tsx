import { useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
  AiTwotoneLock,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation (optional, can use a validation library)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Perform signup logic (e.g., API call)
    fetch(`${import.meta.env.VITE_SERVER_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: email,
        Password: password,
        Fullname: fullName,
        DoB: dob,
        Phonenumber: phoneNumber,
        rePassword: confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 201) {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setDob("");
          setConfirmPassword("");
          setPhoneNumber("");
          navigate("/login");
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex w-[96%] flex-col items-center gap-6 rounded-sm p-4 font-space shadow-2xl sm:w-[600px]"
    >
      <h1 className="my-4 mb-0 text-3xl font-bold sm:text-4xl">
        Register Now!
      </h1>
      <p className="text-center text-[#767373] sm:text-lg">
        You can signup with you social account below
      </p>
      <div className="mx-auto flex w-[98%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-lg">
        <AiOutlineUser />
        <input
          className="w-full p-2 outline-none"
          type="text"
          name="Fullname"
          value={fullName}
          placeholder="Enter your name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="mx-auto flex w-[98%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-lg">
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
      <div className="gap2 mx-auto flex w-[98%] items-center rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-lg">
        <AiOutlinePhone />
        <input
          className="w-full p-2 outline-none"
          placeholder="Enter your phone number"
          name="Phonenumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="mx-auto flex w-[98%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-lg">
        <AiOutlineCalendar />
        <input
          className="w-full p-2 outline-none"
          placeholder="Enter your day of birth"
          name="DoB"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </div>

      <div className="mx-auto flex w-[98%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-lg">
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

      <div className="gap2 mx-auto flex w-[98%] items-center rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-lg">
        <AiTwotoneLock />
        <input
          className="w-full p-2 outline-none"
          type="password"
          name="rePassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className=" mt-2 w-[98%] bg-[#f50963] p-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#181717] sm:w-[80%] sm:text-lg"
      >
        Sign Up
      </button>
      <div className="mb-8 flex justify-center gap-2">
        <p>Already have an account?</p>
        <Link to="/login" className="font-medium text-[#f50963]">
          Log In
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
