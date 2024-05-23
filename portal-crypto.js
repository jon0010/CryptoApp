document.addEventListener("DOMContentLoaded", () => {
  const cryptoContainer = document.getElementById("crypto-container");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const searchInput = document.querySelector(".input-search");
  const sortSelect = document.getElementById("sortSelect");
  let currentPage = 1;
  const itemsPerPage = 6;
  let currentCryptos = [];

  const fetchCryptos = async (page) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=${page}&sparkline=false`
      );
      const data = await response.json();
      currentCryptos = data;
      displayCryptos(currentCryptos);
    } catch (error) {
      console.error("Error fetching data from CoinGecko:", error);
    }
  };

  const displayCryptos = (cryptos) => {
    cryptoContainer.innerHTML = "";
    cryptos.forEach((crypto) => {
      const changeClass =
        crypto.price_change_percentage_24h < 0 ? "negative" : "positive";
      const cryptoCard = document.createElement("div");
      cryptoCard.className = "crypto-card";
      cryptoCard.innerHTML = `
                      <img src="${crypto.image}" alt="${crypto.name}">
                      <h2>${crypto.name}</h2>
                      <p>Price: $${crypto.current_price}</p>
                      <p>Market Cap: $${crypto.market_cap}</p>
                      <p class="${changeClass}">24h Change: ${crypto.price_change_percentage_24h}%</p>
                  `;
      cryptoContainer.appendChild(cryptoCard);
    });
  };

  const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCryptos = currentCryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm)
    );
    displayCryptos(filteredCryptos);
  };

  const handleSort = () => {
    const sortBy = sortSelect.value;
    let sortedCryptos = [...currentCryptos];
    if (sortBy === "asc") {
      sortedCryptos.sort((a, b) => a.current_price - b.current_price);
    } else if (sortBy === "desc") {
      sortedCryptos.sort((a, b) => b.current_price - a.current_price);
    }
    displayCryptos(sortedCryptos);
  };

  searchInput.addEventListener("input", handleSearch);
  sortSelect.addEventListener("change", handleSort);

  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchCryptos(currentPage);
    }
  });

  nextPageButton.addEventListener("click", () => {
    currentPage++;
    fetchCryptos(currentPage);
  });

  fetchCryptos(currentPage);
});
