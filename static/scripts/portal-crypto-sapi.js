
//recibo el formulario
const cryptoform = document.getElementById("cryptoform");


//función agregar crypto
function add_crypto(
  id,
  name,
  symbol,
  price_usd,
  last_updated
) {
  const tableBody = document.getElementById("crypto_table");

  const row = document.createElement("tr");
  row.id = `crypto-${id}`;
  row.innerHTML = `
        <td>${name}</td>
        <td>${symbol}</td>
        <td>${price_usd}</td>
        <td>${last_updated}</td>
        <td>
            <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            <button class="btn btn-warning btn-sm edit-btn">Editar</button>
        </td>
    `;

  const deleteButton = row.querySelector(".delete-btn");
  deleteButton.addEventListener("click", async () => {
    const response = await fetch(`http:/localhost:5000/api/crypto/<crypto_id>`, {
      method: "DELETE",
    });
    const data = await response.json();
    rmCryptoRow(data.id);
  });
  tableBody.appendChild(row);

  const editButton = row.querySelector(".edit-btn");
  editButton.addEventListener("click", async () => {
    cryptoForm["crypto-id"].value = crypto_id;
    cryptoForm["name"].value = name;
    cryptoform["symbol"].vale = symbol;
    cryptoForm["price_usd"].value = price_usd;
    cryptoForm["last_update"].valueAsDate = new Date(last_updated);
  });
  tableBody.appendChild(row);
}

function rmMovieRow(crypto_id) {
  const row = document.querySelector(`#crypto-${crypto_id}`);
  row.remove();
}

cryptoform.addEventListener("submit", async (event) => {
  event.preventDefault();

  const crypto_id= cryptoform["crypto-id"].value;
  const crypto_name = cryptoform["crfor-name"].value;
  const crypto_symbol = cryptoform["crfor-symbol"].value;
  const crypto_price = cryptoform["crfor-price_usd"].value;
  const crypto_lastupdate = new Date();

  const url = crypto_id !== "" ? `http://localhost:5000/api/crypto/${crypto_id}` : 'http://localhost:5000/api/new_crypto';
  const method = crypto_id !== "" ? `PUT` : "POST";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",

    body: JSON.stringify({
      name: crypto_name,
      symbol: crypto_symbol,
      price_usd: crypto_price,
      last_updated: crypto_lastupdate,
    }),
  });
  const data = await response.json();
  console.log(data)
  if (crypto_id !== "") {
    rmMovieRow(data.movie_id);
  }
  addMovieRow(
    data.id,
    data.name,
    data.symbol,
    data.price_usd,
    data.last_updated,
    );

  //cryptoform.reset();
});
/*
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:5000/api/crypto");
  const data = await response.json();
  for (crypto of data) {
    addMovieRow(
      crypto.id,
      crypto.name,
      crypto.symbol,
      crypto.price_usd,
      crypto.last_updated,
    );
  }
});*/