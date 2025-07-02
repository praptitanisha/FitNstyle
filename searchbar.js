 const productsData = [
  { name: "Top", price: 550, category: "Women", image: "./imagee.jpg/phto.avif" },
  { name: "Crop Top", price: 450, category: "Women", image: "./imagee.jpg/blue.avif" },
  { name: "Kurti", price: 600, category: "Women", image: "./imagee.jpg/OIP (2).jpeg" },
  { name: "Jeans", price: 950, category: "Women", image: "./imagee.jpg/jeanwomen.avif" },
  { name: "Shirt", price: 800, category: "Men", image: "./imagee.jpg/male model2.jpeg" },
  { name: "Gown", price: 1350, category: "Special", image: "./imagee.jpg/model7.jpeg" },
  { name: "Sari", price: 1750, category: "Special", image: "./imagee.jpg/sari5.jpeg" },
  { name: "Jacket", price: 1000, category: "Men", image: "./imagee.jpg/malemodel2.jpeg" }
];

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const productList = document.getElementById('productList');

  function displayProducts(products) {
    productList.innerHTML = '';

    if (products.length === 0) {
      productList.innerHTML = '<p>No matching products found.</p>';
      return;
    }

    products.forEach(prod => {
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}" style="width:100%; height:150px; object-fit:cover; border-radius:10px;">
        <h4>${prod.name}</h4>
        <p>Rs.${prod.price}</p>
        <p style="font-size: small; color: gray;">${prod.category}</p>
      `;
      productList.appendChild(div);
    });
  }

  searchInput.addEventListener('input', function () {
    const term = searchInput.value.toLowerCase().trim();
    if (term === '') {
      productList.innerHTML = ''; // Hide products if input is empty
      return;
    }

    const filtered = productsData.filter(p => p.name.toLowerCase().includes(term));
    displayProducts(filtered);
  });
});

