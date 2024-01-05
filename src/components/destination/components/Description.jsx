import React from "react";

const Description = ({ desc, title }) => {
  return (
    <div>
      <div>
        <h3 className="text-[16px] font-semibold">Informasi Umum {title}</h3>
      </div>

      <div className="14px ">
        <p className="whitespace-pre-wrap">{desc}</p>
      </div>
    </div>
  );
};

export default Description;
