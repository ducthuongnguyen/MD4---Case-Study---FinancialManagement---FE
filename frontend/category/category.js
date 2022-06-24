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

let editId = 0;

function showEditForm(id) {
    editId = id;
    $('#exampleModal').modal('show');
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/categories/" + id,
        success: function (category) {
            $("#category-type").val(category.parentCategory.id);
            $("#category-name").val(category.name);
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function getCategoryType() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/parent-categories",
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $(".category-type").html(str);
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function updateCategory(id) {
    id = editId;
    let name = document.getElementById("category-name").value;
    let type = document.getElementById("category-type").value;

    let category = {
        name: name,
        parentCategory: {
            id: type
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/categories?id=" + id,
        data: JSON.stringify(category),
        success: function () {
            showAllCategory()
        },
        error: function (error) {
            console.log(error)
        }
    })
}

// function getCategoryName() {
//     $.ajax({
//         type: "GET",
//         url: "http://localhost:8080/categories",
//         success: function (data) {
//             console.log("goi ham cat")
//             console.log(data)
//             let str = "";
//             for (let i = 0; i < data.length; i++) {
//                 str += `<option value="${data[i].id}">${data[i].name}</option>`
//             }
//             $("#name").html(str);
//         },
//         error: function (error) {
//             console.log(error)
//         }
//     })
// }

function showCreateForm() {
    $('#create').modal('show');
}

function createCategory() {
    let name = document.getElementById("name").value;
    let type = document.getElementById("type").value;
    let newCategory = {
        name: name,
        parentCategory: {
            id: type
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/categories",
        data: JSON.stringify(newCategory),
        success: showAllCategory(),
        error: function (error) {
            console.log(error)
        }
    });
}

getCategoryType()
showAllCategory()