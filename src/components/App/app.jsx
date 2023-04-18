import { useState, useEffect, useCallback } from "react";

import Footer from "../Footer/footer";
import Header from "../Header/header";
import Logo from "../Logo/logo";
import Search from "../Search/search";

import "./index.css";

import { SortContext } from "../../context/sortContext";
import SeachInfo from "../SeachInfo";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import { isLiked } from "../../utils/product";
import { IndexPage } from "../../pages/IndexPage/IndexPage";
import { ProductPage } from "./../../pages/ProductPage";
import { FavoritePage } from "../../pages/FavoritePage/favorite-page";
import { NotFoundPage } from "../../pages/NotFoundPage/not-found-page";
import { MainPage } from "../../pages/MainPage/MainPage";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTabId, setSelectedTabId] = useState("cheap");
  const [token, setToken] = useState(null);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api
      .search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult);
        setTotal(searchResult.length);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery]);

  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (tokenFromLS) {
      api.setToken(tokenFromLS);
      setToken(tokenFromLS);
    }
  }, []);

  useEffect(() => {
    if (token) {
      handleRequest();
    }
  }, [token, debounceSearchQuery]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
        const favoriteProducts = productsData.products.filter((item) =>
          isLiked(item.likes, userData._id)
        );
        setFavorites((prevSate) => favoriteProducts);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleFormSubmit = (inputText) => {
    navigate("/");
    setSearchQuery(inputText);
    handleRequest();
  };

  const handleProductLike = useCallback(
    (product) => {
      const liked = isLiked(product.likes, currentUser._id);
      return api.changeLikeProduct(product._id, liked).then((updateCard) => {
        const newProducts = cards.map((cardState) => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        });

        if (!liked) {
          setFavorites((prevState) => [...prevState, updateCard]);
        } else {
          setFavorites((prevState) =>
            prevState.filter((card) => card._id !== updateCard._id)
          );
        }

        setCards(newProducts);
        return updateCard;
      });
    },
    [currentUser, cards]
  );

  return (
    <SortContext.Provider value={{ selectedTabId, setSelectedTabId }}>
      <UserContext.Provider
        value={{
          user: currentUser,
          setCurrentUser,
          isLoading,
          token,
          setToken,
        }}
      >
        <CardContext.Provider
          value={{
            isLoading,
            setIsLoading,
            cards,
            setCards,
            favorites,
            handleLike: handleProductLike,
            setFavorites,
            searchQuery,
            setSearchQuery,
            total,
            setTotal,
          }}
        >
          <Header>
            <>
              <Logo className="logo logo_place_header" href="/" />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Search
                      onSubmit={handleFormSubmit}
                      onInput={handleInputChange}
                    />
                  }
                />
              </Routes>
            </>
          </Header>
          <main className="content container">
            <SeachInfo searchText={searchQuery} />

            <Routes>
              <Route index element={<IndexPage />} />

              <Route
                path="/product/:productId"
                element={token && <ProductPage isLoading={isLoading} />}
              />
              <Route path="/signup" element={<MainPage />} />
              <Route path="/login" element={<MainPage />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </SortContext.Provider>
  );
}

export default App;
