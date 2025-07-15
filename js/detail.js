// Lấy phần tử chứa danh sách sản phẩm
const productList = document.querySelector("#productList")

// Hàm gọi API và render ra sản phẩm dưới dạng thẻ
const getProductList = async () => {
    try {
        const response = await axios.get("https://shop.cyberlearn.vn/api/Product")
        const products = response.data.content

        // Hiển thị danh sách bằng map + destructuring nếu muốn
        const html = products.map(product => {
            const { id, name, image, price } = product
            return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="product-card p-3 border rounded h-100 shadow-sm">
            <img src="${image}" alt="${name}" class="w-100 mb-3">
            <h5 class="fw-bold">${name}</h5>
            <p class="text-muted small">short description...</p>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <a href="detail.html?id=${id}" class="btn btn-warning">Buy now</a>
              <span class="fw-bold">${price}$</span>
            </div>
          </div>
        </div>
      `
        }).join("")

        productList.innerHTML = html

        // Sau khi render xong, bạn có thể xử lý thêm với querySelectorAll nếu muốn
        const productCards = document.querySelectorAll(".product-card")
        productCards.forEach(card => {
            card.addEventListener("mouseover", () => card.classList.add("shadow"))
            card.addEventListener("mouseout", () => card.classList.remove("shadow"))
        })

    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error)
        productList.innerHTML = `<p class="text-danger">Không thể tải sản phẩm! Vui lòng thử lại.</p>`
    }
}

// Gọi hàm chính
getProductList()


// Lấy id từ URL
const getProductIdFromURL = () => {
    const url = new URL(window.location.href)
    return url.searchParams.get("id")
}

const productDetailContainer = document.querySelector('#productDetail')
const relateContainer = document.querySelector('#relateProducts')

// Gọi API product theo ID
const getProductDetail = async (id) => {
    try {
        const response = await axios.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`)
        const product = response.data.content
        renderProductDetail(product)
        renderRelateProducts(product.relatedProducts)
    } catch (err) {
        productDetailContainer.innerHTML = `<p class="text-danger">Không tìm thấy sản phẩm!</p>`
    }
}

// Hiển thị chi tiết sản phẩm
const renderProductDetail = (product) => {
    const sizeButtons = product.size.map(size => {
        return `<button class="btn btn-outline-dark btn-sm me-2 mb-2">${size}</button>`
    }).join("")

    productDetailContainer.innerHTML = `
    <div class="row align-items-center">
      <div class="col-md-6">
        <img src="${product.image}" alt="${product.name}" class="w-100 rounded">
      </div>
      <div class="col-md-6">
        <h2>${product.name}</h2>
        <p class="text-muted">${product.description}</p>
        <div class="mb-3">
          <strong>Size:</strong><br>
          ${sizeButtons}
        </div>
        <h4 class="text-warning">${product.price}$</h4>
        <button class="btn btn-warning mt-3">Add to Cart</button>
      </div>
    </div>
  `
}

// Hiển thị các sản phẩm liên quan
const renderRelateProducts = (products) => {
    const html = products.map(item => {
        return `
      <div class="col-md-3 mb-4">
        <div class="border p-3 rounded bg-white h-100 text-center">
          <img src="${item.image}" class="w-100 mb-3" alt="${item.name}">
          <h6 class="fw-bold">${item.name}</h6>
          <p class="small text-muted">short desc...</p>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <a href="detail.html?id=${item.id}" class="btn btn-warning btn-sm">Buy now</a>
            <strong>${item.price}$</strong>
          </div>
        </div>
      </div>
    `
    }).join("")

    relateContainer.innerHTML = html
}

// Gọi khi load trang
const id = getProductIdFromURL()
if (id) {
    getProductDetail(id)
} else {
    productDetailContainer.innerHTML = `<p>Sản phẩm không hợp lệ!</p>`
}
