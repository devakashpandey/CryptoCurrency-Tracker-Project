import React from "react";
import "./Footer.css";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="info">
          Copyright © 2023 - All Rights Reserved
          <center>
            <a href="https://devakashpandey.netlify.app" target="_blank">
              <b style={{ color: "white" }}>Akash Pandey</b>
            </a>
          </center>
          <div className="icon">
            <a
              href="https://www.linkedin.com/in/devakashpandey/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
            &nbsp;
            <a href="https://github.com/devakashpandey" target="_blank">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
