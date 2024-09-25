"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { P2PTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [key, setKey] = useState(0);
  const router = useRouter();

  return (
    <Card title="Send">
      <div className="w-full">
        <div className="py-4 text-left">
          <TextInput
            placeholder={"Number"}
            key={`number-${key}`}
            label="Number"
            onChange={(value) => {
              setNumber(value);
            }}
          />
        </div>
        <div className="py-4 text-left">
          <TextInput
            placeholder={"Amount"}
            key={`number-${key}`}
            label="Amount"
            onChange={(value) => {
              setAmount(value);
            }}
          />
        </div>
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await P2PTransfer(number, Number(amount) * 100);
              setNumber("");
              setAmount("");
              setKey((prevKey) => prevKey + 1);
              router.refresh();
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}
