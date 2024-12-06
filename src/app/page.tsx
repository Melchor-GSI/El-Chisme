import { FabButton } from "@/components/fab";
import Search from "@/components/search";
import { getProducts } from "@/lib/server/services/products";
import { parseFilters } from "@/utils/filter";

export type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(parseFilters(searchParams));

  return (
    <>
      <div className="relative w-full p-4">
        <Search products={products} />
      </div>

      <FabButton />
    </>
  );
}
