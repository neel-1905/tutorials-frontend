import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import PrivateRoute from "../context/PrivateRoute";
import addtutorials from "../styles/addtutorials.module.css";

const AddTutorials = () => {
  const [tutorials, setTutorials] = useState(null);
  const navigate = useNavigate();
  // const context = useContext(AuthContext);

  const handleChange = (event) => {
    setTutorials({ ...tutorials, [event.target.name]: event.target.value });
    console.log(tutorials);
  };

  const handleAddTutorial = async () => {
    try {
      const savedCourse = await fetch(
        "https://tutorials-backend-kappa.vercel.app/courses/addCourse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: tutorials?.name,
            price: tutorials?.price,
            duration: tutorials?.duration,
            description: tutorials?.description,
          }),
        }
      );
      const coursesDataResponse = await savedCourse?.json();
      if (!coursesDataResponse?.isSuccess) {
        throw new Error(coursesDataResponse?.message);
      }
      alert(coursesDataResponse?.message);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <PrivateRoute>
      <div className={addtutorials.main}>
        <form
          className={addtutorials.addform}
          onSubmit={(e) => {
            e.preventDefault();

            if (
              !tutorials?.name ||
              !tutorials?.price ||
              !tutorials?.duration ||
              !tutorials?.description
            ) {
              alert("Please fill all the details");
            } else {
              handleAddTutorial();
            }
          }}
        >
          <h2 style={{ textAlign: "center" }}>Add a Course</h2>
          <input
            className={addtutorials.addinput}
            type="text"
            name="name"
            placeholder="Course Name"
            onChange={handleChange}
          />
          <input
            className={addtutorials.addinput}
            type="text"
            name="price"
            placeholder="Course Price"
            onChange={handleChange}
          />
          <input
            className={addtutorials.addinput}
            type="text"
            name="duration"
            placeholder="Course Duration"
            onChange={handleChange}
          />
          <textarea
            className={addtutorials.addtextarea}
            onChange={handleChange}
            name="description"
            id=""
            cols="30"
            rows="5"
            placeholder="Course Description"
          />
          <button className={addtutorials.btn}>Add Course</button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default AddTutorials;
