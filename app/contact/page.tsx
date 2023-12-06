"use client";

import React from "react";
import { TogglersProvider } from "../context/togglers";
import Header from "../components/Header";
import MobileNavbar from "../components/MobileNavbar";
import BannerHero from "../components/BannerHero";
import ToTop from "../components/ToTop";
import GetTouch from "../components/CharacteristicAbout";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

function page() {
  return (
    <TogglersProvider>
      <main>
        <Header />
        <MobileNavbar />
        <BannerHero htmlId="contact-hero" page="Contact" description="Rent a Car Online Today & Enjoy the Best Deals, Rates & Accessories."/>
        <ToTop />
        <Contact />
        <Footer />
      </main>
    </TogglersProvider>
  );
}

export default page;
