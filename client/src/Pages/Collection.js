import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Product from "../Components/product";
import { useDispatch, useSelector } from "react-redux";
import { searchToggle } from "../redux/searchSlice";
import { getProducts } from "../Api/ProductApi";

const Collection = () => {
  const [filters, setFilters] = useState({
    categories: [],
    types: [],
  });

  const searchD = useSelector((state) => state.search);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const searchDisaplay = () => {
    dispatch(searchToggle());
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      const existingValues = prevFilters[name];
      if (checked) {
        return { ...prevFilters, [name]: [...existingValues, value] };
      } else {
        return {
          ...prevFilters,
          [name]: existingValues.filter((val) => val !== value),
        };
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = filters.categories.length
      ? filters.categories.includes(product.category)
      : true;
    const typeMatch = filters.types.length
      ? filters.types.includes(product.subCategory)
      : true;
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  });

  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <Header active1="" active2="active" active3="" active4="" />
        <hr className="w-full" />
        <div
          className={`w-full flex ${searchD.display} justify-center items-center py-5 bg-gray-50 border-b-[1px] gap-2 `}
          id="search"
        >
          <div className="flex justify-center items-center w-[50%] h-[38px] border-[1px] border-gray-400 rounded-[50px] ">
            <input
              type="text"
              className="outline-none w-[90%] h-[38px] text-sm bg-transparent"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="bx bx-search text-[22px] text-text translate-y-[2px] cursor-pointer"></i>
          </div>
          <i
            className="bx bx-x text-[25px] text-text cursor-pointer"
            onClick={searchDisaplay}
          ></i>
        </div>
        <div className="w-full flex flex-col md:flex-row py-10 justify-between">
          <div className="w-full md:w-[18%] flex flex-col gap-6 mb-5">
            <p className="text-[20px] text-title">FILTERS</p>
            <form className="w-full flex flex-col border-[1px] border-gray-300 py-3 pl-5 gap-[7px]">
              <p className="text-[14px] text-title">CATEGORIES</p>
              {["Men", "Women", "Kids"].map((category) => (
                <div className="flex gap-1" key={category}>
                  <input
                    type="checkbox"
                    value={category}
                    name="categories"
                    onChange={handleCheckboxChange}
                  />
                  <label className="text-text text-[14px]">{category}</label>
                </div>
              ))}
            </form>
            <form className="w-full flex flex-col border-[1px] border-gray-300 py-3 pl-5 gap-[7px]">
              <p className="text-[14px] text-title">TYPE</p>
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <div className="flex gap-1" key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    name="types"
                    onChange={handleCheckboxChange}
                  />
                  <label className="text-text text-[14px]">{type}</label>
                </div>
              ))}
            </form>
          </div>
          <div className="w-full md:w-[79%] flex flex-col gap-6">
            <div className="flex flex-row items-center gap-2">
              <p className="text-text text-2xl">
                ALL <span className="text-title">COLLECTIONS</span>
              </p>
              <span className="w-[40px] h-[2px] bg-title border-none" />
            </div>
            <div className="w-full flex flex-wrap justify-center md:justify-start gap-4">
              {filteredProducts.map((product) => (
                <Product
                  key={product._id}
                  id={product._id}
                  image={product.images}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
        <p className="text-title text-[15px] pt-4">
          Copyright 2024@ greatstack.dev - All Right Reserved.
        </p>
      </div>
    </section>
  );
};

export default Collection;
