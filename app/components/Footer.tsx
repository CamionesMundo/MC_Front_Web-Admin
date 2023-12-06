import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Stack, IconButton } from '@mui/material';
import { ImFacebook } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function Footer() {

  const goChossedsocialNetwork = (socialNetWork:string) =>{
    let isFacebook = socialNetWork === 'facebook'
    let isInstagram = socialNetWork === 'instragram'
    
    if(isFacebook){
      window.open('https://www.facebook.com/MiamiLifeCarsUSA','_blank')
    }

    if(isInstagram){
      window.open('https://www.instagram.com/miamilifecars','_blank')
    }
  }


  return (
    <section id="footer">
      <div className="bg-white px-8 lg:px-28 py-16 text-center grid grid-cols-1 lg:grid-cols-3 lg:text-left gap-20">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={80}
                height={140}
                priority
              />
            </div>
            <p className="text-custom-grey text-justify" style={{width:'97%'}}>
              Plan Your Trip With Miami Life Cars. Rent a Car Online Today & 
              Enjoy the Best Deals, Rates & Accessories.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-2xl">About us</h1>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="hover:text-custom-purple transition-all duration-300 ease-linear"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-custom-purple transition-all duration-300 ease-linear"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href="#top"
                className="hover:text-custom-orange transition-all duration-300 ease-linear"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
          <Stack direction="row" className="sm:justify-center md:justify-center lg:justify-start justify-center" spacing={1}>
            <IconButton style={{backgroundColor:'#743186', color:'white'}} size="medium" onClick={()=>goChossedsocialNetwork('instragram')}>
              <FaInstagram/>
            </IconButton>
            <IconButton style={{backgroundColor:'#743186', color:'white'}} size="medium" onClick={()=>goChossedsocialNetwork('facebook')}>
              <ImFacebook />
            </IconButton>
          </Stack>
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="font-bold text-2xl">Contact Us</h1>
          </div>
          <div className="space-y-2">
            <p><b className="text-[30px]">. </b>4111nw 27th Fl 33142, EE.UU.</p>
            <p>☎ +1 786 804-1961</p>
            <p><b className="text-[30px]">. </b>Hollywood International Airport, Fort Lauderdale</p>
            <p>☎ +1 306-781-2694</p>
            <p><b className="text-[30px]">. </b>3755 NW 78th Ave Doral FL 33166</p>
            <p>☎ +1 786-909-6133</p>
            <br/>
            <a href="mailto:miamilifecars@gmail.com"><FontAwesomeIcon icon={faEnvelope} className="text-[15px]"/> miamilifecars@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
