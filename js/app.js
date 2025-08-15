"use strict;"

// Constructor function
function Order(mealName, mealPrice, mealImage) {
  this.mealName = mealName;
  this.mealPrice = mealPrice;
  this.mealImage = mealImage;
}

// Meals data (name -> price & image)
const mealsData = {
  "Chicken Nuggets": {
    price: "3.5 JD",
    image: "https://joyfoodsunshine.com/wp-content/uploads/2021/08/healthy-homemade-chicken-nuggets-recipe-7.jpg"
  },
  "Broasted Chicken": {
    price: "5 JD",
    image: "https://www.chocolatesandchai.com/wp-content/uploads/2022/04/Al-Baik-Fried-Chicken-Featured.jpg"
  },
  "Chicken Burrito": {
    price: "4 JD",
    image: "https://www.thechickenrecipes.co.uk/wp-content/uploads/2024/05/how-to-make-chicken-burrito.jpg"
  },
  "Chicken Tacos": {
    price: "3.5 JD",
    image: "https://www.joyousapron.com/wp-content/uploads/2023/08/bbq-chicken-tacos-sq-pic.jpg"
  },
  "Chicken Shawerma": {
    price: "2.5 JD",
    image: "https://ministryofcurry.com/wp-content/uploads/2021/05/chicken-shawarma-6.jpg"
  },
  "Chicken Salad": {
    price: "2 JD",
    image: "https://littlespicejar.com/wp-content/uploads/2018/07/Crispy-Chicken-Salad-with-BBQ-Honey-Mustard-Dressing-11.jpg"
  }
};

const form = document.getElementById("orderForm");
const mealNameInput = document.getElementById("mealName");
const mealPriceInput = document.getElementById("mealPrice");
const mealImageInput = document.getElementById("mealImage");
const ordersTableBody = document.querySelector("#ordersTable tbody");
const clearBtn = document.getElementById("clearOrders");

let orders = [];

// Load from localStorage on page load
window.onload = function () {
  const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = savedOrders.map(o => new Order(o.mealName, o.mealPrice, o.mealImage));
  renderOrders();
};

// Update price and image fields when selecting meal
mealNameInput.addEventListener("change", function () {
  const selected = mealNameInput.value;
  if (mealsData[selected]) {
    mealPriceInput.value = mealsData[selected].price;
    mealImageInput.value = mealsData[selected].image;
  } else {
    mealPriceInput.value = "";
    mealImageInput.value = "";
  }
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const mealName = mealNameInput.value;
  const mealPrice = mealPriceInput.value;
  const mealImage = mealImageInput.value;

  if (!mealName || !mealPrice || !mealImage) return;

  const newOrder = new Order(mealName, mealPrice, mealImage);
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  renderOrders();
  form.reset();
});

// Render orders in the table
function renderOrders() {
  ordersTableBody.innerHTML = "";
  orders.forEach(order => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order.mealName}</td>
      <td>${order.mealPrice}</td>
      <td><img src="${order.mealImage}" alt="${order.mealName}"></td>
    `;

    ordersTableBody.appendChild(row);
  });
}

// Clear all orders
clearBtn.addEventListener("click", function () {
  localStorage.removeItem("orders");
  orders = [];
  renderOrders();
});