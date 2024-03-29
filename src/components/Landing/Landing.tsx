"use client";
import React from "react";
import ClientOnly from "../ClientOnly/ClientOnly";
import LandingRodruxRock from "./LandingRodruxRock";

const Landing = () => {
  return (
    <ClientOnly>
      <LandingRodruxRock></LandingRodruxRock>
    </ClientOnly>
  );
};

export default Landing;
