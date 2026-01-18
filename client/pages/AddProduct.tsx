import { Layout } from '@/components/Layout/Layout';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'accessories',
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      addProduct({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        image: formData.image || undefined,
      });

      navigate('/products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        {/* Header */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Add Product</h1>
          <p className="text-slate-600">Create a new product for your store</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className={cn(
                  'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                  errors.name ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
                )}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={4}
                className={cn(
                  'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none',
                  errors.description ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
                )}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-slate-900 mb-2">
                Price (₦) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter product price"
                className={cn(
                  'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                  errors.price ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
                )}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-900 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white"
              >
                <option value="accessories">Accessories</option>
                <option value="peripherals">Peripherals</option>
                <option value="software">Software</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-slate-900 mb-2">
                Image URL (Optional)
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white"
              />
              {formData.image && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <img src={formData.image} alt="Preview" className="w-full h-48 object-cover" />
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'flex-1 py-2.5 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2',
                  isLoading
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:scale-105'
                )}
              >
                {isLoading && <Loader size={18} className="animate-spin" />}
                {isLoading ? 'Creating...' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="flex-1 py-2.5 rounded-lg font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
