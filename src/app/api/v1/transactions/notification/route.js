import prisma from "@/utils/prisma";
import { NextResponse as res } from "next/server";
import crypto from "crypto";
const updateStatusBasedOnMidtransResponse = async (transactionId, data) => {
  console.log("data func", data);
  const hash = crypto
    .createHash("sha512")
    .update(
      `${transactionId}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`,
    )
    .digest("hex");
  if (data.signature_key !== hash) {
    return {
      status: "error",
      message: "Invalid Signature key",
    };
  }

  let responseData = null;
  let transactionStatus = data.transaction_status;
  let fraudStatus = data.fraud_status;

  if (transactionStatus == "capture") {
    if (fraudStatus == "accept") {
      const transaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          status: "PAID",
          paymentMethod: data.payment_type,
        },
      });
      // const transaction = await transactionService.updateTransactionStatus({transaction_id, status: PAID, payment_method: data.payment_type});
      responseData = transaction;
    }
  } else if (transactionStatus == "settlement") {
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: "PAID",
        paymentMethod: data.payment_type,
      },
    });
    responseData = transaction;
  } else if (
    transactionStatus == "cancel" ||
    transactionStatus == "deny" ||
    transactionStatus == "expire"
  ) {
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: "CANCELED",
      },
    });
    responseData = transaction;
  } else if (transactionStatus == "pending") {
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: "PENDING_PAYMENT",
      },
    });
    responseData = transaction;
  }

  return {
    status: "success",
    data: responseData,
  };
};

export async function POST(req) {
  const data = await req.json();

  try {
    console.log("trxid", data);

    // sengaja g async await biar g ke block
    const transaction = prisma.transaction.findUnique({
      where: {
        id: data.order_id,
      },
    });

    if (transaction) {
      updateStatusBasedOnMidtransResponse(transaction.id, data).then(
        (result) => {
          console.log("result", result);
        },
      );
    }

    res.status(200).json({
      status: "success",
      message: "OK",
    });
  } catch (error) {
    console.log(error);
  }

  //  transactionService.getTransactionById({transaction_id: data.order_id}).then((transaction) => {
  //     if(transaction){
  //         updateStatusBasedOnMidtransResponse(transaction.id, data).then(result => {
  //             console.log('result', result)
  //         })
  //     }
  // })

  // res.status(200).json({
  //     status: 'success',
  //     message: 'OK'
  // })
}
