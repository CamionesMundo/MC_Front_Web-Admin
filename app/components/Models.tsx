import React from "react";
import { carDetails } from "../data/content";
import Image from "next/image";
import { AiFillStar, AiFillTool } from "react-icons/ai";
import { GiCarDoor } from "react-icons/gi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBriefcase, faCheck } from '@fortawesome/free-solid-svg-icons'
import { BsFillFuelPumpFill } from "react-icons/bs";

function Models() {
  return (
    <section id="models-main">
      <div className="py-8 px-8 lg:px-28 lg:py-5 my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {carDetails.map((data) => (
            <div
              key={data.id}
              className="border border-lighter-grey bg-white rounded"
            >
              <div>
                <Image
                  src={`/images/box-${data.car}.png`}
                  alt={data.car}
                  width={800}
                  height={800}
                  className="w-full h-full lg:h-60 object-cover rounded-t"
                />
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div>
                      <h1 className="font-bold text-xl lg:text-2xl">
                        {data.car}
                      </h1>
                    </div>
                    {false && (<div className="text-[#ffc933] flex items-center">
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                    </div>)}
                  </div>
                  <div className="text-right">
                    <h1 className="font-bold text-xl lg:text-2xl">
                      ${data.price}
                    </h1>
                    <p className="text-custom-grey">per day</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="text-[15px]"/>
                    <span>4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBriefcase} className="text-[15px]"/>
                    <span>4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{data.doors}</span>
                    <span>
                      <GiCarDoor />
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px]">
                      <AiFillTool />
                    </span>
                    <span className="text-[15px]">{data.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px]">4L/100 km</span>
                    <span className="text-[15px]">
                      <BsFillFuelPumpFill />
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                    <span>This offer includes:</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-red-600">
                   <div className="columns-2">
                      <div className="text-[11px] mt-1">
                        <FontAwesomeIcon icon={faCheck}/><label> No credit card fees</label>
                      </div>
                      <div className="text-[11px] mt-1">
                        <FontAwesomeIcon icon={faCheck}/><label> Liability Insurance</label>
                      </div>
                      <div className="text-[11px] mt-1">
                        <FontAwesomeIcon icon={faCheck}/><label> Rental Car Insurance</label>
                      </div>
                      <div className="text-[11px] mt-1">
                        <FontAwesomeIcon icon={faCheck}/><label> CDW</label>
                      </div>
                    </div>
                </div>
                <div>
                  <hr className="border border-lighter-grey" />
                </div>
                <div>
                  <a
                    href="/#booking"
                    className="block text-center bg-custom-purple p-3 font-bold text-white rounded shadow-purple-bottom hover:shadow-purple-bottom-hov transition-all duration-300 ease-linear w-full"
                  >
                    Book Ride
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Models;
