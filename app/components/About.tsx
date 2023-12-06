import Image from "next/image";
import React from "react";
import { aboutGrid } from "../data/content";

function About() {
  return (
    <section id="about-main">
      <div className="px-8 py-8 lg:px-60 lg:py-28 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 lg:items-center">
        <div>
          <Image
            src="/images/about-main.jpg"
            alt="about"
            width={1000}
            height={1000}
            className="m-auto w-full h-full"
          />
        </div>
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="font-bold space-y-2">
              <h3 className="text-xl">About Company</h3>
              <h1 className="text-2.5rem leading-tight">
                Plan Your Travel with Miami Life Cars
              </h1>
            </div>
            <div>
              <p className="text-custom-grey">
                Are you looking to navigate one of the most popular cities in the world, 
                or set off on a road trip into the country? Miami Life Cars is here to help. 
                A car rental in Florida affords you an unmatched sense of freedom and flexibility, 
                inviting you to delve deep into the cultural and historical wealth of this beautiful city. 
                Rent a car that best suits your trip using our straightforward booking panel. Hiring a car 
                has never been easier, and you get to enjoy a variety of benefits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
