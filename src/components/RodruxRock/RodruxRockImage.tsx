import Image from "next/image";
import React from "react";

export const RodruxRockImage = ({ image }: { image: string }) => {
  return (
    <>
      {image && (
        <Image
          src={image}
          alt="image"
          width={264}
          height={280}
          unoptimized
          priority
        ></Image>
      )}
    </>
  );
};
