/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAllData from "../hooks/useAllData";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import useMark from "../hooks/useMark";
const Quiz = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [mark, setMark] = useState(0);
  const [allData, isLoading] = useAllData();
  const [count, setCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);

 
  let questions = allData.questions;
  const navigate = useNavigate();

  
  const handleIncreate = () => {
    if (!selectedId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must select an option!!",
      });
    }
    if (selectedId && count < 11) {
      axios
        .post("https://flow-with-gamification-server.vercel.app/ids-post", {selectedId})
        .then((res) => {
          console.log(res.data);
        });
      setCount((prevCount) => prevCount + 1);
      console.log(count, selectedIds);
      setSelectedId(null);
    }
    console.log("count ", count);
    if (count + 1 === 10) {
      console.log(count, selectedIds);

      
      axios.post("https://flow-with-gamification-server.vercel.app/marks", { mark }).then((res) => {
        console.log(res.data);
      });
     
      Swal.fire({
        title: `Your Score is: ${mark}`,
        text: 'See detail ',
        icon: "seuccess",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Detail",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/detail");
        } else {
          axios.delete("https://flow-with-gamification-server.vercel.app/ids").then((res) => {
            console.log(res.data);
          });
          axios.delete("https://flow-with-gamification-server.vercel.app/delete-marks").then((res) => {
            console.log(res.data);
          });
          navigate("/");
        }
      });
      // if (mark < 5) {
      //   Swal.fire({
      //     icon: "warning",
      //     title: `Your Obatained ${mark}`,
      //     text: "Not so good. Study Hard!!",
      //     showConfirmButton: false,
      //   });
      // } else if (mark < 8) {
      //   Swal.fire({
      //     icon: "success",
      //     title: `Your Obatained ${mark}`,
      //     text: "Good. But should study more..!!",
      //     showConfirmButton: false,
      //   });
      // } else if (mark < 10) {
      //   Swal.fire({
      //     icon: "success",
      //     title: `Your Obatained ${mark}`,
      //     text: "Well done. Carry on.!!",
      //     showConfirmButton: false,
      //   });
      // } else {
      //   Swal.fire({
      //     icon: "success",
      //     title: `Your Obatained ${mark}`,
      //     text: "Excellent , Very Good, Wow..",
      //     showConfirmButton: false,
      //   });
      // }

      setCount(0);
      setMark(0);
    }
    const result = selectedQuestion.options?.find(
      (option) => option.id == selectedId
    );
    // console.log(result)
    if (result?.is_correct) {
      setMark(mark + 1);
    }
  };

  const handleChange = (option) => {
    // console.log(option.id, selectedQuestion)
    setSelectedId(option.id);
  };

  useEffect(() => {
    if (questions && count < 10) {
      setSelectedQuestion(questions[count]);
    }
  }, [count, questions]);

  return (
    <div className="flex min-h-screen justify-center items-center ">
      <Helmet>
        <title>Quiz | Flow with Gamification</title>
      </Helmet>
      {isLoading ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : (
        <div className="bg-white shadow-xl p-2 md:mx-20 md:p-10 w-full rounded-2xl border border-gray-200">
          <h1 className="text-xl md:text-4xl font-bold text-gray-800 mb-6">
            {count + 1}. {selectedQuestion.description}
          </h1>

          <div className="flex flex-wrap justify-between border-2 border-gray-300 p-2 md:p-6 rounded-lg bg-gray-50">
            {selectedQuestion.options?.map((option, index) => (
              <div
                key={index}
                className="flex items-center w-full md:w-1/2 mb-1  md:mb-4"
              >
                <p className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm w-full hover:bg-gray-100 transition ">
                  <input
                    checked={selectedId == option.id}
                    onChange={() => handleChange(option)}
                    type="checkbox"
                    className="checkbox checkbox-primary scale-125"
                  />
                  <span className="text-lg text-gray-700">
                    {option.description}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <button
            className="btn   text-[#EFECEC]  font-semibold md:text-2xl mt-6 shadow-md hover:bg-[#405836] transition duration-300 bgBtn"
            onClick={handleIncreate}
          >
            Next
          </button>

          {/* <p className="text-4xl">{mark}</p> */}
        </div>
      )}
    </div>
  );
};

export default Quiz;
