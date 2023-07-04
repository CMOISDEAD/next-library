import Head from "next/head";
import {
  AiOutlineDashboard,
  AiOutlineBook,
  AiOutlineUser,
} from "react-icons/ai";
import { Theme } from "../components/config/Theme";

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
              <div className="w-full max-w-xs form-control">
                <label className="label">
                  <span className="label-text">theme:</span>
                </label>
                <Theme />
              </div>
              <div className="w-full max-w-xs form-control">
                <label className="label">
                  <span className="label-text">pdf Reader:</span>
                </label>
                <input
                  id="pdf-reader"
                  type="text"
                  name="pdf-reader"
                  className="w-full max-w-xs input input-bordered"
                  placeholder="zathura"
                />
              </div>
              <div className="w-full max-w-xs form-control">
                <label className="label">
                  <span className="label-text">sort books by:</span>
                </label>
                <select className="select select-bordered" defaultValue="title">
                  <option value="title">title</option>
                  <option value="year">year</option>
                  <option value="author">author</option>
                </select>
              </div>
              <button className="mt-5 btn btn-wide" disabled>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Config;
