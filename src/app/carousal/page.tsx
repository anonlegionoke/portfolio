"use client";

import EnterAnimation from "./enter-animation/EnterAnimation";
import ImageCarousel from "./image-carousel/ImageCarousel";

export default function Carousal() {
  return (
    <div>
      <EnterAnimation width={300} height={300} backgroundColor="#0bdcf7" top={0} right={20} bottom={-200} borderRadius="10%"/>
      <EnterAnimation width={250} height={250} backgroundColor="#feb5b5" top={0} left={60} borderRadius="50%" />
      <EnterAnimation width={200} height={200} backgroundColor="#77dd77" top={-80} left={40} borderRadius="50%" />
    </div>
  )
}