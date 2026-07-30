import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

function AddProductModal({
  open,
  onClose,
  onAdd,
  editingProduct,
}) {
  const initialState = {
    name: "",
    category: "Movie",
    description: "",
    price: "",
    stock: "",
    image: "",
    status: "Active",
    source: "Manual",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData(initialState);
    }
  }, [editingProduct, open]);

  if (!open) return null;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingProduct) {
      onAdd(formData);
    } else {
      onAdd({
        id: Date.now(),
        ...formData,
      });
    }

    setFormData(initialState);

    onClose();
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>
            {editingProduct
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <button
            type="button"
            onClick={onClose}
          >
            <FiX />
          </button>

        </div>

        <form
          className="modal-body"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>Product Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Movie">Movie</option>
              <option value="Manga">Manga</option>
              <option value="Book">Book</option>
              <option value="Comic">Comic</option>
            </select>

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              placeholder="Write a short description..."
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          <div className="two-columns">

            <div className="form-group">

              <label>Price ($)</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label>Stock</label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="two-columns">

            <div className="form-group">

              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Out of Stock">
                  Out of Stock
                </option>
              </select>

            </div>

            <div className="form-group">

              <label>Source</label>

              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="Manual">
                  Manual
                </option>

                <option value="Imported from API">
                  Imported from API
                </option>

              </select>

            </div>

          </div>

          <div className="form-group">

            <label>Image URL</label>

            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
            />

          </div>

          <div className="modal-footer">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {editingProduct
                ? "Update Product"
                : "Save Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProductModal;