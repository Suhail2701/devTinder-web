import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/user";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true },
      );
      console.log("res.data:", res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleRegister = async ()=>{
    const newUser =await axios.post(`${BASE_URL}/signup`, {
      firstName,
      lastName,
      about,
      gender,
      photoUrl,
      emailId: email,
      password
     }, {withCredentials: true
    });
    dispatch(addUser(newUser.data.data));
    navigate("/profile");
  }

  return (
    <div className="flex justify-center align-items-center mt-10 ">
      <fieldset className=" flex flex-col justify-between fieldset bg-base-200 border-base-300 rounded-box w-[400px]  border px-6 py-6 border-yellow gap-3">
        <legend className="fieldset-legend text-xl">
          {isLogin ? "Login" : "Register"}
        </legend>
        {!isLogin && (
          <>
            <label className="label text-xl">FirstName</label>
            <input
              type="text"
              className="input text-lg outline-0 w-full "
              placeholder="FirstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />

            <label className="label text-xl">LastName</label>
            <input
              type="text"
              className="input text-lg outline-0 w-full "
              placeholder="LastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            <label className="label text-xl">About</label>
            <input
              type="text"
              className="input text-lg outline-0 w-full "
              placeholder="About"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            />

            <label className="label text-xl">Gender</label>
            <input
              type="text"
              className="input text-lg outline-0 w-full "
              placeholder="Gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />

            <label className="label text-xl">Photo URL</label>
            <input
              type="text"
              className="input text-lg outline-0 w-full "
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
              }}
            />
          </>
        )}

        <label className="label text-xl">Email</label>
        <input
          type="email"
          className="input text-lg outline-0 w-full "
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label className="label text-xl">Password</label>
        <input
          type="password"
          className="input text-lg outline-0 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className=" btn btn-neutral mt-4 mb-10 text-xl w-1/3 mx-auto"
          onClick={isLogin ? handleLogin : handleRegister}
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="text-lg hover:underline cursor-pointer"
          onClick={()=>setIsLogin((pre)=>!pre)}
        >{isLogin?"New user? Sign Up":"If your account already exists? Login"}</p>
      </fieldset>
      
    </div>
  );
};

export default Login;
