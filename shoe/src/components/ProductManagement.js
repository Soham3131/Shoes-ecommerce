
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({ name: '', description: '', brand: '', category: '' });
//   const [newCategoryName, setNewCategoryName] = useState('');
//   const [newCategoryImage, setNewCategoryImage] = useState(null);
//   const [newCategoryImagePreview, setNewCategoryImagePreview] = useState(null);
//   const [showCategoryForm, setShowCategoryForm] = useState(false);
//   const [variants, setVariants] = useState([{ size: '', price: '', countInStock: '' }]);
//   const [images, setImages] = useState([]); // This will now hold new File objects
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [existingImages, setExistingImages] = useState([]); // NEW: To store existing image URLs
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [refreshCategories, setRefreshCategories] = useState(false);
//   const [refreshProducts, setRefreshProducts] = useState(false); // NEW: Separate flag for products

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, [refreshCategories, refreshProducts]);

//   const fetchProducts = async () => {
//     try {
//       // ✅ CORRECTED: Populate the category field to get the category name
//       const response = await axios.get('http://localhost:5000/api/products');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//     }
//   };
  
//   const fetchCategories = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/categories', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };
  
//   const handleCreateCategory = async (e) => {
//     e.preventDefault();
//     if (!newCategoryName || !newCategoryImage) {
//       alert('Category name and image are required.');
//       return;
//     }

//     const data = new FormData();
//     data.append('name', newCategoryName);
//     data.append('image', newCategoryImage);

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/api/categories', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`
//         },
//       });
//       setNewCategoryName('');
//       setNewCategoryImage(null);
//       setNewCategoryImagePreview(null);
//       setShowCategoryForm(false);
//       setRefreshCategories(prev => !prev);
//       alert('Category created successfully!');
//     } catch (error) {
//       console.error('Failed to create category:', error);
//       alert('Failed to create category.');
//     }
//   };

//   const handleDeleteCategory = async (categoryId) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this category? This will fail if products are linked to it.');
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/categories/${categoryId}`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//       });
//       alert('Category deleted successfully!');
//       setRefreshCategories(prev => !prev);
//     } catch (error) {
//       console.error('Failed to delete category:', error);
//       alert(error.response?.data?.message || 'Failed to delete category.');
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(prevImages => [...prevImages, ...files]);
    
//     // Create new previews for the combined array (existing and new)
//     const newPreviews = files.map(file => URL.createObjectURL(file));
//     setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
//   };
  
//   const handleRemoveImage = (indexToRemove, isExisting) => {
//     if (isExisting) {
//       setExistingImages(existingImages.filter((_, index) => index !== indexToRemove));
//     } else {
//       setImages(images.filter((_, index) => index !== indexToRemove));
//       setImagePreviews(imagePreviews.filter((_, index) => index !== indexToRemove));
//     }
//   };

//   const handleNewCategoryImageChange = (e) => {
//     const file = e.target.files[0];
//     setNewCategoryImage(file);
//     setNewCategoryImagePreview(URL.createObjectURL(file));
//   };

//   const handleVariantChange = (index, e) => {
//     const newVariants = [...variants];
//     newVariants[index][e.target.name] = e.target.value;
//     setVariants(newVariants);
//   };

//   const addVariant = () => {
//     setVariants([...variants, { size: '', price: '', countInStock: '' }]);
//   };

//   const removeVariant = (index) => {
//     const newVariants = [...variants];
//     newVariants.splice(index, 1);
//     setVariants(newVariants);
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const data = new FormData();
//     for (const key in formData) {
//       data.append(key, formData[key]);
//     }
//     data.append('variants', JSON.stringify(variants));
//     for (const image of images) {
//       data.append('images', image);
//     }

//     try {
//       await axios.post('http://localhost:5000/api/products', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`
//         },
//       });
//       alert('Product added successfully!');
//       resetForm();
//       setRefreshProducts(prev => !prev);
//     } catch (error) {
//       console.error('Failed to add product:', error);
//       alert('Failed to add product.');
//     }
//   };

