import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import {Logo} from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo  />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            excepturi! Voluptates nostrum, ad nihil qui quisquam hic, in
            expedita culpa ipsa velit amet maiores tempore, obcaecati
            recusandae. Autem, hic delectus, similique mollitia sunt expedita
            exercitationem voluptate harum eum nulla rerum officiis itaque quia
            ratione molestiae!
          </p>
          <Link className="register-link btn" to="/register">
            Register
          </Link>
          <Link className=" btn" to="/login">
            Login/ Demo User
          </Link>
        </div>
        <img src={main} alt="main image" className="img main-img"  />
      </div>
    </Wrapper>
  );
};

export default Landing;
