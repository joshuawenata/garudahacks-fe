"use client";

// pages/index.tsx
import Head from "next/head";
import dynamic from "next/dynamic";
import { use, useEffect, useState } from "react";

const Map = dynamic(() => import("../app/component/map"), { ssr: false });

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768);
    });
  }, [isMobile]);

  return (
    <div className={`${isMobile ? "h-[1500px]" : "h-screen"}`}>
      <Head>
        <title>My Map App</title>
        <meta name="description" content="Track user location on a map" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white h-full w-full">
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>
          <div>
            <h1 className="text-4xl text-left py-10 text-black ml-10 font-bold">
              Alert Triggered by Jessie
            </h1>
            <h1 className="text-2xl text-left py-10 text-black ml-10 font-bold">
              Date Time
            </h1>
            <p className="text-left text-black ml-10">Mon, 20/0103, 23:11</p>
            <h1 className="text-2xl text-left py-10 text-black ml-10 font-bold">
              Start Location
            </h1>
            <p className="text-left text-black ml-10">https://</p>
            <h1 className="text-2xl text-left py-10 text-black ml-10 font-bold">
              Emergency Event
            </h1>
            <p className="text-left text-black ml-10">Criminality</p>
            <h1 className="text-2xl text-left py-10 text-black ml-10 font-bold">
              Description
            </h1>
            <p
              className={`text-left text-black ml-10 ${
                isMobile ? "w-80" : "w-96"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div>
            <h1
              className={`text-2xl ${
                isMobile ? "text-left ml-10" : "text-right ml-[13rem] mt-10"
              } py-10 text-black font-bold`}
            >
              Current Location
            </h1>
            <div
              className={`overflow-hidden flex absolute ${
                isMobile
                  ? "w-[330px] max-h-[300px] ml-10 mt-[60rem]"
                  : "w-[1000px] max-h-[800px] right-10"
              } top-32 border border-blue-500`}
            >
              <Map />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
