import React from "react";

const InfoDestination = ({ officeHours, address, price }) => {
  return (
    <section className=" text-[10px]">
      <div className="space-y-3">
        <div className="space-y-2  font-semibold ">
          <h3 className="text-[16px]">Informasi Umum Tari Kecak Uluwatu</h3>
          <h4 className="text-[14px]">
            Ringkasan Informasi Tari Kecak Uluwatu
          </h4>
        </div>

        <div className="space-y-3 text-[13px]">
          <div className="grid grid-cols-2">
            <h5>Harga Tiket</h5>
            <h5>Mulai dari Rp{price}</h5>
          </div>

          <div className="grid grid-cols-2">
            <h5>Fasilitas</h5>
            <h5>Toilet, Area Parkir</h5>
          </div>

          <div className="grid grid-cols-2">
            <h5>Jam Buka</h5>
            <h5>{officeHours}</h5>
          </div>

          <div className="grid grid-cols-2">
            <h5>Alamat</h5>
            <h5>{address}</h5>
          </div>
        </div>
      </div>

      <p className="italic">*Data di atas bisa berubah sewaktu-waktu</p>
    </section>
  );
};

export default InfoDestination;
