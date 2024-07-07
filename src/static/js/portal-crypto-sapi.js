
//recibo el formulario
const cryptoform = document.getElementById("cryptoform");


//función agregar fila de crypto
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
  const symbolo = symbol;
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
  //botón de eliminar registro. funciona OK
  deleteButton.addEventListener("click", async () => {
    const response = await fetch(`/api/crypto/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    rmCryptoRow(data.id);
  });
  tableBody.appendChild(row);

  const editButton = row.querySelector(".edit-btn");
  editButton.addEventListener("click", async () => {
    cryptoform["crypto_edit"].value = `${id}`;
    cryptoform["crfor-name"].value = name;
    cryptoform["crfor-symbol"].vale = symbolo;
    cryptoform["crfor-price_usd"].value = price_usd;
  });
  tableBody.appendChild(row);
}

function rmCryptoRow(crypto_id) {
  const row = document.querySelector(`#crypto-${crypto_id}`);
  row.remove();
}

cryptoform.addEventListener("submit", async (event) => {
  event.preventDefault();

  const crypto_id= cryptoform["crypto_edit"].value;
  const crypto_name = cryptoform["crfor-name"].value;
  const crypto_symbol = cryptoform["crfor-symbol"].value;
  const crypto_price = cryptoform["crfor-price_usd"].value;
 // const crypto_lastupdate = new Date();

  const url = crypto_id !== "" ? `/api/crypto/${crypto_id}/put` : '/api/new_crypto';
  const method = crypto_id !== "" ? `PUT` : "POST";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  
    body: JSON.stringify({
      name: crypto_name,
      symbol: crypto_symbol,
      price_usd: crypto_price,
    }),
  });
  const data = await response.json();
  console.log(data)
  if (crypto_id !== "") {
    rmCryptoRow(data.id);
  }
  add_crypto(
    data.id,
    data.name,
    data.symbol,
    data.price_usd,
    data.last_updated,
    );

  //cryptoform.reset();
});

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/crypto");
  const data = await response.json();
  console.log(data) //prueba
  for (const crypto of data) {
    add_crypto(
      crypto.id,
      crypto.name,
      crypto.symbol,
      crypto.price_usd,
      crypto.last_updated,
    );
  }
});