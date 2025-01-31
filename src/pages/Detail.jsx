import { Link, useLoaderData } from "react-router-dom";
import useAllData from "../hooks/useAllData";
import { FaCheck } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import useMark from "../hooks/useMark";

const Detail = () => {
  const data = useLoaderData();
  console.log(data);
  const [allData, isLoading] = useAllData();
  let questions = allData.questions;
  console.log(questions);
  const [mark] = useMark();
  console.log(mark);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-xl md:text-4xl font-bold text-center py-4">
          You Obtained : {mark[0].mark}
        </p>
        <Link
          to="/quiz"
          className="btn btn-outline border-2 border-[#000]  text-[#000] btn-[#0C2D57] font-semibold md:text-2xl"
        >
          Start Game
        </Link>
      </div>
      {questions?.map((question, i) => (
        <div
          key={i}
          className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-sm"
        >
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            {i + 1}. {question.description}
          </h1>

          <p className="text-gray-700 font-medium mt-2 flex items-center gap-2">
            <span className="text-blue-600 font-semibold">Your Ans:</span>{" "}
            {question.options?.map((option) =>
              option.id === data[i].selectedId ? (
                <span
                  key={option.id}
                  className="text-gray-800 flex items-center gap-2"
                >
                  {option.description}
                  <p className="flex ">
                    {option.is_correct ? <FaCheck /> : <ImCross />}
                  </p>
                </span>
              ) : null
            )}
          </p>

          <p className="text-gray-700 font-medium mt-1">
            <span className="text-green-600 font-semibold">Correct Ans:</span>{" "}
            {question.options?.map((option) =>
              option.is_correct ? (
                <span key={option.id} className="text-gray-800">
                  {option.description}
                </span>
              ) : null
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Detail;
