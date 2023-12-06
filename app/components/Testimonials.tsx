import Image from "next/image";
import React from "react";
import { ImQuotesRight } from "react-icons/im";

function Testimonials() {
  return (
    <section id="testimonials">
      <div className="py-8 px-8 lg:px-60 my-20 space-y-10 lg:space-y-16">
        <div className="space-y-6">
          <div className="text-center font-bold space-y-2">
            <h3 className="text-xl">Reviewed by People</h3>
            <h1 className="text-2.5rem leading-tight">Client's Testimonials</h1>
          </div>
          <div>
            <p className="text-center text-custom-grey lg:px-36">
              Discover the positive impact we've made on the our clients by
              reading through their testimonials. Our clients have experienced
              our service and results, and they're eager to share their positive
              experiences with you.
            </p>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="p-8 lg:p-12 bg-white rounded shadow-white-box flex flex-col justify-between gap-8">
            <div>
              <p className="font-medium text-xl lg:text-[1.35rem] lg:leading-relaxed">
                “This is my first time to rent a car at Miami Life Cars. I am completely 
                satisfied with the service. Special thanks to Tory Linares. His professionalism is primo.“
              </p>
            </div>
            <div className="lg:flex lg:justify-between lg:items-center">
              <div className="flex items-center justify-center gap-4">
                <div>
                  <Image
                    src="/images/mt-1582-home-testimonials1.jpg"
                    alt="David Williams"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">David Williams</h3>
                </div>
              </div>
              <div className="hidden lg:block">
                <span className="text-custom-purple text-5xl">
                  <ImQuotesRight />
                </span>
              </div>
            </div>
          </div>
          <div className="lg:flex flex-col justify-between p-8 lg:p-12 bg-white rounded shadow-white-box">
            <div>
              <p className="font-medium text-xl lg:text-[1.35rem] lg:leading-relaxed">
                “Sometimes it is a little difficult to reach someone about adjusting a reservation, 
                but once contact is established, the representatives are quite friendly and helpful. Thanks“
              </p>
            </div>
            <div className="lg:flex lg:justify-between lg:items-center">
              <div className="flex items-center justify-center gap-4">
                <div>
                  <Image
                    src="/images/mt-1582-home-testimonials2.jpg"
                    alt="noah rizzly"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Andy Carlos</h3>
                </div>
              </div>
              <div className="hidden lg:block">
                <span className="text-custom-purple text-5xl">
                  <ImQuotesRight />
                </span>
              </div>
            </div>
          </div>
          <div className="lg:flex flex-col justify-between p-8 lg:p-12 bg-white rounded shadow-white-box">
            <div>
              <p className="font-medium text-xl lg:text-[1.35rem] lg:leading-relaxed">
                “Very helpful, extremely fast and efficient. This is the second time in 3 months I have used Miami Life Cars, 
                and will definitely use them again and recommend them to others.“
              </p>
            </div>
            <div className="lg:flex lg:justify-between lg:items-center">
              <div className="flex items-center justify-center gap-4">
                <div>
                  <Image
                    src="/images/mt-1582-home-testimonials3.jpg"
                    alt="noah rizzly"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Lara Pardo</h3>
                </div>
              </div>
              <div className="hidden lg:block">
                <span className="text-custom-purple text-5xl">
                  <ImQuotesRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
