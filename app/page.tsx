"use client";

import Header from "./components/Header";
import MobileNavbar from "./components/MobileNavbar";
import React from "react";
import { TogglersProvider } from "./context/togglers";
import Hero from "./components/Hero";
import Booking from "./components/Booking";
import { InputValueProvider } from "./context/inputValue";
import BookingModal from "./components/BookingModal";
import QuickEasy from "./components/QuickEasy";
import ToTop from "./components/ToTop";
import RentalFleet from "./components/RentalFleet";
import { CurrentValueProvider } from "./context/currentValue";
import SaveBig from "./components/SaveBig";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

function Home() {
  return (
    <TogglersProvider>
      <InputValueProvider>
        <CurrentValueProvider>
          <main>
            <label>React Next</label>
          </main>
        </CurrentValueProvider>
      </InputValueProvider>
    </TogglersProvider>
  );
}

export default Home;
