function displayTable(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        content += `<tr>
                       <th scope="row">${i + 1}</th>
                       <th><a href="#" >${data[i].name}</a></th>
                       <td>${data[i].moneyAmount.toLocaleString()}</td>
                       <td>${data[i].moneyType.name}</td>
                       <td>
                            <button type="button" class="btn btn-success" onclick="showEditWallet(${data[i].id})"><i class="bi bi-pen-fill"></i></button>
                            <button type="button" class="btn btn-success" onclick="deleteWallet(${data[i].id})"><i class="bi bi-trash3-fill"></i></button>
                       </td>
     </tr>`
    }
    $("#listWallet").html(content);
}

function showEditWallet(id) {
    $("#editWallet").modal('show');
    let token = window.sessionStorage.getItem("TOKEN_KEY");
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8081/wallets/"+id,
        success: function (data) {
            $("#idEdit").val(data.id);
            $("#nameEdit").val(data.name);
            $("#iconEdit").val(data.icon);
            $("#moneyAmountEdit").val(data.moneyAmount);
            $("#moneyTypeEdit").val(data.moneyType.id);
        }, error: function (err) {
            console.log("error: ", err);
        }
    })
}

function showCreateWallet() {
    $("#addWallet").modal('show');
}
function editWallet() {
    $('#editWallet').modal('hide');
    let IdUser = window.sessionStorage.getItem("IDUSER_KEY");
    let token = window.sessionStorage.getItem("TOKEN_KEY");
    let id = $("#idEdit").val();
    let name = $("#nameEdit").val();
    let icon = $("#iconEdit").val();
    let moneyAmount = $("#moneyAmountEdit").val();
    let moneyType = $("#moneyTypeEdit").val();
    let appUser = IdUser;
    let obj = {
        name: name,
        icon: icon,
        moneyType: {
            id: moneyType
        },
        moneyAmount: moneyAmount,
        appUser: {
            id: appUser
        }
    }
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8081/wallets/editWallet/" +id ,
        data: JSON.stringify(obj),
        success: function (data) {
            console.log(data)
            alert("Edit successfully!")
            showListWallet();
        },
        error: function (error) {
            console.log(error)
        }

    });
}
function showListWallet() {
    // let data = window.sessionStorage.getItem('data');
    // let id = JSON.parse(data.id);
    // console.log(JSON.parse(data.id));
    let token = window.sessionStorage.getItem("TOKEN_KEY");
    let IdUser = window.sessionStorage.getItem("IDUSER_KEY");
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8081/wallets/findByUser/"+IdUser,
        success: function (data) {
            console.log("a", data)
            displayTable(data);
        }, error: function (err) {
            console.log("error: ", err);
        }
    })
}


function getMoneyType() {
    let content = "<option selected>Choose Money Type...</option>";
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/moneytypes",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                content += `<option value='${data[i].id}'>${data[i].name}</option>`;
            }
            $("#moneyType").html(content);
        }, error: function (err) {
            console.log(err);
        }

    })

}

function getMoneyTypeEdit() {
    let content = "<option selected>Choose Money Type...</option>";
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/moneytypes",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                content += `<option value='${data[i].id}'>${data[i].name}</option>`;
            }
            $("#moneyTypeEdit").html(content);
        }, error: function (err) {
            console.log(err);
        }

    })

}

getMoneyTypeEdit();




function deleteWallet(id) {
    let token = window.sessionStorage.getItem("TOKEN_KEY");
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "DELETE",
        url: "http://localhost:8081/wallets/" + id,
        success: showListWallet
    })
}

function findByWalletName() {
    let name = $("#searchName").val();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8081/wallets/findByName/" + name,
        success: function (data) {
            displayTable(data);
        }
    })

}


getMoneyType();
showListWallet();
findIdUser();
