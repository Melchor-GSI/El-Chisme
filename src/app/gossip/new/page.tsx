import { ProductForm } from "@/components/product-form";
import { Button } from "@/components/ui";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardFooter } from "@/components/ui/card";

export default function NewGossip() {
  return (
    <>
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>

      <div id="new-gossip" className="absolute bottom-0 w-full z-10">
        <Card className="py-4">
          <ProductForm />

          <CardFooter className="pb-0">
            <Button className="w-full px-4" type="submit" form="product">
              Publicar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
