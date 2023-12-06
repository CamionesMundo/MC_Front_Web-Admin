"use client";

import React from "react";
import Header from "../components/Header";
import MobileNavbar from "../components/MobileNavbar";
import { TogglersProvider } from "../context/togglers";
import { InputValueProvider } from "../context/inputValue";
import { CurrentValueProvider } from "../context/currentValue";
import BannerHero from "../components/BannerHero";
import About from "../components/About";
import QuickEasy from "../components/QuickEasy";
import Footer from "../components/Footer";
import ToTop from "../components/ToTop";
import CharacteristicAbout from '../components/CharacteristicAbout'

function page() {
  return (
    <TogglersProvider>
      <main>
        <Header />
        <MobileNavbar />
        <BannerHero htmlId="about-hero" page="About" description={null}/>
        <ToTop />
        <About />
        <CharacteristicAbout/>
        <Footer />
      </main>
    </TogglersProvider>
  );
}

export default page;
