document.addEventListener("DOMContentLoaded", () => {
  let searchBtn = document.querySelector("button");
  let searchItem = document.querySelector("#input");

  const filterProducts = (products, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter(product => {
      return (
        product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.price.toString().includes(lowerCaseSearchTerm)
      );
    });
  };

  const fakeStoreData = async (event) => {
    event.preventDefault(); // Prevent the form from submitting
    let inputedData = searchItem.value.trim();
    if (!inputedData) return; // If the input is empty, do nothing

    const products = await fetchProducts();
    const filteredProducts = filterProducts(products, inputedData);
    renderProducts(filteredProducts);

    // Clear the input field after search
    searchItem.value = "";
  };

  const fetchProducts = async () => {
    try {
      let response = await fetch(`https://fakestoreapi.com/products`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const generateProductCard = (product) => {
    return `
      <div class="card1">
        <img id="image" src="${product.image}" alt="${product.title}">
        <div class="divider"></div>
        <div class="info">
          <h1 id="title">${product.title}</h1>
          <p id="description">
            ${product.description.split(" ").splice(0, 20).join(" ")}...
          </p>
          <div class="price">
            <h2 id="price">${product.price} $</h2>
          </div>
        </div>
      </div>`;
  };

  const renderProducts = (products) => {
    let container = document.querySelector(".container");
    container.innerHTML = ""; // Clear the container first
    if (products.length === 0) {
      container.innerHTML = "<h1>No products found matching your search.</h1>";
    } else {
      products.forEach(product => {
        container.innerHTML += generateProductCard(product);
      });
    }
  };

  let allProducts = []; // To store all fetched products

  (async () => {
    allProducts = await fetchProducts();
    renderProducts(allProducts); // Initially render all products
  })();

  searchBtn.addEventListener("click", fakeStoreData);
});
