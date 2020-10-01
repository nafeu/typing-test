import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="page-footer">
      <a href="https://github.com/nafeu/typing-test">
        <FontAwesomeIcon icon={faGithub} />
      </a>{" "}
      / Made with <FontAwesomeIcon icon={faHeart} /> by{" "}
      <a href="http://nafeu.com">Nafeu Nasir.</a>
    </div>
  );
};

export default Footer;
