import React from "react";
import githubIcon from "../assets/images/github-120.png";

const Header = ({ url = "https://github.com/BAI-Bonjwa/ctrlcv" }) => (
  <header className="mt-4 text-gray-600 text-center">
    {/* <a href="https://github.com/BAI-Bonjwa/ctrlcv">
      <img
        src={githubIcon}
        alt="github"
        className="absolute top-3 left-4 w-6 h-6 opacity-50"
      />
    </a> */}
    <a href="/">ctrlcv-dev.com</a>
    <a href={url}>
      <img
        src={githubIcon}
        alt="github"
        className="absolute top-3 right-4 w-6 h-6 opacity-50"
      />
    </a>
    {/* <a
          href="https://github.com/BAI-Bonjwa/ctrlcv"
          className="absolute right-12 top-3">
          我要贡献
        </a> */}
  </header>
);

export default Header;
