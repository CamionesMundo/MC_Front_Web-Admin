import Link from "next/link";
import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { WiTime4 } from "react-icons/wi";

function Contact() {
  const [office, setOffice] = useState('miami');
  const [address, setAddress] = useState('4111nw 27th Fl 33142');
  const [phoneCall, setPhonecall] = useState('tel:+17868041961')
  const [phoneText, setPhonetext] = useState('786-804-1961')
  const [hrefGooglemaps, setHrefgoogleMaps] = useState('https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28736.757518354236!2d-80.263189!3d25.80045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b74e50dd0679%3A0x3d6183ab2a2c614b!2s4111%20NW%2027th%20St%2C%20Miami%2C%20FL%2033142%2C%20EE.%20UU.!5e0!3m2!1ses!2sve!4v1694479903567!5m2!1ses!2sve')

  const handleChangeoffice = (
    event: React.MouseEvent<HTMLElement>,
    newOffice: string,
  ) => {
    if(newOffice){
      if(newOffice === 'miami'){
        setHrefgoogleMaps('https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28736.757518354236!2d-80.263189!3d25.80045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b74e50dd0679%3A0x3d6183ab2a2c614b!2s4111%20NW%2027th%20St%2C%20Miami%2C%20FL%2033142%2C%20EE.%20UU.!5e0!3m2!1ses!2sve!4v1694479903567!5m2!1ses!2sve')
        setAddress('4111nw 27th Fl 33142')
        setPhonecall('tel:+17868041961')
        setPhonetext('786-804-1961')
      }

      if(newOffice === 'louderdale'){
        setHrefgoogleMaps('https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d114680.18760144836!2d-80.150602!3d26.074234000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9aa7ae4c8faf5%3A0x2ae0339d90a6cbe6!2sAeropuerto%20Internacional%20de%20Fort%20Lauderdale-Hollywood!5e0!3m2!1ses!2sve!4v1694480153729!5m2!1ses!2sve')
        setAddress('Hollywood International Airport, Fort Lauderdale')
        setPhonecall('tel:+13067812694')
        setPhonetext('306-781-2694')
      }

      if(newOffice === 'doral'){
        setHrefgoogleMaps('https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28734.838383317132!2d-80.323126!3d25.808364!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b97f15c37069%3A0xae86b3cc73fbcb77!2s3755%20NW%2078th%20Ave%2C%20Doral%2C%20FL%2033166%2C%20EE.%20UU.!5e0!3m2!1ses!2sve!4v1694480174302!5m2!1ses!2sve')
        setAddress('3755 NW 78th Ave Doral FL 33166')
        setPhonecall('tel:+17869096133')
        setPhonetext('786-909-6133')
      }

      setOffice(newOffice);
    }    
  };

  return (
    <section id="contact-main">
      <div className="py-6 flex justify-center">
        <div className="w-96per flex justify-center">
          <ToggleButtonGroup
            value={office}
            exclusive
            onChange={handleChangeoffice}
            aria-label="Platform"
          >
            <ToggleButton value="miami" style={{backgroundColor: office === 'miami' ? '#743186' : 'transparent',
                color: office === 'miami' ? 'white' : 'black'}}>Airport Miami</ToggleButton>
            <ToggleButton value="louderdale" style={{backgroundColor: office === 'louderdale' ? '#743186' : 'transparent',
                color: office === 'louderdale' ? 'white' : 'black'}}>Airport Ft Louderdale</ToggleButton>
            <ToggleButton value="doral" style={{backgroundColor: office === 'doral' ? '#743186' : 'transparent',
                color: office === 'doral' ? 'white' : 'black'}}>Doral</ToggleButton>
          </ToggleButtonGroup>
          </div>
      </div>
      <div className="mb-2 px-8 lg:px-28 bg-[url('/images/contact-bg.png')] bg-[50%] bg-no-repeat bg-auto text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8 lg:max-w-md">
          <div className="space-y-4">
            <div>
              <h1 className="font-bold text-2.5rem">
                Need additional information?
              </h1>
            </div>
            <div>
              <h1 className="font-bold text-[25px]">
                Location & Phone
              </h1>
            </div>
          </div>
          <div>
            <ul className="space-y-4">
              <li>
                <a
                  className="flex items-center justify-center lg:justify-start gap-2 hover:text-custom-purple transition-all duration-300 ease-linear"
                >
                  <span>
                    <IoLocationSharp />
                  </span>
                  <span>{address}</span>
                </a>
              </li>
              <li>
                <Link
                  href={phoneCall}
                  className="flex items-center justify-center lg:justify-start gap-2 hover:text-custom-purple transition-all duration-300 ease-linear"
                >
                  <span>
                    <BsFillTelephoneFill />
                  </span>
                  <span>{phoneText}</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div>
              <h1 className="font-bold text-[25px]">
                Opening Hours
              </h1>
            </div>
          </div>
          <div>
            <ul className="space-y-4">
              <li>
                <a
                  className="flex items-center justify-center lg:justify-start gap-2 hover:text-custom-purple transition-all duration-300 ease-linear"
                >
                  <span>
                    <WiTime4 />
                  </span>
                  <span>Mo-Su 24 hours</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div>
              <h1 className="font-bold text-[25px]">
                Email
              </h1>
            </div>
          </div>
          <div>
            <ul className="space-y-4">
              <li>
                <Link
                  href="mailto:admin@miamilifecars.com"
                  className="flex items-center justify-center lg:justify-start gap-2 hover:text-custom-purple transition-all duration-300 ease-linear"
                >
                  <span>
                    <GrMail />
                  </span>
                  <span>admin@miamilifecars.com</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-4 lg:space-y-6">
          <iframe className="iframe-google-maps" src={hrefGooglemaps} 
          width="600" height="450" allowFullScreen={false} loading="lazy"></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;
