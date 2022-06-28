function findAllWallet() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/wallets",
        success: function (data) {
            let content = `<tr>
                        <th>Wallet</th>
                        <th>Amount</th>
                    </tr>`;
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
            <td><a href="#" onclick="findAllTransactionByWallet(${data[i].id})">${data[i].name}</a></td>
            <td>${data[i].moneyAmount}</a></td>
        </tr>`;
            }
            document.getElementById("display").innerHTML = content;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function showCreateForm() {
    $.ajax({
        type: "GET", url: "http://localhost:8081/wallets",
        success: function (wallet) {
            let content = "";
            for (let i = 0; i < wallet.length; i++) {
                content += `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Create New Product</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
<!--                            <form id="createProduct">-->
                                     
                                      <div class="input-group mb-3">
                                        <span class="input-group-text">Wallet</span>` + `<select class=\"form-select\" aria-label=\"Default select example\" id=\"wallet\">` + getCategory(wallet) + `</select>` + `</div>` +

                    `<span style="color: red" id="childCategoryVali"></span>
                                        <input id="check" hidden>
                                        <div class="input-group mb-3">
                            <button style="width: 232px" type="button" class="btn btn-danger btn-md" onclick="getExpense()">Expense</button>` + `<button style="width: 232px" type="button" class="btn btn-success btn-md" onclick="getIncome()">Income</button>
                                </div>` +

                    `<div id="showCategory"></div>` +

                    `<span style="color: red" id="amountVali"></span>
                                <div class="input-group mb-3">
                                
                                    <span class="input-group-text">Amount</span>
                                    <input pattern="[-+]?[0-9]" title="Username should only contain lowercase letters. e.g. john" type="number" class="form-control" placeholder="Enter the amount..." aria-label="name" aria-describedby="basic-addon1" id="moneyAmount">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Note</span>
                                    <textarea type="text" class="form-control" placeholder="Enter the note..." aria-label="price" aria-describedby="basic-addon1" id="note"></textarea>
                                </div>
                            
<!--                            </form>-->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" onclick="createNewTransaction()">Save</button>
                        </div>
                    </div>
                </div>
            </div>`
            }
            document.getElementById("display1").innerHTML = content;
        }
    })

}

showCreateForm();

function getCategory(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += `<option value="${data[i].id}">${data[i].name}</option>`
    }
    return str;
}

