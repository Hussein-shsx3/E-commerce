import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Api/ProductApi";
import Product from "../Components/product";

const BestSellers = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-5">
      <p className="text-title text-3xl flex flex-row items-center gap-2">
        <span className="text-text">BEST </span> SELLERS{" "}
        <span className="w-[40px] h-[2px] bg-title border-none" />
      </p>
      <p className="text-text mt-2 text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the.
      </p>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 py-14">
        {products
          .filter((product) => product.isBestseller)
          .slice(0, 5)
          .map((product, index) => (
            <Product
              key={index}
              id={product._id}
              image={product.images[0]}
              name={product.name}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
};

export default BestSellers;
