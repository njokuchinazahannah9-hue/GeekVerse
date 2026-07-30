import { useEffect, useMemo, useState } from "react";

import {
  FiPlus,
  FiFilter,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import AddProductModal from "../components/AddProductModal";
import ImportProductModal from "../components/ImportProductModal";

function Products() {

  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);


  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {

    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {

      setProducts(JSON.parse(savedProducts));

    } else {

      const defaultProducts = [

        {
          id: 1,
          image: "https://picsum.photos/70?1",
          name: "Solo Leveling Vol. 7",
          category: "Manga",
          source: "Imported from API",
          description: "",
          price: "$20.00",
          stock: 120,
          status: "Active",
        },

        {
          id: 2,
          image: "https://picsum.photos/70?2",
          name: "Interstellar Blu-ray",
          category: "Movie",
          source: "Imported from API",
          description: "",
          price: "$15.00",
          stock: 85,
          status: "Active",
        },

        {
          id: 3,
          image: "https://picsum.photos/70?3",
          name: "The Hobbit",
          category: "Book",
          source: "Imported from API",
          description: "",
          price: "$12.00",
          stock: 60,
          status: "Active",
        },

        {
          id: 4,
          image: "https://picsum.photos/70?4",
          name: "Spider-Man Comic #1",
          category: "Comic",
          source: "Imported from API",
          description: "",
          price: "$10.00",
          stock: 150,
          status: "Active",
        },

      ];

      setProducts(defaultProducts);

      localStorage.setItem(
        "products",
        JSON.stringify(defaultProducts)
      );

    }

  }, []);

  function handleAddProduct(productData) {

  let updatedProducts;

  if (editingProduct) {

    updatedProducts = products.map((product) =>
      product.id === editingProduct.id
        ? productData
        : product
    );

  } else {

    updatedProducts = [...products, productData];

  }

  setProducts(updatedProducts);

  localStorage.setItem(
    "products",
    JSON.stringify(updatedProducts)
  );

  setEditingProduct(null);

}

    function handleImportMovie(movie) {

  const importedMovie = {

    id: Date.now(),

    name: movie.title,

    category: "Movie",

    source: "Imported from API",

    description: movie.overview,

    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "",

    price: "$0.00",

    stock: 1,

    status: "Active",

  };

  const updatedProducts = [
    importedMovie,
    ...products,
  ];

  setProducts(updatedProducts);

  localStorage.setItem(
    "products",
    JSON.stringify(updatedProducts)
  );

  setShowImportModal(false);

  alert("Movie imported successfully!");

}

  function handleDeleteProduct(id) {

    if (!window.confirm("Delete this product?")) return;

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

  }

  const filteredProducts = useMemo(() => {

    if (categoryFilter === "All") {
      return products;
    }

    return products.filter(
      (product) => product.category === categoryFilter
    );

  }, [products, categoryFilter]);

  return (

    <div className="products-page">

      <div className="products-header">

  <div>

    <h1>Products</h1>

    <p>
      Manage all GeekVerse products.
    </p>

  </div>

  <div className="header-buttons">

    <button
  className="import-btn"
  onClick={() => setShowImportModal(true)}
>
  Import Product
</button>

    <button
      className="add-product-btn"
      onClick={() => {

        setEditingProduct(null);

        setShowModal(true);

      }}
    >
      <FiPlus />
      Add Product
    </button>

  </div>

</div>

      <div className="products-toolbar">

        <div className="toolbar-right">

          <select
            className="filter-btn"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >

            <option>All</option>

            <option>Movie</option>

            <option>Manga</option>

            <option>Book</option>

            <option>Comic</option>

          </select>

        </div>

      </div>

      <div className="products-table-card">

        <table className="products-table">

          <thead>

            <tr>

              <th>Product</th>

              <th>Category</th>

              <th>Source</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr key={product.id}>

                <td className="product-cell">

                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/70x70?text=No+Image"
                    }
                    alt={product.name}
                  />

                  <span>{product.name}</span>

                </td>

                <td>{product.category}</td>

                <td>{product.source}</td>

                <td>{product.price}</td>

                <td>{product.stock}</td>

                <td>

                  <span className="status active">

                    {product.status}

                  </span>

                </td>

                <td>

                  <div className="table-actions">

                    <FiEye />

                   <FiEdit2
  onClick={() => {
    setEditingProduct(product);
    setShowModal(true);
  }}
/>

                    <FiTrash2
                      onClick={() =>
                        handleDeleteProduct(product.id)
                      }
                    />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="pagination">

        <span>

          Showing {filteredProducts.length} product(s)

        </span>

      </div>

    <AddProductModal
  open={showModal}
  onClose={() => {
    setShowModal(false);
    setEditingProduct(null);
  }}
  onAdd={handleAddProduct}
  editingProduct={editingProduct}
/>

<ImportProductModal
  open={showImportModal}
  onClose={() => setShowImportModal(false)}
  onImport={handleImportMovie}
/>

    </div>

  );

}

export default Products;