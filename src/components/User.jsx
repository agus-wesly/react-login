import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const User = () => {
  const axiosPrivate = useAxiosPrivate();
  const effectRun = useRef(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/contact", {
          signal: controller.signal,
        });
        mounted && setUser(response.data);
      } catch (err) {
        navigate("/login", { state: { from: location }, replace: true });
        console.error(err);
      }
    };

    if (effectRun.current) {
      getUser();
    }

    return () => {
      mounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, []);

  return (
    <article>
      <h2>Contacts List</h2>
      {user?.length ? (
        <ul>
          {user?.map((usr, i) => (
            <li key={i}>{usr.firstname}</li>
          ))}
        </ul>
      ) : (
        <>
          <p>No user to display</p>
        </>
      )}
    </article>
  );
};

export default User;
