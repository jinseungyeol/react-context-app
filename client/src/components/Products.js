import React from 'react'

const Products = ({ name, imagePath, updateItemCount }) => {
  console.log(name, imagePath)

  const handleChange = (event) => {
    const currentValue = event.target.value;
    updateItemCount(name, currentValue)
  }

  return (
    <div className="appleCard productCard">
      <div className="productImageContainer">
        <img
          className="productImage"
          src={`${process.env.PUBLIC_URL}${imagePath}`}
          alt={`${name} product`}
        />
      </div>
      <div className="productContent">
        <h3 className="productName">{name}</h3>
        <div className="productForm">
          <label className="productLabel" htmlFor={`${name}-quantity`}>
            수량
          </label>
          <input
            className="appleInput productInput"
            type='number'
            id={`${name}-quantity`}
            name='quantity'
            min='0'
            defaultValue={0}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Products