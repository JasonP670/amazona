import React from 'react'
import Product from '../components/Product'
import data from '../data'


export default function HomeScreen() {
  return (
    <div className="row center">
      {
        data.products.map(item => (
          <Product  key={item._id} item={item}/>
        ))
      }
    </div>
  )
}
