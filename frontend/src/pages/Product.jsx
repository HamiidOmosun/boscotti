import RelatedProducts from '../components/RelatedProducts';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart = '' } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(''); // main image
  const [size, setSize] = useState('');

  useEffect(() => {
    // Scroll to top whenever the product changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset main image and size
    setImage('');
    setSize('');

    const product = products.find(
      (item) => item._id === productId || item.id === productId
    );

    if (product) {
      setProductData(product);
      setImage(Array.isArray(product.image) ? product.image[0] : product.image);
    } else {
      setProductData(null);
    }
  }, [productId, products]);

  if (!productData)
    return <div className="py-20 text-center text-xl">Product not found</div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* Thumbnails */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index + 1}`}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border border-gray-300"
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto border border-gray-200"
              src={image}
              alt="Main product"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3 h-3" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`py-2 px-4 bg-gray-100 cursor-pointer border ${
                    item === size ? 'border-amber-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button onClick={() => addToCart(productData._id, size)} className="bg-black w-1/2 text-white px-3 py-3 text-sm active:bg-gray-700 cursor-pointer">
              ADD TO CART
            </button>

            <hr className="mt-8 sm:w-4/5" />

            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% original product</p>
              <p>Cash on delivery is available</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 text-sm mr-3">Description</p>
          <p className="border px-5 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora nemo, 
            consequuntur repellendus omnis aspernatur, ducimus nihil rem animi...
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
