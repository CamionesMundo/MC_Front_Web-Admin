"use client";

import React from "react";
import Header from "../components/Header";
import MobileNavbar from "../components/MobileNavbar";
import BannerHero from "../components/BannerHero";
import ToTop from "../components/ToTop";
import { TogglersProvider } from "../context/togglers";
import Models from "../components/Models";
import PaginationCars from "../components/PaginationCars";
import SwipeableTemporaryDrawer from '../components/SwipeableTemporaryDrawer'
import Booking from "../components/Booking";
import BookingModal from "../components/BookingModal";
import Footer from "../components/Footer";

function page() {
  return (
    <TogglersProvider>
      <main>
        <Header />
        <MobileNavbar />
        <BannerHero htmlId="models-hero" page="Car Rentals" description={null}/>
        <Booking />
        <BookingModal />
        <ToTop />
        <SwipeableTemporaryDrawer/>
        <Models />
        <PaginationCars/>
        <Footer />
      </main>
    </TogglersProvider>
  );
}

export default page;
