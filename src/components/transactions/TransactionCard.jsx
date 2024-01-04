"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const TransactionCard = () => {
  const searchParams = useSearchParams();
  const trxId = searchParams.get("transaction_id");
  const trxStatus = searchParams.get("transaction_status");
  console.log("trxstatus", trxStatus);
  return (
    <div>
      selamat transaksi {trxId}
      {trxStatus === "settlement" ? <p>succes</p> : <p>{trxStatus}</p>}
    </div>
  );
};

export default TransactionCard;
