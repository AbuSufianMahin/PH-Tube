function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

        // converting response(promise) to json
        .then((res) => res.json())

        // displaying category arr from data using showCategories
        .then((data) => showCatagories(data.categories))
}

function showCatagories(categoryArr){
    // getting the parent element
    const categoryContainer = document.getElementById("category-container");
    
    for (let catName of categoryArr){
        // creating child element
        const catDiv = document.createElement("div");

        
        // putting a buttton inside the individual category div (child element)
        const categoryName = catName.category;
        const catId = catName.category_id;
        catDiv.innerHTML = `
        <div onclick="loadCategoryVideos(${catId})" id="btn-${catId}" class="btn btn-sm hover:bg-red-500 hover:text-white">${categoryName}</div> 
        `
        categoryContainer.appendChild(catDiv)
    }

}
loadCategories();