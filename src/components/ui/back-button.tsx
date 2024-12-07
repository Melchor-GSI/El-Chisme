"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      className="rounded-full w-8 h-8 "
      variant="secondary"
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </Button>
  );
};
