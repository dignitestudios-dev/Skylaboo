"use client";
import React, { useRef, useState } from "react";

interface AccordionProps {
  title: string;
  content: string;
}

function Accordion(props: AccordionProps) {
  const [active, setActive] = useState<boolean>(false);
  const content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  function toggleAccordion(): void {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current?.scrollHeight}px`);
  }

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
        <p className="accordion__title text-sm uppercase font-bold">
          {props.title}
        </p>

        <div
          className="font-bold  min-w-6 min-h-6 w-6 h-6 flex justify-center items-center"
          style={{ marginLeft: "20px" }}
        >
          {active ? "-" : "+"}
        </div>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        <div
          className="accordion__text text-gray-500 text-sm !pt-0 uppercase"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
