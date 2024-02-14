// ================ OurProducts ==============
// ================ MenuButtons ==============
function showItems(value) {
    let buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
        if (value.toUpperCase() == btn.innerText.toUpperCase()) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll(".product__card");
    elements.forEach((element) => {
            if (element.classList.contains(value)) {
                element.classList.remove("hide");
            } else {
                element.classList.add("hide");
            }
        }
    )
}
window.onload = () => {
    showItems("all");
};

