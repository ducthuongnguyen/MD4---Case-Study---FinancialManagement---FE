function showExpenseCategories() {
    let str = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/categories/category-by-user",
        success: function (categories) {
            for (let i = 0; i < categories.length; i++) {
                str += `<tr>
                                            <td>${i + 1}</td>
                                            <td>${categories[i].name}</td>`
                if (categories[i].name == "EXPENSE") {
                    str += `<td style="color: red">-${categories[i].total.toLocaleString()}</td>`
                } else {
                    str += `<td style="color: green">+${categories[i].total.toLocaleString()}</td>`
                }
                str += `</tr>`
            }
            document.getElementById("content").innerHTML = str;
        },
        error: function (error) {
            console.log(error)
        }
    });
}

showExpenseCategories()
