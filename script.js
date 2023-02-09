let productsAvailable = JSON.parse(localStorage.getItem("productsList"));

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
  ];
  //setting to local strorage
  localStorage.setItem("productsList", JSON.stringify(products));
  fetchFromStorage();
} else {
  fetchFromStorage();
}

function fetchFromStorage() {
  //getting from local storage

  const productsRecieved = JSON.parse(localStorage.getItem("productsList"));
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
    id[i].textContent += productsRecieved[i].productId;
    pName[i].textContent += productsRecieved[i].productName;
    img[i].src = productsRecieved[i].productImg;
    price[i].textContent += productsRecieved[i].productPrice;
    desc[i].textContent += productsRecieved[i].productDesc;
  }
}

function addedProduct() {
  //   console.log(ID);

  //   ID = ID + 1;
  let gId = localStorage.getItem("id");
  localStorage.setItem("id", +gId + 1);
  gId = localStorage.getItem("id");
  let changeBtn = document.querySelector(".addOrEditBtn");

  const sentProdId = document.querySelector(".apId");
  const sentProdName = document.querySelector(".apName");
  // const sentProdImg = document.querySelector("");
  const sentProdPrice = document.querySelector(".apPrice");
  const sentProdDesc = document.querySelector(".apDesc");
  const addProdObj = {
    productId: `${gId}`,
    productName: sentProdName.value,
    productImg:
      "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    productPrice: sentProdPrice.value,
    productDesc: sentProdDesc.value,
  };

  if (changeBtn.value === "Save Changes") {
    let myProducts = JSON.parse(localStorage.getItem("productsList"));

    for (let i = 0; i < myProducts.length; i++) {
      if (myProducts[i].productId === sentProdId.value) {
        myProducts[i].productName = sentProdName.value;
        // myProducts[i].productImg = sentProdImg.value;
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
      // const IdInp=document.querySelector(".apId")
      const prodPriceInp = document.querySelector(".apPrice");
      const prodDescInp = document.querySelector(".apDesc");
      let currSelectedId =
        e.target.nextElementSibling.nextElementSibling.textContent.slice(11);
      let myProducts = JSON.parse(localStorage.getItem("productsList"));

      for (let i = 0; i < myProducts.length; i++) {
        if (myProducts[i].productId === currSelectedId) {
          IdInp.value = myProducts[i].productId;
          prodNameInp.value = myProducts[i].productName;
          prodPriceInp.value = myProducts[i].productPrice;
          prodDescInp.value = myProducts[i].productDesc;
          let changeBtn = document.querySelector(".addOrEditBtn");
          changeBtn.value = "Save Changes";
        }
      }
    }
    if (e.target.classList.contains("delete")) {
      let currSelectedId = e.target.nextElementSibling.textContent.slice(11);
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