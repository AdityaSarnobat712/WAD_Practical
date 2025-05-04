const products = [
    {
      image: 'https://i.imgur.com/kB1GqB8.png',
      name: 'Wireless Headphones',
      price: '₹7,999',
      description: 'Noise-cancelling over-ear headphones.'
    },
    {
      image: 'https://i.imgur.com/x8rZ3Hv.png',
      name: 'Smartwatch',
      price: '₹12,999',
      description: 'Fitness tracking smartwatch.'
    },
    {
      image: 'https://i.imgur.com/C97HfZ1.png',
      name: 'Gaming Mouse',
      price: '₹2,499',
      description: 'Ergonomic gaming mouse.'
    },
    {
      image: 'https://i.imgur.com/0nZMg4Z.png',
      name: 'Laptop Stand',
      price: '₹1,999',
      description: 'Adjustable aluminium stand.'
    },
    // Add more products as needed (total > 10 for pagination demo)
  ];
  
  const itemsPerPage = 4;
  let currentPage = 1;
  
  function displayProducts() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = products.slice(start, end);
  
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
  
    currentItems.forEach(product => {
      const row = `
        <tr>
          <td><img src="${product.image}" alt="${product.name}"></td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.description}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  
    const totalPages = Math.ceil(products.length / itemsPerPage);
    document.getElementById("pageIndicator").innerText = `Page ${currentPage} of ${totalPages}`;
  }
  
  function changePage(direction) {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    currentPage += direction;
  
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
  
    displayProducts();
  }
  
  window.onload = displayProducts;
  