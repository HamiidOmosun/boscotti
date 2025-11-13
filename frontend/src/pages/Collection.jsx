import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import React, { useContext, useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products = [] } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Toggle category selection
  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory(prev => (prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]));
  };

  // Toggle subcategory selection
  const toggleSubCategory = (e) => {
    const val = e.target.value;
    setSubCategory(prev => (prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]));
  };

  // Apply category & subCategory filters (does not sort)
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    return productsCopy;
  };

  // Sort given array (or current filterProducts) and set state
  const sortProducts = (arr) => {
    const list = Array.isArray(arr) ? [...arr] : [...filterProducts];

    switch (sortType) {
      case 'low-high':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        // 'relevant' or unknown -> do nothing (keep current order)
        break;
    }

    setFilterProducts(list);
  };

  // When products (from context) change, initialize filterProducts
  useEffect(() => {
    // initial load — show all products (then apply sorting if needed)
    const base = products.slice();
    setFilterProducts(base);
  }, [products]);

  // When filters change, apply filters and then sort the result
  useEffect(() => {
    const filtered = applyFilter();
    // After filtering, apply sorting to the filtered list
    sortProducts(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory, sortType, products]);

  // Note: above effect also depends on sortType so we don't need a separate effect for sorting-only.
  // If you prefer separate concerns, you could split them (filter effect and sort effect).

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* Filter options */}
      <div className="min-w-60">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          <p>FILTERS</p>
          <img
            className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`}
            src={assets.dropdown_icon}
            alt="Toggle filter"
          />
        </div>

        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 items-center">
              <input
                className="w-3"
                type="checkbox"
                value="Men"
                onChange={toggleCategory}
                checked={category.includes('Men')}
              />
              <span>Men</span>
            </label>
            <label className="flex gap-2 items-center">
              <input
                className="w-3"
                type="checkbox"
                value="Women"
                onChange={toggleCategory}
                checked={category.includes('Women')}
              />
              <span>Women</span>
            </label>
            <label className="flex gap-2 items-center">
              <input
                className="w-3"
                type="checkbox"
                value="Unisex"
                onChange={toggleCategory}
                checked={category.includes('Unisex')}
              />
              <span>Unisex</span>
            </label>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 items-center">
              <input
                className="w-3"
                type="checkbox"
                value="Perfumes"
                onChange={toggleSubCategory}
                checked={subCategory.includes('Perfumes')}
              />
              <span>Perfumes</span>
            </label>
            <label className="flex gap-2 items-center">
              <input
                className="w-3"
                type="checkbox"
                value="Deodorants"
                onChange={toggleSubCategory}
                checked={subCategory.includes('Deodorants')}
              />
              <span>Deodorants</span>
            </label>
            <label className="flex gap-2 items-center">
              <input
                className="w-3"
                type="checkbox"
                value="Sprays"
                onChange={toggleSubCategory}
                checked={subCategory.includes('Sprays')}
              />
              <span>Spray</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 ">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product sort */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id ?? item.id}
              name={item.name}
              id={item._id ?? item.id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
