import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { P2pTransactions } from "../../../components/p2pTransaction";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { getBalance } from "../transfer/page";

async function getP2pTransactions() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) },
      ],
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  return transactions;
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getP2pTransactions();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">Send</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <P2pTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
