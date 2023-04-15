import React from "react";
import Header from "../components/Header.js";
import TodosLogic from "../components/TodosLogic.js";

const Home = () => {
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="todos">
            <Header/>
            <TodosLogic/>
          </div>
        </div>
      </React.Fragment>
    );
  };
  export default Home;