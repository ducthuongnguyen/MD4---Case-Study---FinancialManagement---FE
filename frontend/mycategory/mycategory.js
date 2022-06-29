function showExpenseCategories() {
    let str = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/categories/category-by-user",
        success: function (categories) {
            console.log("------------------")
            console.log(categories)
            for (let i = 0; i < categories.length; i++) {
                str += `<tr>
                                            <td>${i + 1}</td>
                                            <td>${categories[i].name}</td>
                    <td style="color: red">-${categories[i].total.toLocaleString()}</td>
                    </tr>`
            }
            document.getElementById("content").innerHTML = str;
        },
        error: function (error) {
            console.log(error)
        }
    });
}

showExpenseCategories()
