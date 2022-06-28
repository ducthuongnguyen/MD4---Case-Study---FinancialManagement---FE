function renameUser() {
    let name = sessionStorage.getItem("NAME_KEY");
    console.log("name",name);
    $("#renameUser").html(name);
    // document.getElementById("renameUser").innerHTML = name;

}
renameUser();

function showFormWallet() {
    window.location.href = '../wallet/wallet.html';
}
