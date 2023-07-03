import Head from "next/head";
import {
  AiOutlineDashboard,
  AiOutlineBook,
  AiOutlineUser,
} from "react-icons/ai";

function Config() {
  return (
    <>
      <Head>
        <title>Config</title>
      </Head>
      <div className="container my-5 mx-auto">
        <div className="p-20 rounded h-[33rem] bg-base-100">
          <div className="flex gap-12 justify-start">
            <div className="w-3/12 h-96 border-r options border-r-primary">
              <h3 className="mb-5 text-xl font-bold uppercase text-primary">
                Options
              </h3>
              <ul className="flex flex-col gap-3">
                <li className="inline-flex gap-2 items-center underline capitalize hover:cursor-pointer text-primary-focus hover:text-primary">
                  <AiOutlineDashboard /> Dashboard config
                </li>
                <li className="inline-flex gap-2 items-center capitalize hover:cursor-pointer hover:text-primary">
                  <AiOutlineBook /> Book reader config
                </li>
                <li className="inline-flex gap-2 items-center capitalize hover:cursor-pointer hover:text-primary">
                  <AiOutlineUser /> User config
                </li>
              </ul>
            </div>
            <div className="grow basis-0">
              <h3 className="text-2xl font-bold uppercase text-primary">
                Dashboard config
              </h3>
              <p>
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                reprehenderit enim labore culpa sint ad nisi Lorem pariatur
                mollit ex esse exercitation amet. Nisi anim cupidatat excepteur
                officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip
                amet voluptate voluptate dolor minim nulla est proident. Nostrud
                officia pariatur ut officia. Sit irure elit esse ea nulla sunt
                ex occaecat reprehenderit commodo officia dolor Lorem duis
                laboris cupidatat officia voluptate. Culpa proident adipisicing
                id nulla nisi laboris ex in Lorem sunt duis officia eiusmod.
                Aliqua reprehenderit commodo ex non excepteur duis sunt velit
                enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur
                et est culpa et culpa duis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Config;
