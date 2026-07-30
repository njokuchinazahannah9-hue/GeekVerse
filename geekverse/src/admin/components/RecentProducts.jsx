import { FiEdit2, FiTrash2 } from "react-icons/fi";

function RecentProducts() {
  const products = [
    {
      id: 1,
      image: "https://picsum.photos/50?1",
      name: "Solo Leveling Vol. 7",
      type: "Manga",
      price: "$20.00",
      stock: 120,
    },
    {
      id: 2,
      image: "https://picsum.photos/50?2",
      name: "Interstellar Blu-ray",
      type: "Movie",
      price: "$15.00",
      stock: 85,
    },
    {
      id: 3,
      image: "https://picsum.photos/50?3",
      name: "The Hobbit",
      type: "Book",
      price: "$12.00",
      stock: 60,
    },
    {
      id: 4,
      image: "https://picsum.photos/50?4",
      name: "Spider-Man Comic",
      type: "Comic",
      price: "$10.00",
      stock: 150,
    },
  ];

  return (
    <div className="dashboard-card recent-products">

      <div className="card-header">
        <h3>Recent Products</h3>
        <button>View All</button>
      </div>

      <table className="products-table">

        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td className="product-info">
                <img src={product.image} alt="" />
                {product.name}
              </td>

              <td>{product.type}</td>

              <td>{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <span className="status active">
                  Active
                </span>
              </td>

              <td className="table-actions">
                <FiEdit2 />
                <FiTrash2 />
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentProducts;