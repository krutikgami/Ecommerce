"use client";
import { cn } from "../utility/Infinite.js";
import React, { useEffect, useState } from "react";
import In_slider1 from '../images/In_slider1.jpg';
import In_slider2 from '../images/In_slider2.jpg';
import In_slider3 from '../images/In_slider3.jpg';
import In_slider4 from '../images/In_slider4.jpg';

const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const items = [{ img: In_slider1 }, { img: In_slider2 }, { img: In_slider3 }, { img: In_slider4 }];

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "30s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 font-bold text-2xl max-w-8xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        className
      )}
    >
      Top Selling Products
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, index) => (
          <li
            className="w-[250px] sm:w-[250px] md:w-[350px] lg:w-[500px] max-w-full flex flex-wrap relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8"
            key={index}
          >
            <blockquote className="h-24 sm:h-28 md:h-36 lg:h-48">
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              >
                <img src={item.img} alt="#" className="h-full w-full object-cover flex justify-center rounded-2xl" />
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
