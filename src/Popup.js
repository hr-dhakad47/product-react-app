import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useParams } from 'react-router-dom';

function Popup() {

    const { productId } = useParams();

    const [msg, setMsg] = useState({});
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [rating, setRating] = useState("");
    const [stock, setStock] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://e-commerce-roan-sigma.vercel.app/productsList/${productId}`);
          setMsg(response.data);
          setId(response.data.id || ""); 
          setTitle(response.data.title || ""); 
          setDescription(response.data.description || "");
          setPrice(response.data.price || ""); 
          setDiscountPercentage(response.data.discountPercentage || ""); 
          setRating(response.data.rating || ""); 
          setStock(response.data.stock || ""); 
          setBrand(response.data.brand || ""); 
          setCategory(response.data.category || ""); 
          setThumbnail(response.data.thumbnail || ""); 


        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData(); 
    }, [productId]); 
      
      const handleUpdate = async () => {
        try {
          await axios.put(`https://e-commerce-roan-sigma.vercel.app/updateProduct/${productId}`,{id , title, description ,price, discountPercentage, rating, stock, brand, category, thumbnail});
          window.location.reload();
        } catch (error) {
          console.error('Product updation failed:', error);
        }
      };

  return (
    <div className='z-3 w-100 position-absolute top-50 start-50 translate-middle border shadow-lg  p-4 rounded-3 bg-black bg-gradient'>
    <div className="input-group mb-3">
          <input type="text" value={msg.id} onChange={(e) => setId(e.target.value)} className="form-control m-1 floatingInput"  placeholder="id"/>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control m-1 floatingInput"  placeholder="title"/>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control m-1 floatingInput"  placeholder="description"/>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control m-1 floatingInput"  placeholder="price"/>
          <input type="text" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="form-control m-1 floatingInput"  placeholder="discountPercentage"/>
          <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control m-1 floatingInput"  placeholder="rating"/>
          <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} className="form-control m-1 floatingInput"  placeholder="stock"/>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="form-control m-1 floatingInput"  placeholder="brand"/>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control m-1 floatingInput"  placeholder="category"/>
          <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="form-control m-1 floatingInput"  placeholder="thumbnail"/>
      </div>
      <div className='d-flex justify-content-end'>
          <Link to="/">
          <button onClick={handleUpdate} className="btn m-2 btn-outline-success" type="submit"> Save </button>
          </Link>
          <Link to="/">
            <button className="btn m-2 btn-outline-danger" type="button">Cancle</button>
          </Link>
      </div>    
      <Outlet/>
      </div>
  )
}

export default Popup;