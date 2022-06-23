function showExpenseCategories() {
    let str = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/categories/category-by-user",
        success: function (categories) {
            for (let i = 0; i < categories.length; i++) {
                str += `<tr>
                                            <td>${i+1}</td>
                                            <td>${categories[i].name}</td>
                                            <td>${categories[i].total}</td>
                                        </tr>`;
            }
            document.getElementById("content").innerHTML = str;
        },
        error: function (error) {
            console.log(error)
        }
    });
}

    showExpenseCategories()
