document.addEventListener("DOMContentLoaded", function () {
    const flavorOptions = {
        "Արևածաղիկ": ["Սովորական", "Աղի"],
        "Չիպս": ["Դասական", "Թթվասերի", "Պանրի", "Խորովածի", "Բեկոնի", "Լոլիկի"],
        "Պաղպաղակ": ["Կոն Շոկոլադային", "Կոն Վանիլային"],
        "Գարեջուր": ["Բաց", "Մուգ"],
        "Քաղցր ձողիկներ": ["Վանիլի", "Խտացրած կաթի", "Բանանի"],
        "Պահածո": ["Սմբուկի խավիար", "Աջիկա", "Ծիրանի ջեմ"],
        "Պոպկորն": ["Աղով", "Կարամելապատ"],
        "Մակարոն": ["Պերյա", "Սպիռալ", "Վերմիշել"],
    };

    const productPrices = {
        "Արևածաղիկ": 400,
        "Չիպս": 450,
        "Պաղպաղակ": 250,
        "Գարեջուր": 960,
        "Քաղցր ձողիկներ": 200,
        "Պահածո": 780,
        "Պոպկորն": 300,
        "Մակարոն": 430,
    };

    const popup = document.getElementById("popup");
    const quantityInput = document.getElementById("quantity");
    const flavorSelect = document.getElementById("flavor");
    const flavorContainer = document.getElementById("flavor-container");
    const addToCartBtn = document.getElementById("add-to-cart-btn");

    let currentProduct = "";
    let currentPrice = 0;

    // Ապրանքների զամբյուղում ավելացման կոդը
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            popup.style.display = "block"; // Հայտնվում է popup պատուհանը
            currentProduct = this.getAttribute("data-name"); // Ապրանքը ձեռք է բերվում
            currentPrice = productPrices[currentProduct]; // Գինը ստանում ենք ապրանքից

            // Մաքրել նախորդ համերը
            flavorSelect.innerHTML = "";

            if (flavorOptions[currentProduct]) {
                flavorContainer.style.display = "block"; // Համերի ընտրությունը հայտնվում է
                flavorOptions[currentProduct].forEach((flavor) => {
                    const option = document.createElement("option");
                    option.value = flavor;
                    option.textContent = flavor;
                    flavorSelect.appendChild(option);
                });
            } else {
                flavorContainer.style.display = "none"; // Եթե համ չկա, ապա թաքնվում է
            }
        });
    });

    // Զամբյուղում ապրանք ավելացնելու կոդը
    addToCartBtn.addEventListener("click", function () {
        const quantity = parseInt(quantityInput.value); // Քանակի ստացում
        const selectedFlavor = flavorSelect.value || ""; // Համի ընտրություն

        let productText = currentProduct;
        if (selectedFlavor) {
            productText += ` (${selectedFlavor})`; // Համը ավելացվում է ապրանքի անվանը
        }

        // Զամբյուղում ավելացմանը հաշվարկեք գինը
        const totalPrice = currentPrice * quantity;

        const cartList = document.getElementById("cart-items");
        const listItem = document.createElement("li");
        listItem.textContent = `${productText} - ${quantity} հատ - ${totalPrice} դրամ`; // Ապրանքը և գինը ավելացվում է զամբյուղ

        // Ապրանքի ջնջման կոճակը
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Ջնջել";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", function () {
            cartList.removeChild(listItem);
            updateTotalPrice(); // Թարմացնել ընդհանուր գինը
        });

        listItem.appendChild(removeBtn);
        cartList.appendChild(listItem);

        // Արժեքի թարմացում զամբյուղում
        updateTotalPrice();

        // Պատուհանը փակելու և դաշտերը մաքրելու կոդը
        popup.style.display = "none";
        quantityInput.value = 1;
    });

    // Զամբյուղի ընդհանուր արժեքի թարմացում
    function updateTotalPrice() {
        const cartItems = document.querySelectorAll("#cart-items li");
        let total = 0;

        cartItems.forEach((item) => {
            const priceText = item.textContent.split(' - ')[2]; // Գինը տեքստից բաժանում ենք
            const price = parseInt(priceText.replace(' դրամ', '')); // Հանում ենք 'դրամ' և ստանում գինը
            total += price;
        });

        document.getElementById("total-price").textContent = `${total} դրամ`; // Արժեքի թարմացում
    }

    // Popup պատուհանի փակումը
    document.getElementById("close-btn").addEventListener("click", function () {
        popup.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".category");

    function revealCategories() {
        categories.forEach(category => {
            const rect = category.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                category.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealCategories);
    revealCategories();
});
