import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export const P2pTransactions = async ({
  transactions,
}: {
  transactions: {
    amount: number;
    fromUserId: number;
    toUserId: number;
    timestamp: Date;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  const session = await getServerSession(authOptions);
  const id = Number(session?.user?.id);
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">
                {t.fromUserId === id ? "Send" : "receive"} INR
              </div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {t.fromUserId === id ? "-" : "+"} Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
