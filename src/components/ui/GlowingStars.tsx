"use client";

import React, { useEffect, useId, useRef, useState } from "react";

interface IStar {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}

interface ICardStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const createSeededRandom = (seed: string) => {
  let value = 2166136261;

  for (let index = 0; index < seed.length; index++) {
    value ^= seed.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }

  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
};

const createCardStars = (seed: string): ICardStar[] => {
  const random = createSeededRandom(seed);

  return Array.from({ length: 15 }, () => ({
    x: random() * 100,
    y: random() * 100,
    size: random() * 2 + 1,
    opacity: random() * 0.5 + 0.2,
    speed: random() * 3 + 2,
  }));
};

export const GlowingStarsBackground = ({
  className,
  starCount = 50,
}: {
  className?: string;
  starCount?: number;
}) => {
  const [stars, setStars] = useState<IStar[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: IStar[] = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() > 0.5 ? Math.random() * 2 + 1 : null,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, [starCount]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className || ""}`}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-white ${star.id >= 50 ? "hidden sm:block" : ""}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.radius}px`,
            height: `${star.radius}px`,
            opacity: star.opacity,
            animation: star.twinkleSpeed
              ? `twinkle ${star.twinkleSpeed}s ease-in-out infinite`
              : undefined,
            boxShadow: `0 0 ${star.radius * 2}px ${star.radius}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-3xl animate-pulse motion-reduce:animate-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/3 rounded-full blur-3xl animate-pulse motion-reduce:animate-none" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-40 h-40 sm:w-48 sm:h-48 bg-white/5 rounded-full blur-3xl animate-pulse motion-reduce:animate-none" style={{ animationDelay: "2s" }} />
    </div>
  );
};

export const GlowingStarsCard = ({
  children,
  className,
  glowColor = "rgba(255,255,255,0.1)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) => {
  const cardId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cardStars] = useState(() => createCardStars(cardId));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-neutral-800 bg-black/50 backdrop-blur-sm transition-all duration-300 ${className || ""}`}
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
          }}
        />
      )}
      
      {/* Inner stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {cardStars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.speed}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
