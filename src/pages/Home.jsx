import React from "react";
import Hero from "../components/landingpage/Hero";
import Company from "../components/landingpage/Company";
import Service from "../components/landingpage/Service";
import Partnership from "../components/landingpage/Partnership";
import News from "../components/landingpage/News";
import Footer from "../components/Footer";

function Home() {
  return (
    <main>
      <Hero />
      <Company />
      <Service />
      <Partnership />
      <News />
    </main>
  );
}

export default Home;
