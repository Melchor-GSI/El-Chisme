"use client";

import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "./button";

export const BackButton = () => {

  return (
    <Button
      className="rounded-full w-8 h-8 "
      variant="secondary"
      onClick={() => redirect('/')}
    >
      <ChevronLeft />
    </Button>
  );
};
