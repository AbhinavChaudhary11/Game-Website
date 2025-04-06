import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          We Are Valorant
        </p>

        <AnimatedTitle
          title="Defy The Limits"
          containerClass="mt-7 text-center"
          style={{ color: "black" }}
        />

        <div className="about-subtext">
          <p>Blend your style and experience on a global, competitive stage.</p>
          <p className="text-gray-500">
            Fight through 13 intense rounds with sharp gunplay and tactics—one life per round,
            so think fast. Battle in Competitive, Unranked, Deathmatch, and Spike Rush modes.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen relative" id="clip">
        <div className="mask-clip-path about-image">
          <video
            ref={videoRef}
            src="videos/about.mp4"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <button
            onClick={togglePlayPause}
            className="absolute bottom-4 left-4 z-10 bg-black text-white px-4 py-2 rounded"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
