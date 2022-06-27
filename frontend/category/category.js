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
                                            <td><button type="button" onclick="showEditForm(${categories[i].id})" class="btn btn-secondary"><i class="bi bi-pen"></i></button></td>
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
    document.getElementById("edit-btn").style.display = "none";
    editId = id;
    $('#exampleModal').modal('show');
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/categories/" + id,
        success: function (category) {
            $(".category-type").val(category.parentCategory.id);
            $("#category-name").val(category.name);
        },
        error: function () {
            alert("Error!!")
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
            alert("Edit successfully!")
            showAllCategory()
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function showCreateForm() {
    document.getElementById("create-btn").style.display = "none";
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
    $("#create").validate({
        rules: {
            name: {
                required: true
            }
        },
        submitHandler: function () {
            console.log("xxx")
        }
    });
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/categories",
        data: JSON.stringify(newCategory),
        success: function () {
            alert("Create successfully!")
            showAllCategory()
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function checkName() {
    let name = document.getElementById("name").value;
    if (name==""){
        document.getElementById("create-btn").style.display = "none";
        document.getElementById("name").style.borderColor="red";
    } else {
        document.getElementById("name").style.borderColor="green";
        document.getElementById("create-btn").style.display = "block";
    }
}

function checkEditName() {
    let categoryName = document.getElementById("category-name").value;
    if (categoryName==""){
        document.getElementById("edit-btn").style.display = "none";
        document.getElementById("category-name").style.borderColor="red";
    } else {
        document.getElementById("category-name").style.borderColor="green";
        document.getElementById("edit-btn").style.display = "block";
    }
}
getCategoryType()
showAllCategory()