"use client";
import { ChevronDown } from "lucide-react";
import React, { Children, useEffect, useRef, useState } from "react";

interface AccordionProps {
  titleNode: React.ReactNode;
  type?: "arrow";
  active?: boolean;
  h?: string;
  children: React.ReactNode;
}

function Accordion(props: AccordionProps) {
  const [active, setActive] = useState<boolean>(props?.active || false);
  const content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  function toggleAccordion(): void {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current?.scrollHeight}px`);
  }

  useEffect(() => {
    console.log("height change");
    setHeight(!active ? "0px" : `${content.current?.scrollHeight}px`);
  }, [props?.active]);

  return (
    <div
      data-aos="fade-up"
      className="accordion__section bg-white rounded-3xl overflow-hidden"
    >
      <div
        className={`accordion flex justify-between items-center py-2 px-5 ${
          active ? "active" : ""
        }`}
        onClick={toggleAccordion}
      >
        <div className="accordion__title">{props.titleNode}</div>

        <div
          className={`font-bold  min-w-6 min-h-6 w-6 h-6 flex justify-center items-center ${
            active ? "rotate-180" : "rotate-0"
          } transition-all`}
          style={{ marginLeft: "20px" }}
        >
          {props.type === "arrow" ? <ChevronDown /> : active ? "-" : "+"}
        </div>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        <div className="accordion__text">{props.children}</div>
      </div>
    </div>
  );
}

export default Accordion;
