import Head from "next/head";
import { Stats } from "../components/Stats";

const Account = () => {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <div>
        <p className="text-4xl font-bold text-center capitalize text-primary">
          Account overview 🥰
        </p>
        <Stats />
      </div>
    </>
  );
};

export default Account;
