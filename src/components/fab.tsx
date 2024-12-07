"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const FabButton = () => {
  const router = useRouter();

  return (
    <div className="absolute bottom-4 right-4">
      <Button
        className="rounded-full w-16 h-16 p-0 bg-white text-black"
        onClick={() => router.push("/new-gossip")}
      >
        <PlusIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
