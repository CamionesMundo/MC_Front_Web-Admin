"use client";

import React from "react";
import { TogglersProvider } from "../context/togglers";
import Header from "../components/Header";
import MobileNavbar from "../components/MobileNavbar";
import BannerHero from "../components/BannerHero";
import ToTop from "../components/ToTop";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function page() {
  return (
    <TogglersProvider>
      <main>
        <Header />
        <MobileNavbar />
        <BannerHero htmlId="testimonials-hero" page="Testimonials" description={null}/>
        <ToTop />
        <Testimonials />
        <Footer />
      </main>
    </TogglersProvider>
  );
}

export default page;
