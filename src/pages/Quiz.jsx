import { useEffect, useState } from "react";
import useAllData from "../hooks/useAllData";
const Quiz = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [mark, setMark] = useState(0);
  const [allData, isLoading] = useAllData();
  const [count, setCount] = useState(0);
  // console.log(allData.questions);
  // let count = 3
  let questions = allData.questions;

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
  return (
    <div className="flex h-screen justify-center items-center ">
      <div className=" bg-base-100  shadow-xl mx-20 p-10 w-full">
        <h1 className="text-4xl">
          {count + 1}.{selectedQuestion.description}
        </h1>
        <div className="flex flex-wrap justify-between space-y-8 border-2 items-center">
          {selectedQuestion.options?.map((option, index) => (
            <ol key={index} className="flex items-center ">
              <li className="flex items-center gap-3 ">
                <input
                  checked={selectedId == option.id}
                  onChange={() => handleChange(option)}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                {option.description}
              </li>
            </ol>
          ))}
        </div>
        <button
          className="btn bg-[#526E48] text-[#F5F5F5] text-2xl"
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
