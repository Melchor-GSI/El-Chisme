import { CategoriesSelect, CurrencySelect } from "@/components";
import { Button, Label } from "@/components/ui";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function NewGossip() {
  return (
    <div id="new-gossip" className="absolute bottom-0 w-full z-10">
      <Card className="py-4">
        <CardContent className="space-y-2">
          <CategoriesSelect />

          <div className="space-y-2">
            <Label>Precio</Label>
            <div className="flex gap-2">
              <Input name="price" type="number" min="0" />

              <CurrencySelect />
            </div>
          </div>
        </CardContent>

        <CardFooter className="pb-0">
          <Button className="w-full px-4">Publicar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
