import { useEffect, useState } from "react";
import useAllData from "../hooks/useAllData";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Quiz = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [mark, setMark] = useState(0);
  const [allData, isLoading] = useAllData();
  const [count, setCount] = useState(0);
  // console.log(allData.questions);
  // let count = 3
  let questions = allData.questions;
const navigate = useNavigate()
  useEffect(() => {
    if (questions) {
      // console.log(selectedQuestion);

      setSelectedQuestion(questions[count]);
    }
  }, [count, questions, selectedQuestion]);

  const handleIncreate = () => {
    if (selectedId && count < 9) {
      setCount(count + 1);
      setSelectedId(null);
    }
    if (count == 9) {
        if (mark < 5) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `Your Obatained ${mark}`,
                text: "Not so good. Study Hard!!",
                showConfirmButton: false,
                timer: 1500
              });
        }
        else if (mark < 8) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Your Obatained ${mark}`,
                text: "Good. But should study more..!!",
                showConfirmButton: false,
                timer: 1500
              });
        }
        else if (mark < 10) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Your Obatained ${mark}`,
                text: "Well done. Carry on.!!",
                showConfirmButton: false,
                timer: 1500
              });
        }
        else{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Your Obatained ${mark}`,
                text: "Excellent , Very Good, Wow..",
                showConfirmButton: false,
                timer: 1500
              });
        }

        
      setCount(0);
      setMark(0);
      navigate('/')
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
  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="bg-white shadow-xl mx-20 p-10 w-full rounded-2xl border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {count + 1}. {selectedQuestion.description}
        </h1>

        <div className="flex flex-wrap justify-between border-2 border-gray-300 p-6 rounded-lg bg-gray-50">
          {selectedQuestion.options?.map((option, index) => (
            <ol
              key={index}
              className="flex items-center w-full md:w-1/2 space-x-3 mb-4"
            >
              <li className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm w-full hover:bg-gray-100 transition " >
                <input
                  checked={selectedId == option.id}
                  onChange={() => handleChange(option)}
                  type="checkbox"
                  className="checkbox checkbox-primary scale-125"
                />
                <span className="text-lg text-gray-700">
                  {option.description}
                </span>
              </li>
            </ol>
          ))}
        </div>

        <button
          className="btn bg-[#526E48] text-[#F5F5F5] text-2xl px-16 rounded-lg mt-6 shadow-md hover:bg-[#405836] transition duration-300"
          onClick={handleIncreate}
        >
          Next
        </button>

        {/* <p className="text-4xl">{mark}</p> */}
      </div>
    </div>
  );
};

export default Quiz;
