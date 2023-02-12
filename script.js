let productsAvailable = JSON.parse(localStorage.getItem("productsList"));
let searchValue = document.getElementById("searchVal");
if (!productsAvailable) {
  const products = [
    {
      productId: "01",
      productName: "laptop",
      productImg:
        "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
      productPrice: "25000",
      productDesc: "this is laptop",
    },
    {
      productId: "02",
      productName: "Lenevo Laptop",
      productImg:
        "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
      productPrice: "45999",
      productDesc: "this is a good lenovo laptop",
    },
    {
      productId: "03",
      productName: "Cricket Bat",
      productImg:
        "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
      productPrice: "499",
      productDesc: "this is good willow cricket bat",
    },
    {
      productId: "04",
      productName: "laptop",
      productImg:
        "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
      productPrice: "25000",
      productDesc: "this is laptop",
    },
  ];
  localStorage.setItem("productsList", JSON.stringify(products));
  fetchFromStorage();
}

fetchFromStorage();

function fetchFromStorage() {
  //getting from local storage

  let productsRecieved = JSON.parse(localStorage.getItem("productsList"));

  for (let i = 0; i < productsRecieved.length - 1; i++) {
    const parentProductDisplay = document.querySelector(".displayProducts");
    const clone = parentProductDisplay.cloneNode(true);
    parentProductDisplay.after(clone);
  }
  const id = document.querySelectorAll(".idP");
  const pName = document.querySelectorAll(".nameP");
  const img = document.querySelectorAll(".productImg");
  const price = document.querySelectorAll(".priceP");
  const desc = document.querySelectorAll(".descP");
  for (let i = 0; i < productsRecieved.length; i++) {
    id[i].textContent = productsRecieved[i].productId;
    pName[i].textContent = productsRecieved[i].productName.toUpperCase();
    img[i].src = productsRecieved[i].productImg;
    price[i].textContent = productsRecieved[i].productPrice;
    desc[i].textContent = productsRecieved[i].productDesc;
  }
}

function addedProduct() {
  letImgVal = "";

  let gId = localStorage.getItem("id");
  localStorage.setItem("id", +gId + 1);
  gId = localStorage.getItem("id");
  let changeBtn = document.querySelector(".addOrEditBtn");

  const sentProdId = document.querySelector(".apId");
  const sentProdName = document.querySelector(".apName");
  const sentProdImg = document.querySelector(".apImg");
  const sentProdPrice = document.querySelector(".apPrice");
  const sentProdDesc = document.querySelector(".apDesc");
  if (sentProdImg.value === "") {
    sentProdImg.value =
      "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100";
  }
  if (!sentProdName.value || !sentProdPrice.value || !sentProdDesc.value) {
    return alert("Kindly Enter All Details Of Product");
  }
  if (isNaN(sentProdPrice.value)) {
    return alert("Please enter Numeric value");
  }
  const addProdObj = {
    productId: `${gId}`,
    productName: sentProdName.value,
    productImg: sentProdImg.value,
    productPrice: sentProdPrice.value,
    productDesc: sentProdDesc.value,
  };
  // ;
  if (changeBtn.value === "Save Changes") {
    let myProducts = JSON.parse(localStorage.getItem("productsList"));

    for (let i = 0; i < myProducts.length; i++) {
      if (myProducts[i].productId === sentProdId.value) {
        myProducts[i].productName = sentProdName.value;
        myProducts[i].productImg = sentProdImg.value;
        myProducts[i].productPrice = sentProdPrice.value;
        myProducts[i].productDesc = sentProdDesc.value;
      }
    }

    localStorage.setItem("productsList", JSON.stringify(myProducts));
    changeBtn.value = "Add Product";
    document.querySelector(".productsForm").reset();
  } else {
    productsAvailable.push(addProdObj);
    localStorage.setItem("productsList", JSON.stringify(productsAvailable));
  }
  location.reload();
}

// const pes=previousElementSibling
let dispProducts = document.querySelectorAll(".displayProducts");
for (let prod of dispProducts) {
  prod.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.classList.contains("edit")) {
      const IdInp = document.querySelector(".apId");
      const prodNameInp = document.querySelector(".apName");
      const imgInp = document.querySelector(".apImg");
      const prodPriceInp = document.querySelector(".apPrice");
      const prodDescInp = document.querySelector(".apDesc");
      let currSelectedId =
        e.target.previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent;
      let myProducts = JSON.parse(localStorage.getItem("productsList"));

      for (let i = 0; i < myProducts.length; i++) {
        if (myProducts[i].productId === currSelectedId) {
          IdInp.value = myProducts[i].productId;
          prodNameInp.value = myProducts[i].productName;
          imgInp.value = myProducts[i].productImg;
          prodPriceInp.value = myProducts[i].productPrice;
          prodDescInp.value = myProducts[i].productDesc;
          let changeBtn = document.querySelector(".addOrEditBtn");
          changeBtn.value = "Save Changes";
        }
      }
    }
    if (e.target.classList.contains("delete")) {
      let currSelectedId =
        e.target.previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.textContent;
      console.log(currSelectedId);
      let myProducts = JSON.parse(localStorage.getItem("productsList"));
      for (let i = 0; i < myProducts.length; i++) {
        if (myProducts[i].productId === currSelectedId) {
          myProducts.splice(i, 1);
        }
      }
      localStorage.setItem("productsList", JSON.stringify(myProducts));
      location.reload();
    }
  });
}

function sortProducts() {
  let items = document.querySelectorAll(".displayProducts");
  if (document.getElementById("h2l").checked) {
    Array.from(items)
      .sort(function (a, b) {
        a = ~~a.querySelector(".priceP").innerText;
        b = ~~b.querySelector(".priceP").innerText;
        return b - a;
      })
      .forEach(function (n, i) {
        n.style.order = i;
      });
    setTimeout(() => {
      document.getElementById("h2l").checked = false;
    }, 1000);
  }
  if (document.getElementById("l2h").checked) {
    Array.from(items)
      .sort(function (a, b) {
        a = ~~a.querySelector(".priceP").innerText;
        b = ~~b.querySelector(".priceP").innerText;
        return a - b;
      })
      .forEach(function (n, i) {
        n.style.order = i;
      });
    setTimeout(() => {
      document.getElementById("l2h").checked = false;
    }, 1000);
  }
  if (document.getElementById("byName").checked) {
    Array.from(items)
      .sort(function (a, b) {
        a = a.querySelector(".nameP").innerText.toLowerCase();
        b = b.querySelector(".nameP").innerText.toLowerCase();
        return (a > b) - (a < b);
      })
      .forEach(function (n, i) {
        n.style.order = i;
      });
    setTimeout(() => {
      document.getElementById("byName").checked = false;
    }, 1000);
  }
  if (document.getElementById("byId").checked) {
    Array.from(items)
      .sort(function (a, b) {
        a = ~~a.querySelector(".idP").innerText;
        b = ~~b.querySelector(".idP").innerText;
        return a - b;
      })
      .forEach(function (n, i) {
        n.style.order = i;
      });
    setTimeout(() => {
      document.getElementById("byId").checked = false;
    }, 1000);
  }
}

function searchProduct() {
  let input = searchValue.value;
  input = input.toLowerCase().trim();
  let product = document.getElementsByClassName("displayProducts");
  for (i = 0; i < product.length; i++) {
    if (!product[i].innerHTML.toLowerCase().trim().includes(input)) {
      product[i].style.display = "none";
    } else {
      product[i].style.display = "inline-block";
    }
  }
}
