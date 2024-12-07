'use server'

// Simulamos una base de datos con un array
let products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'T-shirt', price: 19.99, category: 'Clothing' },
    { id: 3, name: 'Book', price: 9.99, category: 'Books' },
  ];
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
  }
  
  export const productService = {
    getProducts: (): Promise<Product[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([...products]), 100); // Simulamos un delay de red
      });
    },
  
    deleteProduct: (id: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = products.findIndex(p => p.id === id);
          if (index !== -1) {
            products = products.filter(p => p.id !== id);
            resolve();
          } else {
            reject(new Error('Product not found'));
          }
        }, 100); // Simulamos un delay de red
      });
    },
  
    // Podemos agregar más métodos aquí en el futuro, como addProduct, updateProduct, etc.
  };
  
  