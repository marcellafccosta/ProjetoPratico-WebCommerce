//URL da API
const apiURL = 'https://diwserver.vps.webdock.cloud/products';

// Cria os cards skeleton
function createSkeletonCard() {
  return `
    <section class="tela">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <img class="img-fluid">
          </div>
          <div class="col-md-8">
            <h2></h2>
            <p></p>
            <div class="rating pb-3">
              <i class="fa-solid fa-star" style="color: #fce7ed;"></i>
              <i class="fa-solid fa-star" style="color: #fce7ed;"></i>
              <i class="fa-solid fa-star" style="color: #fce7ed;"></i>
              <i class="fa-solid fa-star" style="color: #fce7ed;"></i>
              <i class="fa-solid fa-star" style="color: #000000;"></i>
              <i>(2836)</i>
            </div>
            <p></p>
            <button class="btn btn-outline-light">Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Cria os cards e popula com informações da response
function createProductCard(product) {
  return `
    <section class="tela">
    <a href="index.html"><img src="../assets/bejeweled.png" class="logo" alt="logo" width="150"></a>
   
      <div class="container">
      
        <div class="row">
        
          <div class="col-md-4">
          
          <img src="${product.image}" alt="Imagem do Produto" class="img-fluid"> 
            

            
        </a>

          </div>
          <div class="col-md-7">
            <h2>${product.title}</h2>
            <p>${product.category}</p>
            <div class="rating pb-3">
              <i class="fa-solid fa-star" style="color: #fce7ed;"></i>
              <i class="fa-solid fa-star" style="color: #fce7ed;"></i>
              <i class="fa-solid fa-star" style="color: #fce7ed;"></i>
              <i class="fa-solid fa-star" style="color: #fce7ed;"></i>
              <i class="fa-solid fa-star" style="color: #000000;"></i>
              <i>(2836)</i>
            </div>
            <p>${product.price} USD</p>
            <button id="carrinho" class="btn btn-outline-light">Adicionar ao carrinho</button>
        
          </div>
        </div>
      </div>
    </section>
  `;
}




$(document).ready(function () {
  // Adiciona um evento de clique nos botões de adicionar ao carrinho
  $(document).on('click', '.btn-outline-light', function () {
    const productTitle = $(this).siblings('h2').text();
    alert(`${productTitle} adicionado ao carrinho!`);
  });


});


// Busca os produtos
async function fetchProducts(searchTerm = '') {
  try {
    const urlParams = new URLSearchParams(location.search);
    const productId = urlParams.get('id');
    const data = await fetch(`${apiURL}/${productId}`).then(res => res.json());
    console.table(data);
    return data?.products || data;
  } catch (error) {
    renderError();
    console.error(error);
  }
}

// Troca os skeletons pelos cards de produtos
async function displayProducts(searchTerm = '') {
  const product = await fetchProducts(searchTerm);
  const productsDiv = $('.container');
  productsDiv.empty(); // Limpa o conteúdo anterior
  productsDiv.append(createProductCard(product));
}

// Função para criar os skeletons
// recebe o número de skeletons como parâmetro
function renderSkeletons(skeletonQuantity) {
  const productsDiv = $('.container');
  productsDiv.empty(); // Limpa o conteúdo anterior
  for (let i = 0; i < skeletonQuantity; i++) {
    productsDiv.append(createSkeletonCard());
  }
}

// Função para renderizar mensagem de erro
function renderError() {
  const productsDiv = $('.container');
  productsDiv.empty(); // Limpa o conteúdo anterior
  productsDiv.append(`
    <div class="col-12">
      <h2 class="text-center">Erro no servidor. Tente novamente.</h2>
    </div>
  `);
}

displayProducts();
