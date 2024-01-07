import React from "react";

const Description = ({ desc, title }) => {
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-base font-semibold">Informasi Umum {title}</h3>
      </div>

      <div className="px-3 text-justify text-sm">
        <p className="whitespace-pre-wrap">{desc}</p>
      </div>
    </div>
  );
};

export default Description;
