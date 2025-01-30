import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-[#526E48]">Welcome to Quiz Game</h1>
        <Link to="/quiz" className="btn bg-[#526E48] text-[#F5F5F5] text-2xl">
          Start Game
        </Link>
      </div>
    </div>
  );
};

export default App;
