import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrivateRoute from "../context/PrivateRoute";
import listtutorials from "../styles/listtutorials.module.css";

const ListTutorials = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://tutorials-backend-kappa.vercel.app/courses/all",
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        const coursesData = await res.json();
        setTutorials(coursesData.courseExists);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://tutorials-backend-kappa.vercel.app/courses/deleteCourse/${id}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const formatRes = await res.json();

      if (!formatRes?.isSuccess) {
        throw new Error(formatRes?.message);
      }
      const filterData = tutorials?.filter((item) => item._id !== id);
      setTutorials(filterData);
    } catch (err) {
      alert(err);
    }
  };

  console.log(tutorials);

  return (
    <PrivateRoute>
      <>
        <div className={listtutorials.cardContainer}>
          {tutorials.map((item, index) => (
            <div className={listtutorials.card} key={index}>
              <div className="header" style={{ textAlign: "center" }}>
                <h2>{item.name}</h2>
              </div>
              <div className="content" style={{ textAlign: "center" }}>
                <h3>Price: {item.price}</h3>
                <p>Duration: {item.duration}</p>
                <p
                  style={{
                    objectFit: "contain",
                    textAlign: "justify",
                    height: "10rem",
                    overflow: "scroll",
                  }}
                >
                  {item.description}
                </p>
              </div>
              <div className="footer">
                <Link to={`/editCourse/${item._id}`}>
                  <button className={listtutorials.btn}>Edit</button>
                </Link>
                <Link onClick={() => handleDelete(item?._id)}>
                  <button className={listtutorials.btn}>Delete</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </>
    </PrivateRoute>
  );
};

export default ListTutorials;
