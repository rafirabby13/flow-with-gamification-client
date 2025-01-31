import axios from "axios";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";


const App = () => {

  const location = useLocation()
  console.log(location)
  const home = location.pathname == '/'
  useEffect(()=>{
    axios.delete("http://localhost:5000/ids").then((res) => {
      console.log(res.data);
    });
    axios.delete("http://localhost:5000/marks").then((res) => {
      console.log(res.data);
    });
  },[home])



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
