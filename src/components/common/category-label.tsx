import { Category } from "@/types/product";
import { useEffect, useState } from "react";

export type CategoryLabelProps = {
  value?: number | null;
};

export const CategoryLabel = ({ value }: CategoryLabelProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.data));
  }, []);

  return <span>{categories.find((c) => c.id === value)?.name ?? "-"}</span>;
};
