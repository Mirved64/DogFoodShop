const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor() {
    this._baseUrl = "https://api.react-learning.ru";
    this._headers = {
      "content-type": "application/json",
    };
  }

  setToken(token) {
    this._headers = {
      "content-type": "application/json",
      Authorization: token,
    };
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(onResponce);
  }

  signUp(email, group, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, group, password }),
    }).then(onResponce);
  }

  getProductList() {
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
    }).then(onResponce);
  }

  getProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, {
      headers: this._headers,
    }).then(onResponce);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(onResponce);
  }

  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(dataUser),
    }).then(onResponce);
  }

  search(searchQuery) {
    return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
      headers: this._headers,
    }).then(onResponce);
  }

  changeLikeProduct(productId, isLike) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(onResponce);
  }

  getUserById(userId) {
    return fetch(`${this._baseUrl}/users/${userId}`, {
      headers: this._headers,
    }).then(onResponce);
  }

  addProductRewiew(productId, newReview) {
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(newReview),
    }).then(onResponce);
  }
}

const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMjY1NzU5Yjk4YjAzOGY3N2IyMGYiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzAwMTg5LCJleHAiOjE3MDcyMzYxODl9.3g3J4NWBJWJdqe1QKr_aLIBf_VMKyo0r0dkEr04l7EE",
  },
};

const api = new Api(config);

export default api;
