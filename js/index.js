// Lấy phần tử chứa danh sách sản phẩm
const productList = document.querySelector("#productList")

// Hàm gọi API và render ra sản phẩm dưới dạng thẻ
const getProductList = async () => {
    try {
        const response = await axios.get("https://shop.cyberlearn.vn/api/Product")
        const products = response.data.content

        // Hiển thị danh sách bằng map + destructuring
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