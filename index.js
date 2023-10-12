const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const searchButton = document.getElementById("searchButton");
const pizzaIdInput = document.getElementById("pizzaId");
const form = document.querySelector('form');
const resultContainer = document.getElementById("resultContainer");

// LOCAL STORAGE
let lastPizzaId = localStorage.getItem('lastPizza') || null;

const saveLastPizzaId = () => {
    localStorage.setItem('lastPizza', lastPizzaId);
};

const createCard = (pizza) => {
    return `
        <div id="card" class="card">
            <img src="${pizza.imagen}" alt="${pizza.nombre}" class="card-img" />
            <h3>${pizza.nombre}</h3>
            <p class="parrafo">Precio: $${pizza.precio}</p>
            <p class="parrafo">Ingredientes: ${pizza.ingredientes.join(", ")}</p>
        </div>
    `;
};

const findPizzaById = (id) => {
    return pizzas.find((pizza) => pizza.id === parseInt(id, 10));
};

const displayPizza = (pizza) => {
    resultContainer.innerHTML = createCard(pizza);
};

// Restaura la última pizza al cargar la página
if (lastPizzaId) {
    const pizza = findPizzaById(lastPizzaId);
    if (pizza) {
        displayPizza(pizza);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pizzaId = pizzaIdInput.value;

    if (pizzaId.trim() !== "") {
        if (!isNaN(pizzaId)) {
            const pizza = findPizzaById(pizzaId);

            if (pizza) {
                lastPizzaId = pizza.id;
                saveLastPizzaId();
                displayPizza(pizza);
            } else {
                resultContainer.innerHTML = "La pizza " + pizzaId + " no fue encontrada. Recuerda que solo tenemos 5 tipos de pizza.";
                resultContainer.style.color = 'red';
                resultContainer.style.fontSize = '20px';
            }
        }
    } else {
        resultContainer.innerHTML = "Ingresa un número antes de buscar.";
        resultContainer.style.color = 'red';
        resultContainer.style.fontSize = '20px';
    }
});