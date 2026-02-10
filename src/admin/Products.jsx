import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Upload } from 'lucide-react';
import { 
  useGetAllProductsQuery,
  useCreateProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation 
} from '../services/dummyApi';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { getImageUrl } from '@/lib/utils';

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { data: productsData, isLoading, error } = useGetAllProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [newProduct, setNewProduct] = useState({
    name: '', description: '', category: '', price: '', discountPrice: '', stock: '', brand: '', tags: '', isFeatured: false,
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file && file.type.startsWith('image/'));
    setUploadedImages(prev => [...prev, ...validFiles]);
    // Generate preview for first image if none
    if (!imagePreview && validFiles.length > 0) {
      setImagePreview(URL.createObjectURL(validFiles[0]));
    }
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    if (uploadedImages.length <= 1) setImagePreview(null);
  };

  // Helper to get displayable image src
  const getImageSrc = (img) => getImageUrl(img, 'https://via.placeholder.com/50');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('category', newProduct.category);
      formData.append('price', parseFloat(newProduct.price));
      if (newProduct.discountPrice) formData.append('discountPrice', parseFloat(newProduct.discountPrice));
      formData.append('stock', parseInt(newProduct.stock));
      if (newProduct.brand) formData.append('brand', newProduct.brand);
      formData.append('tags', newProduct.tags);
      formData.append('isFeatured', newProduct.isFeatured);

      if (editMode && editingProduct) {
        // Keep existing server images (strings starting with /uploads)
        const existingImages = uploadedImages.filter(img => typeof img === 'string');
        formData.append('existingImages', JSON.stringify(existingImages));
        // Append new file uploads
        uploadedImages.filter(img => img instanceof File).forEach(file => formData.append('images', file));
        await updateProduct({ id: editingProduct._id, formData }).unwrap();
      } else {
        uploadedImages.filter(img => img instanceof File).forEach(file => formData.append('images', file));
        await createProduct(formData).unwrap();
      }
      resetForm(); setShowModal(false);
    } catch (err) {
      console.error('Failed to save product:', err);
      alert(err?.data?.message || 'Failed to save product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    setEditMode(true); setEditingProduct(product);
    setNewProduct({
      name: product.name, description: product.description || '', category: product.category,
      price: product.price.toString(), discountPrice: product.discountPrice?.toString() || '',
      stock: product.stock.toString(), brand: product.brand || '', tags: product.tags?.join(', ') || '',
      isFeatured: product.isFeatured || false,
    });
    setUploadedImages(product.images || []); setImagePreview(product.images?.[0] || null);
    setShowModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try { await deleteProduct(id).unwrap(); }
      catch (err) { console.error('Failed to delete product:', err); alert(err?.data?.message || 'Failed to delete product.'); }
    }
  };

  const resetForm = () => {
    setNewProduct({ name: '', description: '', category: '', price: '', discountPrice: '', stock: '', brand: '', tags: '', isFeatured: false });
    setUploadedImages([]); setImagePreview(null); setEditMode(false); setEditingProduct(null);
  };

  const filteredProducts = productsData?.data?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Food', 'Health', 'Toys', 'Other'];

  if (isLoading) return <div className="flex h-64 items-center justify-center"><p className="text-muted-foreground">Loading products...</p></div>;
  if (error) return <div className="flex h-64 items-center justify-center"><p className="text-destructive">Error loading products. Please try again later.</p></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>
        <Button onClick={() => { resetForm(); setShowModal(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No products found. Add your first product to get started.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={getImageSrc(product.images?.[0])} alt={product.name} className="h-10 w-10 rounded-lg object-cover bg-muted" />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          {product.brand && <div className="text-xs text-muted-foreground">{product.brand}</div>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{product.category}</TableCell>
                    <TableCell>
                      <div className="font-medium">Rs. {product.price.toLocaleString()}</div>
                      {product.discountPrice && <div className="text-xs text-muted-foreground line-through">Rs. {product.discountPrice.toLocaleString()}</div>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.stock > 20 ? 'default' : product.stock > 10 ? 'secondary' : 'outline'}>
                        {product.stock} in stock
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditProduct(product)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteProduct(product._id)} disabled={isDeleting}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={showModal} onOpenChange={(open) => { if (!open) { setShowModal(false); resetForm(); } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>{editMode ? 'Update the product details below.' : 'Fill in the details to add a new product.'}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddProduct} className="space-y-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="rounded-lg border-2 border-dashed p-4">
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="imageUpload" />
                <label htmlFor="imageUpload" className="flex cursor-pointer flex-col items-center justify-center">
                  <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                  <p className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                </label>
                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="group relative">
                        <img src={getImageSrc(img)} alt={`Upload ${index + 1}`} className="h-20 w-full rounded object-cover" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="productName">Product Name *</Label>
                <Input id="productName" required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea id="description" required rows={3} value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={newProduct.category} onValueChange={(val) => setNewProduct({ ...newProduct, category: val })}>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (Rs.) *</Label>
                <Input id="price" type="number" required min="0" step="0.01" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountPrice">Discount Price (Rs.)</Label>
                <Input id="discountPrice" type="number" min="0" step="0.01" value={newProduct.discountPrice} onChange={(e) => setNewProduct({ ...newProduct, discountPrice: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input id="stock" type="number" required min="0" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" placeholder="e.g., trending, new, bestseller" value={newProduct.tags} onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={newProduct.isFeatured} onCheckedChange={(checked) => setNewProduct({ ...newProduct, isFeatured: checked })} />
                  <span className="text-sm font-medium">Feature this product</span>
                </label>
              </div>
            </div>

            <DialogFooter className="gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? 'Saving...' : (editMode ? 'Update Product' : 'Add Product')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
