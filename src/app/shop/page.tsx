"use client";
import ProductsListing from "@/components/shop/ProductsListing";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const isBrowser = typeof window !== "undefined";

const Shop = () => {
  const [searchedInputValue, setSearchedInputValue] = useState<string>("");
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [showPreviousSearches, setShowPreviousSearches] =
    useState<boolean>(false);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  useEffect(() => {
    const search = localStorage.getItem("search");
    const parsedSearch = search ? JSON.parse(search) : [];

    if (!previousSearches.length) {
      setPreviousSearches(parsedSearch);
    }
  }, []);

  useEffect(() => {
    if (isBrowser) {
      localStorage.removeItem("orderData");
    }
  }, []);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedInputValue = e.target.value;

    const searchMatch = previousSearches.filter((search) => {
      if (search.includes(searchedInputValue)) {
        return search;
      }
    });

    setPreviousSearches(searchMatch);
    setSearchedInputValue(searchedInputValue);
  };

  const handleSearch = () => {
    const search = localStorage.getItem("search");
    const parsedSearch = search ? JSON.parse(search) : [];

    if (searchedInputValue) {
      const alreadySearched = parsedSearch.find(
        (search: string) => search === searchedInputValue
      );
      if (!alreadySearched) {
        const searchesWithNew = [...parsedSearch, searchedInputValue];
        localStorage.setItem("search", JSON.stringify(searchesWithNew));
        setPreviousSearches(searchesWithNew);
      }
    }

    setSearchedValue(searchedInputValue);
  };

  return (
    <>
      <div>
        {/* ShopHero */}
        <div className="relative lg:mt-6 mt-16">
          {/* Yellow Glow */}
          <div className="absolute bottom-32 left-[20%] blur-[120px]">
            <div className="absolute z-10 w-[1000px] h-[605px] bg-[#fce7db] rounded-full blur-lg" />
          </div>
          <div className="relative z-20 grid md:grid-cols-3 items-center sm:mt-0 mt-6">
            <div className="">
              <Image
                src={"/images/shop1.png"}
                alt="Skylaboo"
                width={300}
                height={300}
                className="md:h-auto min-[520px]:h-full h-[100px] w-auto md:static absolute left-0 bottom-0 "
              />
            </div>
            <div className="relative z-30 flex justify-center items-center lg:mb-0 mb-6">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-georgia">Shop Now</h1>
                <p className="text-center my-3">
                  Find the perfect outfit and essentials for every <br />{" "}
                  magical moment.
                </p>

                <div className="relative mt-3 flex items-center bg-white rounded-full sm:w-[350px] w-[90%] px-4">
                  <input
                    type="text"
                    placeholder="Search"
                    id="search"
                    name="search"
                    value={searchedInputValue}
                    onChange={handleChangeSearchValue}
                    onFocus={() => setShowPreviousSearches(true)}
                    onBlur={() => setShowPreviousSearches(false)}
                    className="w-full text-sm py-2 border-none outline-none"
                  />
                  <button onClick={handleSearch}>
                    <Search color="#5C5C5C" size={18} />
                  </button>

                  {showPreviousSearches && (
                    <div className="mt-2 absolute z-50 top-[100%] left-0 w-full rounded-2xl bg-white">
                      {previousSearches.map((search, index) => (
                        <div
                          key={index}
                          className={`${
                            index !== 0 && "border-t"
                          } border-gray-400 px-4 py-2`}
                        >
                          <p>{search}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end h-full">
              <Image
                src={"/images/shop2.png"}
                alt="Skylaboo"
                width={300}
                height={300}
                className="md:h-auto min-[520px]:h-full md:static absolute right-0 bottom-0 h-[100px] w-auto"
              />
            </div>
          </div>
        </div>
        <ProductsListing searchTerm={searchedValue} />
      </div>
    </>
  );
};

export default Shop;
