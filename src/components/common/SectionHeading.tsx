import React from "react";

interface SectionHeadingProps {
  title1: string;
  title2: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title1, title2 }) => {
  return (
    <h3 className="text-5xl text-black font-georgia">
      {title1}{" "}
      <span className="text-[var(--color-purple)] font-georgia relative font-black">
        {title2}{" "}
        <div className="h-1 w-full rounded-full absolute bottom-0 right-0 bg-multi-gradient" />
      </span>{" "}
    </h3>
  );
};

export default SectionHeading;
