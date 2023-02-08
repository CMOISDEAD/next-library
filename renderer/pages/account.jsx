import React from "react";
import { Stats } from "../components/Stats";

const account = () => {
  return (
    <>
      <p className="text-4xl text-primary text-center font-bold capitalize">
        Account overview
      </p>

      <Stats />
    </>
  );
};

export default account;
