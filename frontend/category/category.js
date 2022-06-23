function showAllCategory() {
    let str = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/categories",
        success: function (categories) {
            console.log(categories)
            for (let i = 0; i < categories.length; i++) {
                str += `<tr>
                                            <td>${i + 1}</td>
                                            <td>${categories[i].name}</td>
                                            <td>${categories[i].parentCategory.name}</td>
                                            <td><button type="button" onclick="showEditForm(${categories[i].id})">Edit</button></td>
                                        </tr>`;
            }
            document.getElementById("category").innerHTML = str;
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function showEditForm(id) {
    $('#exampleModal').modal('show');
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/categories/" + id,
        success: function (category) {
            $("#category-name").val(category.name);
        },
        error: function (error) {
            error
        }
    });
}

function getCategory() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/parent-categories",
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $("#category-type").html(str);
        }
    })
}

function editCategory() {
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/categories?id=" + id,
    })
}

getCategory()
showAllCategory()