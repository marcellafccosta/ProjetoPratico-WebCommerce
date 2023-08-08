// Verifica se o preço do produto está dentro do range selecionado
function isPriceMatch(price, priceRange) {
  if (priceRange === '') {
    return true; // All prices match
  } else if (priceRange === '0-1000') {
    return price >= 0 && price <= 1000;
  } else if (priceRange === '1001-2000') {
    return price >= 1001 && price <= 2000;
  } else if (priceRange === '2000+') {
    return price > 2000;
  }
}

// Verifica se a categoria do produto é a mesma selecionada
function isCategoryMatch(productCategory, selectedCategory) {
  if (selectedCategory === '') {
    return true; // All categories match
  } else {
    return productCategory === selectedCategory;
  }
}

// Combina os filtros de preço e categoria
function filterProducts(priceRange, selectedCategory) {
  const productsDiv = $('#products');
  const productCards = productsDiv.children();

  productCards.hide(); //adiciona display: none no css dos cards

  productCards.each(function () {
    //this é cada productCard
    const priceText = $(this).find('.price').text();
    const price = parseFloat(priceText);
    const productCategory = $(this).data('category');

    const priceMatch = isPriceMatch(price, priceRange);

    // const categoryMatch = isCategoryMatch(productCategory, selectedCategory);
    // A função isCategoryMatch é equivalente a:

    const categoryMatch = selectedCategory === '' || productCategory === selectedCategory;

    if (priceMatch && categoryMatch) {
      $(this).show(); //remove o display: none do css dos cards
    }
  });
}

// Popula o select com as categorias
function populateCategories(categories) {
  // Localiza o <select> de categorias
  const categorySelect = $('#categoryFilter');

  // Adiciona os <option> com as categorias
  categories.forEach(function (category) {
    categorySelect.append(`<option value="${category}">${category}</option>`);
  });
}

// Adiciona o eventListener para o select de preço
$('#priceFilter').change(function () {
  const selectedPriceRange = $(this).val();
  const selectedCategory = $('#categoryFilter').val();
  filterProducts(selectedPriceRange, selectedCategory);
});

// Adiciona o eventListener para o select de categoria
$('#categoryFilter').change(function () {
  const selectedPriceRange = $('#priceFilter').val();
  const selectedCategory = $(this).val();
 // filterProducts(selectedPriceRange, selectedCategory);
 displayProductsByCategory(selectedCategory)
});

// Adiciona o eventListener para o botão de busca
$('#searchButton').click(function () {
  //searchTerm = paris
  const searchTerm = $('#searchInput').val();
  displayProducts(searchTerm);
});

// Adiciona o eventListener para o input de busca
// ao digitarmos ENTER, executa a busca.
$("#searchInput").keyup(function (event) {
  if (event.keyCode === 13) {
    const searchTerm = $('#searchInput').val();
    displayProducts(searchTerm);
  }
});

// Busca a lista de categorias da API
async function initializeCategories() {
  try {
    const response = await fetch(`${apiURL}/categories`);
    const categories = await response.json();
    populateCategories(categories);
  } catch (error) {
    console.error(error);
  }
}

initializeCategories();
