import { useState, useRef } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const totalImages = 4;
  const nextImgRef = useRef(null);

  const upcomingImageIndex = (currentIndex % totalImages) + 1;

  const handleMiniImgClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingImageIndex);
  };

  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-image", { visibility: "visible" });
      gsap.to("#next-image", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.from("#current-image", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, {
    dependencies: [currentIndex],
    revertOnUpdate: true,
  });

  useGSAP(() => {
    gsap.set("#image-frame", {
      clipPath: "polygon(14% 0, 72% 0, 90% 90%, 0 100%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#image-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#image-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getImageSrc = (index) => `img/hero-${index}.jpg`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div id="image-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          {/* Small clickable image */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniImgClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <img
                ref={nextImgRef}
                src={getImageSrc(upcomingImageIndex)}
                alt="Next"
                id="current-image"
                className="size-64 origin-center scale-150 object-cover object-center"
              />
            </div>
          </div>

          {/* Transitioning image */}
          <img
            ref={nextImgRef}
            src={getImageSrc(currentIndex)}
            alt="Hero"
            id="next-image"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />

          {/* Background image */}
          <img
            src={getImageSrc(currentIndex === totalImages - 1 ? 1 : currentIndex)}
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        {/* Text & Button */}
        <h1 className="special-font hero-subheading absolute bottom-5 right-5 z-40 text-blue-75">
          Riot Games
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-subheading text-blue-100">Valorant</h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              A 5v5 character-based tactical shooter
            </p>
            <Button
              id="watch-trailer"
              title="Play For Free"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Backup title */}
      <h1 className="special-font hero-subheading absolute bottom-5 right-5 text-black">
        Riot Games
      </h1>
    </div>
  );
}

export default Hero;
