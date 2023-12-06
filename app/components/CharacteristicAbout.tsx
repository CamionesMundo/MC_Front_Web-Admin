import React from "react";
import { aboutGrid } from "../data/content";

function CharacteristicAbout() {
  return (
    <section id="get-in-touch">
      <div className="px-8 py-8 lg:py-20 lg:mt-16 bg-[url('/images/getintouch-banner-bg.png')] relative">
        <div className="absolute inset-0 bg-lighter-black/80" />
        <div className="z-50 relative text-center text-2xl font-bold flex flex-col gap-8 lg:flex-row lg:justify-center lg:text-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:w-fit">
            {aboutGrid.map((data) => (
              <div key={data.id} className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-center">
                  <h1 className="font-bold text-5xl text-custom-purple">{data.amount}</h1>
                </div>
                <div className="flex justify-center">
                  <p className="text-custom-white">{data.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharacteristicAbout;