//   const handleEditClick = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       description: product.description,
//       brand: product.brand,
//       // ✅ CORRECTED: The category ID is now correctly set
//       category: product.category._id,
//     });
//     setVariants(product.variants);
//     // ✅ CORRECTED: The existing image URLs are now loaded
//     setExistingImages(product.images);
//     setImages([]); // Clear new images when editing
//     setImagePreviews([]); // Clear new image previews
//   };

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const data = new FormData();
//     for (const key in formData) {
//       data.append(key, formData[key]);
//     }
//     data.append('variants', JSON.stringify(variants));
//     // ✅ CORRECTED: Append new images and existing image URLs separately
//     for (const image of images) {
//       data.append('newImages', image);
//     }
//     for (const imageUrl of existingImages) {
//         data.append('existingImages', imageUrl);
//     }

//     try {
//       await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`
//         },
//       });
//       alert('Product updated successfully!');
//       resetForm();
//       setRefreshProducts(prev => !prev);
//     } catch (error) {
//       console.error('Failed to update product:', error);
//       alert('Failed to update product.');
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this product?');
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/products/${productId}`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//       });
//       alert('Product deleted successfully!');
//       setRefreshProducts(prev => !prev);
//     } catch (error) {
//       console.error('Failed to delete product:', error);
//       alert('Failed to delete product.');
//     }
//   };
  
//   const resetForm = () => {
//     setEditingProduct(null);
//     setFormData({ name: '', description: '', brand: '', category: '' });
//     setVariants([{ size: '', price: '', countInStock: '' }]);
//     setImages([]);
//     setImagePreviews([]);
//     setExistingImages([]);
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
//       <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
//         <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" className="w-full p-2 border rounded-md" required />
//         <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full p-2 border rounded-md" required />
//         <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Brand" className="w-full p-2 border rounded-md" required />
        
//         {/* Category Selection or Creation */}
//         {showCategoryForm ? (
//           <div className="flex flex-col space-y-2">
//             <input
//               type="text"
//               value={newCategoryName}
//               onChange={(e) => setNewCategoryName(e.target.value)}
//               placeholder="New Category Name"
//               className="w-full p-2 border rounded-md"
//               required
//             />
//             <input
//               type="file"
//               onChange={handleNewCategoryImageChange}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//             {newCategoryImagePreview && (
//                 <img src={newCategoryImagePreview} alt="Category Preview" className="h-24 w-24 object-cover rounded-md" />
//             )}
//             <div className="flex space-x-2">
//                 <button type="button" onClick={handleCreateCategory} className="bg-blue-600 text-white px-4 py-2 rounded-md">Create</button>
//                 <button type="button" onClick={() => setShowCategoryForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
//             </div>
//           </div>
//         ) : (
//           <div className="flex space-x-2 items-center">
//             {/* ✅ CORRECTED: The value is now correctly set to the category ID */}
//             <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded-md" required>
//               <option value="">Select Category</option>
//               {categories.map(cat => (
//                 <option key={cat._id} value={cat._id}>{cat.name}</option>
//               ))}
//             </select>
//             <button type="button" onClick={() => setShowCategoryForm(true)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">New</button>
//           </div>
//         )}
        
//         <h3 className="text-lg font-semibold">Product Variants (Sizes & Inventory)</h3>
//         {variants.map((variant, index) => (
//           <div key={index} className="flex space-x-2">
//             <input type="text" name="size" value={variant.size} onChange={(e) => handleVariantChange(index, e)} placeholder="Size (e.g., 5, 10, S)" className="w-full p-2 border rounded-md" required />
//             <input type="number" name="price" value={variant.price} onChange={(e) => handleVariantChange(index, e)} placeholder="Price" className="w-full p-2 border rounded-md" required />
//             <input type="number" name="countInStock" value={variant.countInStock} onChange={(e) => handleVariantChange(index, e)} placeholder="Inventory Count" className="w-full p-2 border rounded-md" required />
//             <button type="button" onClick={() => removeVariant(index)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">-</button>
//           </div>
//         ))}
//         <button type="button" onClick={addVariant} className="bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300">Add Variant</button>

//         <h3 className="text-lg font-semibold">Product Images</h3>
//         <input type="file" name="images" multiple onChange={handleImageChange} className="w-full p-2 border rounded-md" />
//         <div className="flex flex-wrap space-x-2 mt-2">
//             {/* Display existing images */}
//             {existingImages.map((imageUrl, index) => (
//                 <div key={`existing-${index}`} className="relative">
//                     <img src={imageUrl} alt={`Existing ${index}`} className="h-24 w-24 object-cover rounded-md" />
//                     <button 
//                         type="button" 
//                         onClick={() => handleRemoveImage(index, true)} 
//                         className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
//                     >
//                         &times;
//                     </button>
//                 </div>
//             ))}
//             {/* Display new image previews */}
//             {imagePreviews.map((preview, index) => (
//                 <div key={`new-${index}`} className="relative">
//                     <img src={preview} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded-md" />
//                      <button 
//                         type="button" 
//                         onClick={() => handleRemoveImage(index, false)} 
//                         className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
//                     >
//                         &times;
//                     </button>
//                 </div>
//             ))}
//         </div>
        
//         <div className="flex space-x-4">
//           <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
//             {editingProduct ? 'Update Product' : 'Add Product'}
//           </button>
//           {editingProduct && (
//             <button type="button" onClick={resetForm} className="w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500">Cancel</button>
//           )}
//         </div>
//       </form>

//       <h2 className="text-2xl font-bold mt-8 mb-4">Existing Products</h2>
//       <div className="space-y-4">
//         {products.map(product => (
//           <div key={product._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
//             <div className="flex items-center space-x-4">
//               <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
//               <div>
//                 <span className="font-semibold">{product.name} - {product.brand}</span>
//                 <p className="text-sm text-gray-600">Category: {product.category?.name || 'N/A'}</p>
//                 <p className="text-sm text-gray-600">Variants: {product.variants.map(v => `${v.size}(₹${v.price})`).join(', ')}</p>
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button onClick={() => handleEditClick(product)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Edit</button>
//               <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    gender: '',
    subCategory: '',
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [newCategoryImagePreview, setNewCategoryImagePreview] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [variants, setVariants] = useState([{ size: '', price: '', countInStock: '' }]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [refreshCategories, refreshProducts]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (indexToRemove, isExisting) => {
    if (isExisting) {
      setExistingImages(existingImages.filter((_, index) => index !== indexToRemove));
    } else {
      setImages(images.filter((_, index) => index !== indexToRemove));
      setImagePreviews(imagePreviews.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleVariantChange = (index, e) => {
    const newVariants = [...variants];
    newVariants[index][e.target.name] = e.target.value;
    setVariants(newVariants);
  };

  const addVariant = () => setVariants([...variants, { size: '', price: '', countInStock: '' }]);
  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    data.append('variants', JSON.stringify(variants));
    for (const image of images) data.append('images', image);

    try {
      await axios.post('http://localhost:5000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      alert('Product added successfully!');
      resetForm();
      setRefreshProducts(prev => !prev);
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to add product.');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category._id,
      gender: product.gender,
      subCategory: product.subCategory || '',
    });
    setVariants(product.variants);
    setExistingImages(product.images);
    setImages([]);
    setImagePreviews([]);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    data.append('variants', JSON.stringify(variants));
    for (const image of images) data.append('newImages', image);
    for (const imageUrl of existingImages) data.append('existingImages', imageUrl);

    try {
      await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      alert('Product updated successfully!');
      resetForm();
      setRefreshProducts(prev => !prev);
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Failed to update product.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      alert('Product deleted successfully!');
      setRefreshProducts(prev => !prev);
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product.');
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', brand: '', category: '', gender: '', subCategory: '' });
    setVariants([{ size: '', price: '', countInStock: '' }]);
    setImages([]);
    setImagePreviews([]);
    setExistingImages([]);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" className="w-full p-2 border rounded-md" required />
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full p-2 border rounded-md" required />
        <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Brand" className="w-full p-2 border rounded-md" required />

        {/* Category */}
       {/* Category */}
<select
  name="category"
  value={formData.category}
  onChange={(e) => {
    if (e.target.value === "new") {
      setShowCategoryForm(true);
      setFormData({ ...formData, category: "" });
    } else {
      setShowCategoryForm(false);
      handleInputChange(e);
    }
  }}
  className="w-full p-2 border rounded-md"
  required
>
  <option value="">Select Category</option>
  {categories.map(cat => (
    <option key={cat._id} value={cat._id}>{cat.name}</option>
  ))}
  <option value="new">+ Create New Category</option>
</select>

{/* Show new category form if selected */}
{showCategoryForm && (
  <div className="p-4 border rounded-md bg-gray-50 mt-2">
    <h3 className="text-lg font-semibold mb-2">Add New Category</h3>
    <input
      type="text"
      placeholder="Category Name"
      value={newCategoryName}
      onChange={(e) => setNewCategoryName(e.target.value)}
      className="w-full p-2 border rounded-md mb-2"
    />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        setNewCategoryImage(file);
        setNewCategoryImagePreview(URL.createObjectURL(file));
      }}
      className="w-full p-2 border rounded-md mb-2"
    />
    {newCategoryImagePreview && (
      <img src={newCategoryImagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-md mb-2" />
    )}
    <button
      type="button"
      onClick={async () => {
        try {
          const token = localStorage.getItem("token");
          const data = new FormData();
          data.append("name", newCategoryName);
          if (newCategoryImage) data.append("image", newCategoryImage);

          const res = await axios.post("http://localhost:5000/api/categories", data, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
          });

          alert("Category created!");
          setCategories([...categories, res.data]);
          setFormData({ ...formData, category: res.data._id });
          setShowCategoryForm(false);
          setNewCategoryName("");
          setNewCategoryImage(null);
          setNewCategoryImagePreview(null);
        } catch (err) {
          console.error(err);
          alert("Failed to create category");
        }
      }}
      className="bg-green-600 text-white px-4 py-2 rounded-md"
    >
      Save Category
    </button>
  </div>
)}


        {/* Gender */}
        <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-2 border rounded-md" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
        </select>

        {/* SubCategory */}
        <input
          type="text"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleInputChange}
          placeholder="Sub Category (e.g., Sneakers, Boots)"
          className="w-full p-2 border rounded-md"
        />

        {/* Variants */}
        <h3 className="text-lg font-semibold">Product Variants</h3>
        {variants.map((variant, index) => (
          <div key={index} className="flex space-x-2">
            <input type="text" name="size" value={variant.size} onChange={(e) => handleVariantChange(index, e)} placeholder="Size" className="w-full p-2 border rounded-md" required />
            <input type="number" name="price" value={variant.price} onChange={(e) => handleVariantChange(index, e)} placeholder="Price" className="w-full p-2 border rounded-md" required />
            <input type="number" name="countInStock" value={variant.countInStock} onChange={(e) => handleVariantChange(index, e)} placeholder="Inventory" className="w-full p-2 border rounded-md" required />
            <button type="button" onClick={() => removeVariant(index)} className="bg-red-500 text-white p-2 rounded-md">-</button>
          </div>
        ))}
        <button type="button" onClick={addVariant} className="bg-gray-200 text-gray-800 p-2 rounded-md">Add Variant</button>

        {/* Images */}
        <h3 className="text-lg font-semibold">Product Images</h3>
        <input type="file" name="images" multiple onChange={handleImageChange} className="w-full p-2 border rounded-md" />
        <div className="flex flex-wrap space-x-2 mt-2">
          {existingImages.map((url, idx) => (
            <div key={`ex-${idx}`} className="relative">
              <img src={url} alt="" className="h-24 w-24 object-cover rounded-md" />
              <button type="button" onClick={() => handleRemoveImage(idx, true)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-6 w-6">&times;</button>
            </div>
          ))}
          {imagePreviews.map((preview, idx) => (
            <div key={`new-${idx}`} className="relative">
              <img src={preview} alt="" className="h-24 w-24 object-cover rounded-md" />
              <button type="button" onClick={() => handleRemoveImage(idx, false)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-6 w-6">&times;</button>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
        {editingProduct && (
          <button type="button" onClick={resetForm} className="w-full bg-gray-400 text-white p-2 rounded-md">Cancel</button>
        )}
      </form>

      {/* Existing Products */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Existing Products</h2>
      <div className="space-y-4">
        {products.map(product => (
          <div key={product._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
            <div className="flex items-center space-x-4">
              <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <span className="font-semibold">{product.name} - {product.brand}</span>
                <p className="text-sm text-gray-600">Category: {product.category?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">Gender: {product.gender} | Sub: {product.subCategory || 'N/A'}</p>
                <p className="text-sm text-gray-600">Variants: {product.variants.map(v => `${v.size}(₹${v.price})`).join(', ')}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEditClick(product)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
