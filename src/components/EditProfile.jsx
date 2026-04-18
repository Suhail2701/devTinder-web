import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../store/slices/user";
import  axios from "axios";
import { BASE_URL } from "../constants";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  console.log("user in edit profile: ", user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");

  const handleEdit = async () => {
   try{
     const res = await axios.patch(`${BASE_URL}/profile/edit`,{
         firstName,
        lastName,
        about,
        gender,
        photoUrl,
    }, {withCredentials:true});
    
    
    dispatch(
      addUser(res.data.data),
    );
   }
   catch(err)
   {
    console.error("Error updating profile: ", err.message);
    setError("Failed to update profile. Please try again.");
   }
  };

  useEffect(() => {
  if (user) {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setAbout(user.about || "");
    setGender(user.gender || "");
    setPhotoUrl(user.photoUrl || "");
  }
}, [user]);



  return (
    <>
      {user && (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 fle flex-col gap-3 w-[400px]">
          <legend className="fieldset-legend text-xl">Edit Profile</legend>

          <label className="label text-xl">First Name</label>
          <input
            type="text"
            className="input text-xl"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label text-xl">Last Name</label>
          <input
            type="text"
            className="input text-xl"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label text-xl">About</label>
          <textarea
            className="textarea text-xl"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <label className="label text-xl">Gender</label>
          <select
            className="select text-xl"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="label text-xl">Photo URL</label>
          <input
            type="text"
            className="input text-xl"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <button className="btn btn-neutral mt-4  text-xl"
            onClick={handleEdit}
          >Submit</button>
        </fieldset>
      )}
    </>
  );
};

export default EditProfile;
