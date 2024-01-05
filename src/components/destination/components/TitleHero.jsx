import { MapPin, Star, Ticket } from "lucide-react";
import React from "react";

const TitleHero = ({ title, totComment, totRate, city, address }) => {
  return (
    <section className="space-y-3">
      <div>
        <div>
          <span className="text-[12px] capitalize text-gray-400">{city}</span>
        </div>
        <div>
          <h1 className="mb-2 text-[22px] font-bold capitalize">{title}</h1>
        </div>

        <div className="flex h-[42px] items-center justify-center space-x-20 text-[14px]">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <Star className="fill-slate-800 " size={"15px"} />
              <div>{totRate}</div>
            </div>
            <div>
              <h1 className="py-1 underline">{totComment} Review</h1>
            </div>
          </div>
          <span className=" h-[25px] w-[1px]  items-center bg-slate-300"></span>
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <div>
                <Ticket className="fill-slate-800 text-white" size={"18px"} />
              </div>
              <div>54RB+</div>
            </div>
            <div>
              <h1 className="py-1">Terjual</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center text-[14px]">
        <div>
          <MapPin className="fill-slate-600 text-white " />
        </div>

        <div>
          <p>{address}</p>
        </div>
      </div>
    </section>
  );
};

export default TitleHero;
