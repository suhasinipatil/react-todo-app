import React from "react";
import Header from "../components/Header.js";
import TodosLogic from "../components/TodosLogic.js";

const Home = () => {
    return (
        //<div className="wrapper">
          <div className="todos">
            <Header/>
            <TodosLogic/>
          </div>
        //</div>
    );
  };
  export default Home;