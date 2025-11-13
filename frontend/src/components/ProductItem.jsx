import { ShopContext } from '../context/ShopContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext);

  // Safe image handling for products with single or multiple images
  const displayImage = Array.isArray(image) ? image[0] : image;

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>

      <div className="w-full h-48 overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover object-center"
          src={displayImage}
          alt={name}
        />
      </div>

      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>

    </Link>
  )
}

export default ProductItem
