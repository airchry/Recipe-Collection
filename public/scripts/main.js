window.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("ingredientCard");
    const ingredientList = card.querySelector("ol");

    if (ingredientList && ingredientList.children.length > 0) {
        card.style.display = "block";
    } else {
        card.style.display = "flex";
    }
});