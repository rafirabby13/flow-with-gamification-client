import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const App = () => {




  return (
    <div className="flex justify-center items-center h-screen home">
      <Helmet>
        <title>Home | Flow with Gamification</title>
      </Helmet>
      <div className="text-center">
        <h1>
          <Fade
            cascade
            damping={1e-1}
            className="text-2xl md:text-7xl font-bold mb-4 text-[#FFB5DA]"
          >
            Welcome to Quiz Game
          </Fade>
        </h1>
        <Link to='/quiz' className="btn btn-outline border-2 border-[#FFB5DA]  text-[#FFB5DA] btn-[#0C2D57] font-semibold md:text-2xl">
          Start Game
        </Link>
      </div>
    </div>
  );
};

export default App;
