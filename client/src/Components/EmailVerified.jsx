import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const EmailVerified = () => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const { backendURL } =
      useContext(AppContext);

  // extract token from query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const verfyEmail = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/verify-email/${token}`);
      if (data.success) setVerified(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(token) verfyEmail();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [token]);

  if (loading) return null;

  return ( 
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
        {verified ? (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-700 mb-4">
              You can now log in to your account.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-700 mb-4">
              The verification link is invalid or has expired. Please log in
              again to receive a new verification email.
            </p>
          </>
        )}

        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default EmailVerified;
