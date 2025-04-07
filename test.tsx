import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 699 },
    { id: 3, name: "Tablet", price: 299 },
  ]);

  const [newProduct, setNewProduct] = useState<{ name: string; price: string }>({
    name: "",
    // falta a propriedade "name"
    price: "",
  });

  const addProduct = () => {
    const product = {
      id: products.length + 1,
      name: newProduct.name, // name undefined provavelmente
      price: newProduct.price,
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", price: "" }); // resetar o name também
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} // falta o template literals no ${} ou retirar o $
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Product name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductList;