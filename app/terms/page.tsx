"use client";

import React from "react";
import { TogglersProvider } from "../context/togglers";
import Header from "../components/Header";
import MobileNavbar from "../components/MobileNavbar";
import BannerHero from "../components/BannerHero";
import ToTop from "../components/ToTop";
import TermsDetails from '../components/TermsDetails'
import Footer from "../components/Footer";

function page() {
  return (
    <TogglersProvider>
      <main>
        <Header />
        <MobileNavbar />
        <BannerHero htmlId="terms" page="Terms and Conditions" description={"Please note the following Terms and Conditions apply to bookings placed directly on the Miami Life Cars website. For bookings placed through a third party website, please refer to their advertised Terms and Conditions or your Rental Voucher."}/>
        <TermsDetails/>
        <ToTop />
        <Footer />
      </main>
    </TogglersProvider>
  );
}

export default page;
