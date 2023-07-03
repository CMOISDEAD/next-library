import Head from "next/head";

function Config() {
  return (
    <>
      <Head>
        <title>Config</title>
      </Head>
      <div className="container my-5 mx-auto">
        <div className="p-10 rounded bg-base-100">
          <h3 className="text-xl font-bold text-center">configuration</h3>
          <ul className="list-disc">
            <li>directory data</li>
            <li>image download</li>
            <li>custom theme ?</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Config;
