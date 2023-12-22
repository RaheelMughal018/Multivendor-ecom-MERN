import React, { useEffect, useState } from "react";
import Header from "../components/layouts/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { productData } from "../static/data";

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const cateogryData = searchParams.get("category");

  useEffect(() => {
    if (cateogryData === null) {
      const d =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d =
        productData &&
        productData.filter((item) => item.category === cateogryData);
      setData(d);
    }
  }, [cateogryData]);
  return (
    <>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((i, index) => {
              return <ProductCard key={index} data={i} />;
            })}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">
            No Products Found!
          </h1>
        ) : null}
      </div>
    </>
  );
};

export default ProductPage;
