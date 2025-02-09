"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/types";
import { saveAs } from "file-saver";

const ProductTable = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: IProduct[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const exportToCSV = () => {
    const csvHeaders = ["ID", "Title", "Price", "Category"];
    const csvRows = products.map((product) => 
      [product.id, `"${product.title.replace(/"/g, '""')}"`, product.price, `"${product.category.replace(/"/g, '""')}"`].join(",")
    );

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
    const fileName = `products_${timestamp}.csv`;
    
    saveAs(blob, fileName);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      
      <button
        onClick={exportToCSV}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
      >
        Export CSV
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.title}</td>
              <td className="border p-2">${product.price.toFixed(2)}</td>
              <td className="border p-2">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
