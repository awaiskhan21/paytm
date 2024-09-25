"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function P2PTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = Number(session?.user?.id);
  if (!from) {
    return {
      message: "Error while sending",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;
    const balance = await tx.balance.findUnique({
      where: { userId: from },
    });
    console.log("1 complete");
    if (!balance || balance.amount < amount) {
      throw new Error("insufficient balance");
    }
    console.log("2 complete");

    await tx.balance.update({
      where: { userId: from },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: toUser?.id },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        fromUserId: from,
        toUserId: toUser?.id,
        amount,
        timestamp: new Date(),
      },
    });
  });
}