function createNewTransaction() {

    let wallet = document.getElementById("wallet").value;
    let childCategory = document.getElementById("childCategory").value;
    if (childCategory === "") {
        document.getElementById("childCategoryVali").innerHTML = "Category not empty";
    }
    let moneyAmount = document.getElementById("moneyAmount").value;
    let note = document.getElementById("note").value;
    let pro = {

        wallet: {
            id: wallet
        }, childCategory: {
            id: childCategory
        }, moneyAmount: moneyAmount, note: note
    }
    $.ajax({
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8081/transactions/create',
        data: JSON.stringify(pro),
        success: function (data) {
            let id = data.wallet.id;
            let idChild = data.childCategory.id;
            $.ajax({
                type: "GET", url: "http://localhost:8081/wallets/" + id, success: function (wallet) {
                    $.ajax({
                        type: "GET", url: "http://localhost:8081/categories/" + idChild, success: function (child) {
                            let idParent = child.parentCategory.id;
                            let amountWallet = wallet.moneyAmount;
                            let amountWalletNew;
                            let amountNew = data.moneyAmount;
                            if (idParent === 1) {
                                amountWalletNew = amountWallet - amountNew;
                            }
                            if (idParent === 2) {
                                amountWalletNew = amountWallet + amountNew;
                            }
                            let pro = {
                                id: id, name: wallet.name, icon: wallet.icon, moneyAmount: amountWalletNew, moneyType: {
                                    id: wallet.moneyType.id
                                }, appUser: {
                                    id: wallet.appUser.id
                                }
                            }

                            $.ajax({
                                headers: {
                                    'Accept': 'application/json', 'Content-Type': 'application/json',
                                },
                                type: 'PUT',
                                url: "http://localhost:8081/wallets/editWallet/" + id,
                                data: JSON.stringify(pro),
                                success: function () {
                                    console.log("check")
                                    // findAllTransaction();
                                    findAllTransactionByWallet(idWallet)
                                    findAllWallet();
                                    findAllWallet(idWallet);
                                },
                                error: function (error) {
                                    console.log(error)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function getExpense() {
    $.ajax({
        type: "GET", url: "http://localhost:8081/categories/getChildCategory/1",
        success: function (child1) {
            let str = `</div>
                                      <div class="input-group mb-3">
                                        <span class="input-group-text" style="color: red">Expense</span>` + `<select class=\"form-select\" aria-label=\"Default select example\" id= \"childCategory\">` + getCategory(child1) + `</select>` + `</div>`;
            document.getElementById("showCategory").innerHTML = str
        }

    })
}

function getIncome() {
    $.ajax({
        type: "GET", url: "http://localhost:8081/categories/getChildCategory/2", success: function (child2) {
            let str = `<div class="input-group mb-3">
                                        <span style="color: #0f5132" class="input-group-text">Income</span>` + `<select class=\"form-select\" aria-label=\"Default select example\" id=\"childCategory\">` + getCategory(child2) + `</select>` + `</div>`;
            document.getElementById("showCategory").innerHTML = str;
        }
    })
}

function findAllTransaction() {
    $.ajax({
        type: "GET", url: "http://localhost:8081/transactions", success: function (data) {
            console.log(data)
            display(data)
        }, error: function (error) {
            console.log(error);
        }
    })
}

function display(data) {
    let content = "";
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        content += getTransaction(data[i]);
    }
    document.getElementById("showTransaction").innerHTML = content;
}

function getTransaction(transaction) {
    let str = "";
    str = `<tr>
            <td>${transaction.wallet.name}</td>  
            <td>${transaction.childCategory.name}</td>`
    if (transaction.childCategory.parentCategory.id == 1) {
        str += `<td style="color: red;">-${transaction.moneyAmount.toLocaleString()}</td>`
    } else {
        str += `<td style="color: green">+${transaction.moneyAmount.toLocaleString()}</td>`
    }
    str += `<td>${transaction.createdDate}</td>
            <td>${transaction.note}</td>
            <td>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo" onclick="showEditForm(${transaction.id})"><i class="bi bi-pen-fill"></i></button>
                </td>
            <td><button type="button" class="btn btn-success" onclick="deleteTransaction(${transaction.id})"><i class="bi bi-trash3-fill"></i></button></td>
        </tr>`
    return str;
}

let idEdit = 0;

function showEditForm(id) {
    idEdit = id;
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/transactions/" + id,
        success: function (transaction) {
            $("#wallet2").val(transaction.wallet.id);
            document.getElementById("wallet2").disabled = true;
            let idParent = transaction.childCategory.parentCategory.id
            if (idParent === 1) {
                document.getElementById("expense").style.display = "block";
                getExpense1();
                $("#childCategory1").val(transaction.childCategory.id);
                document.getElementById("income").style.display = "none";
                document.getElementById("expense").style.width = "100%";
            }
            if (idParent === 2) {
                document.getElementById("income").style.display = "block";
                getIncome1();
                $("#childCategory1").val(transaction.childCategory.id);
                document.getElementById("expense").style.display = "none";
                document.getElementById("income").style.width = "100%";
            }

            $("#moneyAmount2").val(transaction.moneyAmount);
            $("#note2").val(transaction.note);
        }
    })
}

function getWallet() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/wallets",
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $("#wallet2").html(str);
        }
    })
}

getWallet();

function deleteTransaction(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/transactions/" + id,
        success: function (transaction) {
            $.ajax({
                type: "DELETE", //tên API
                url: "http://localhost:8081/transactions/" + id, //xử lý khi thành công
                success: function () {
                    let amountWallet = transaction.wallet.moneyAmount;
                    let amountTransaction = transaction.moneyAmount;
                    let idParent = transaction.childCategory.parentCategory.id;
                    let amountNew;
                    if (idParent === 1) {
                        amountNew = amountWallet + amountTransaction;
                    }
                    if (idParent === 2) {
                        amountNew = amountWallet - amountTransaction;
                    }
                    let idWallet = transaction.wallet.id;
                    let name = transaction.wallet.name;
                    let icon = transaction.wallet.icon;
                    let moneyType = transaction.wallet.moneyType.id;
                    let appUser = transaction.wallet.appUser.id;

                    let pro = {
                        id: idWallet,
                        name: name,
                        icon: icon,
                        moneyAmount: amountNew,
                        moneyType: {
                            id: moneyType
                        }, appUser: {
                            id: appUser
                        }
                    }

                    $.ajax({
                        headers: {
                            'Accept': 'application/json', 'Content-Type': 'application/json',
                        },
                        type: 'PUT',
                        url: "http://localhost:8081/wallets/editWallet/" + idWallet,
                        data: JSON.stringify(pro),
                        success: function () {

                            findAllTransactionByWallet(idWallet);
                            findAllWallet(idWallet);
                            alert("Delete successfully")
                        }

                    });
                }

            });
        }

    });
}

function getExpense1() {
    $.ajax({
        type: "GET", url: "http://localhost:8081/categories/getChildCategory/1", success: function (child1) {

            let str = `</div>
                                      <div class="input-group mb-3">
                                        <span class="input-group-text">Tăng</span>` + `<select class=\"form-select\" aria-label=\"Default select example\" id= \"childCategory1\">` + getCategory(child1) + `</select>` + `</div>`;
            document.getElementById("showCategory1").innerHTML = str
        }

    })
}

function getIncome1() {
    $.ajax({
        type: "GET", url: "http://localhost:8081/categories/getChildCategory/2", success: function (child2) {
            let str = `<div class="input-group mb-3">
                                        <span class="input-group-text">Giảm</span>` + `<select class=\"form-select\" aria-label=\"Default select example\" id=\"childCategory2\">` + getCategory(child2) + `</select>` + `</div>`;
            document.getElementById("showCategory1").innerHTML = str;
        }
    })
}


function update(id) {
    id = idEdit;
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/transactions/" + id,
        success: function (transactions) {


            let amountWalletNew;
            let amountWallet = transactions.wallet.moneyAmount;
            let amountTransaction = transactions.moneyAmount;

            let wallet = document.getElementById("wallet2").value;
            let childCategory = document.getElementById("childCategory1").value;
            let moneyAmount = +document.getElementById("moneyAmount2").value;
            let note = document.getElementById("note2").value;
            $.ajax({
                type: "GET",
                url: "http://localhost:8081/categories/" + childCategory,
                success: function (categories) {
                    let idParent = categories.parentCategory.id;

                    if (idParent === 1) {
                        amountWalletNew = amountWallet + amountTransaction - moneyAmount;
                    }
                    if (idParent === 2) {
                        amountWalletNew = (amountWallet - amountTransaction) + moneyAmount;
                    }


                    let pro = {
                        id: id, wallet: {
                            id: wallet
                        }, childCategory: {
                            id: childCategory
                        }, moneyAmount: moneyAmount, note: note
                    }

                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        type: 'PUT',
                        url: 'http://localhost:8081/transactions/' + id,
                        data: JSON.stringify(pro),
                        success: function () {
                            let idNew = transactions.wallet.id;

                            let pro = {
                                id: id,
                                name: transactions.wallet.name,
                                icon: transactions.wallet.icon,
                                moneyAmount: amountWalletNew,
                                moneyType: {
                                    id: transactions.wallet.moneyType.id
                                }, appUser: {
                                    id: transactions.wallet.appUser.id
                                }
                            }

                            $.ajax({
                                headers: {
                                    'Accept': 'application/json', 'Content-Type': 'application/json',
                                },
                                type: 'PUT',
                                url: "http://localhost:8081/wallets/editWallet/" + idNew,
                                data: JSON.stringify(pro),
                                success: function () {
                                    findAllTransactionByWallet(idWallet);
                                    findAllWallet(idWallet);
                                    getWallet();

                                },
                                error: function (error) {
                                    console.log(error)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}


findAllWallet();

function findAllTransactionByWallet(id) {
    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost:8081/wallets" + id,
    //     success: function (wallet) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/wallets/transaction-by-wallet/" + id,
        success: function (data) {
            // localStorage.setItem("data", JSON.stringify(wallet));
            localStorage.setItem("data", JSON.stringify(data));
            window.location.href = "../transaction/transaction.html"
        }, error: function (error) {
            console.log(error);
        }
    })

}

function findAllByDateBetween() {
    document.getElementById("outflow").innerHTML = "";
    document.getElementById("inflow").innerHTML = "";
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/transactions/search-by-create-date?id=" + idWallet + "&from=" + from + "&to=" + to,
        success: function (data) {
            if (data.length === 0) {
                document.getElementById("outflow").innerHTML = "No Transaction"
            }
            let sumIn = 0;
            let sumOut = 0;
            display(data)
            for (let i = 0; i < data.length; i++) {

                if (data[i].childCategory.parentCategory.id === 1 && data[i].wallet.id === idWallet) {
                    sumOut += data[i].moneyAmount;
                }
                if (data[i].childCategory.parentCategory.id === 2 && data[i].wallet.id === idWallet) {
                    sumIn += data[i].moneyAmount;
                }
            }

            document.getElementById("outflow").innerHTML = "Outflow: " + sumOut.toLocaleString() + " " + data[0].wallet.moneyType.name;
            document.getElementById("inflow").innerHTML = "Inflow:    " + sumIn.toLocaleString() + " " + data[0].wallet.moneyType.name;

        }
    })

}

