import { FabButton } from "@/components/fab";
import Search from "@/components/search";

export default async function Home() {
  return (
    <>
      <div className="relative w-full p-4">
        <Search />
      </div>

      <FabButton />
    </>
  );
}
