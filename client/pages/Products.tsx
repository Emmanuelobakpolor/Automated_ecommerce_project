import { Layout } from '@/components/Layout/Layout';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Products() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Products</h1>
            <p className="text-slate-600">Manage your product catalog</p>
          </div>
          <button
            onClick={() => navigate('/products/new')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg transition-all text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Product Image */}
                {product.image && (
                  <div className="w-full h-40 bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-slate-900">₦{product.price.toLocaleString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                      className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <Edit size={18} />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 transition-colors px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <p className="text-slate-600 mb-4">
              {searchTerm ? 'No products found matching your search' : 'No products yet'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate('/products/new')}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 mx-auto"
              >
                <Plus size={18} />
                Create your first product
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
