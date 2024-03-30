"use client";
import Header from "@/components/Header/Header";
import { RodruxRocksGallery } from "@/components/RodruxRocksGallery/RodruxRocksGallery";
import { useRodruxRocksData } from "@/hooks/useRodruxRocksData";
import React from "react";

export default function Gallery() {
  return (
    <>
      <Header></Header>
      <RodruxRocksGallery></RodruxRocksGallery>
    </>
  );
}
