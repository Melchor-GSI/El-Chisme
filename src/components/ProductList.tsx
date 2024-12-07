import { GetProductDto } from "@/types/product";
import { ProductItem } from "./ProductItem";
import { Card } from "./ui";

const products = [
  {
    name: "Product 1",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  { name: "Product 2", price: 19.99 },
  {
    name: "Product 3",
    price: 39.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 1",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  { name: "Product 2", price: 19.99 },
  {
    name: "Product 3",
    price: 39.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 3",
    price: 39.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 1",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  { name: "Product 2", price: 19.99 },
  {
    name: "Product 3",
    price: 39.99,
    imageUrl: "https://via.placeholder.com/150",
  },
];

export type ProductListProps = {
  data: GetProductDto[];
};

export const ProductList = ({ data }: ProductListProps) => {
  console.log(data);

  return (
    <Card>
      {products.map((product, index) => (
        <ProductItem
          key={index}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </Card>
  );
};
