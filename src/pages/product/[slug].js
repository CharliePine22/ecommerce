import React, { useState } from "react";
import { client, urlFor } from "../../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../../components";
import { useStateContext } from "../../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const { decreaseQuantity, increaseQuantity, quantity, onAdd, setShowCart } =
    useStateContext();
  const [index, setIndex] = useState(0);

  const handleBuyNow = () => {
    onAdd(product, quantity);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
              style={{
                objectFit: image[index].asset._ref.slice(-3) == "jpg" && "fill",
              }}
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                key={item._key}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                style={{
                  objectFit:
                    image[index].asset._ref.slice(-3) == "jpeg" && "cover",
                }}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div style={{ marginTop: "5px" }}>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar color={"black"} />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={() => decreaseQuantity()}>
                <AiOutlineMinus />
              </span>
              <span className="num">{quantity}</span>
              <span className="plus" onClick={() => increaseQuantity()}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, quantity)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  console.log(products.length);
  try {
    const paths = products.map((product) => ({
      params: {
        slug: product.slug.current,
      },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (e) {
    console.log(e);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  console.log("FETCHING PRODUCT");
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  console.log(product);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
