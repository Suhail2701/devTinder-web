import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { removeSelectedRequest } from "../store/slices/requestSlice";


const RequestUser = ({ req }) => {
  const { firstName, lastName, about, photoUrl } = req.fromUser;
  const { status, _id } = req;
  const dispatch = useDispatch();
  const handleRejectOrAccept = async (reqStatus, reqUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${reqStatus}/${reqUserId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeSelectedRequest(reqUserId));
    } catch (err) {
      console.error("Error ignoring request:", err);
    }
  };
  return (
    <div className="flex justify-between items-center gap-2 w-[550px] mx-auto bg-base-300 shadow-sm p-4 m-3 rounded-lg">
      <div className="w-4/12 rounded-full overflow-hidden">
        <img src={photoUrl} alt="request user" />
      </div>
      <div className="w-6/12 text-center">
        <p className="text-2xl">
          {firstName} {lastName}
        </p>
        <p>{about}</p>
      </div>
      <div className="card-actions justify-center w-8/12">
        <button
          className="btn btn-primary"
          onClick={() => handleRejectOrAccept("rejected", _id)}
        >
          Reject
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleRejectOrAccept("accepted", _id)}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RequestUser;
