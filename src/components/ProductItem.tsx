import { formatToCurrency } from "@/utils/format";
import { FileImage } from "lucide-react";
import { FC } from "react";

interface ProductItemProps {
  name: string;
  price?: number | null;
  imageUrl?: string;
}

export const ProductItem: FC<ProductItemProps> = ({
  name,
  price,
  imageUrl,
}) => {
  return (
    <div className="flex items-center p-4 border-b">
      <div className="w-16 h-16 flex-shrink-0 bg-gray-200 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileImage name="image" className="w-8 h-8 text-gray-400" />
        )}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500">{formatToCurrency(price)}</p>
      </div>
    </div>
  );
};
