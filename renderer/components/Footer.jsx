import { shell } from "electron";
import React from "react";
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai";

export const Footer = () => {
  const handleLink = (e) => {
    const { value } = e.currentTarget.attributes.getNamedItem("data-link");
    shell.openExternal(value);
  };

  return (
    <footer className="items-center p-4 shadow footer bg-base-200 text-base-content">
      <div className="grid-flow-col items-center">
        <p>DOOM</p>
      </div>
      <div className="grid-flow-col gap-4 mr-5 md:justify-self-end md:place-self-center">
        <div
          className="text-4xl transition cursor-pointer hover:text-primary-focus"
          data-link="https://twitter.com/camilo73205849"
          onClick={handleLink}
        >
          <AiOutlineTwitter />
        </div>
        <div
          className="text-4xl cursor-pointer hover:text-primary-focus"
          onClick={handleLink}
          data-link="https://www.github.com/CMOISDEAD/next-library"
        >
          <AiOutlineGithub />
        </div>
      </div>
    </footer>
  );
};
