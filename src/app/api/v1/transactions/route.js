import prisma from "@/utils/prisma";
import { verify } from "jsonwebtoken";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextResponse as res } from "next/server";

export async function POST(req) {
  const { destinationId } = await req.json();
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;
  const user = verify(token, process.env.JWT_SECRET);
  try {
    const findUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!findUser) {
      return res.json({ error: `User not found` }, { status: 404 });
    }

    const findDestinate = await prisma.post.findUnique({
      where: { id: destinationId },
    });

    if (!findDestinate) {
      return res.json({ error: `Destination not found` }, { status: 404 });
    }

    const transactionId = `MLC-${nanoid(4)}-${nanoid(8)}`;
    const totalAmmount = findDestinate.budget;

    const authString = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`);

    const payload = {
      transaction_details: {
        order_id: transactionId,
        gross_amount: totalAmmount,
      },
      item_details: {
        id: findDestinate.id,
        price: findDestinate.budget,
        quantity: 1,
        name: findDestinate.title,
      },
      customer_details: {
        name: user.name,
        email: user.email,
      },
      callbacks: {
        finish: `${process.env.BASE_URL}/order-status?transaction_id=${transactionId}`,
        error: `${process.env.BASE_URL}/order-status?transaction_id=${transactionId}`,
        pending: `${process.env.BASE_URL}/order-status?transaction_id=${transactionId}`,
      },
    };

    // hit api midtrans
    const response = await fetch(
      `${process.env.MIDTRANS_APP_URL}/snap/v1/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();
    console.log("data be", data);
    if (response.status !== 201) {
      return res.json(
        {
          error: "Failed to create transaction",
        },
        { status: 500 },
      );
    }

    const transactdestinate = await prisma.transaction.create({
      data: {
        id: transactionId,
        total: totalAmmount,
        status: "PENDING_PAYMENT",
        customerName: user.name,
        customerEmail: user.email,
        snapToken: data.token,
        snapRedirectUrl: data.redirect_url,
        transactionsItems: {
          create: {
            postId: destinationId,
          },
        },
      },
    });

    return res.json({
      status: "success",
      data: {
        id: transactionId,
        status: "PENDING_PAYMENT",
        customerName: user.name,
        customerEmail: user.email,
        postId: findDestinate.id,
        snapToken: data.token,
        snapRedirectUrl: data.redirect_url,
      },
    });
  } catch (error) {
    return res.json(
      { error: `Something went wrong. Please try again later, ${error}` },
      { status: 500 },
    );
  }
}
