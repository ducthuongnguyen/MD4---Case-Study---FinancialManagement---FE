    $(document).ready(function () {
    let signInForm = {};
    $('#btn-login').click(function () {
    signInForm.email = $('#email').val();
    signInForm.password = $('#password').val();
    let signInFormOBJ = JSON.stringify(signInForm);
    console.log('signInFormOBJ == ', signInFormOBJ)
    $.ajax({
    async: false,
    url: 'http://localhost:8080/users/logIn',
    method: 'POST',
    data: signInFormOBJ,
    contentType: 'application/json; charset=utf8',
    success: function (data) {
    console.log('data login ===> ', data)
    console.log('data.status', data.status)
    if (data.status == 202) {
    document.getElementById('status_login').innerHTML = 'Login Failed! Please try again!';
    return
}
    window.sessionStorage.removeItem('TOKEN_KEY');
    window.sessionStorage.setItem('TOKEN_KEY', data.token);
    window.sessionStorage.removeItem('NAME_KEY');
    window.sessionStorage.setItem('NAME_KEY', data.name);
    window.sessionStorage.removeItem('AVATAR_KEY');
    window.sessionStorage.setItem('AVATAR_KEY', data.avatar);
    window.sessionStorage.setItem('ROLE_KEY', JSON.stringify(data.roles))
    console.log("type==", typeof (JSON.stringify(data.roles)))
    window.location.href = '../home/index.html';
}

})
})
})


    $(document).ready(function () {
    let signUpForm = {};
    let noUser = {
    message: "no_user"
}
    let noEmail = {
    message: "no_email"
}
    let createSuccess = {
    message: "successfully"
}
    let password = {
    message: "password fail"
}

    $('#btn-create-account').click(function () {
    signUpForm.name = $('#name').val();
    signUpForm.email = $('#newEmail').val();
    signUpForm.password = $('#newPassword').val();
    signUpForm.passwordConfirm = $('#passwordConfirm').val();
    let signUpFormOBJ = JSON.stringify(signUpForm);
    console.log('signUpFormOBJ === ', signUpFormOBJ)
    $.ajax({
    url: 'http://localhost:8080/users/signUp',
    method: 'POST',
    data: signUpFormOBJ,
    contentType: 'application/json; charset=utf8',
    success: function (data) {
    console.log('data ===', data);
    if (JSON.stringify(data.password) == JSON.stringify(password) && data.status==400) {
    document.getElementById("passwordStatus").innerHTML = 'PasswordConfirm did not match with Password!'
}
    if (JSON.stringify(data) == JSON.stringify(noUser) && data.status==400) {
    document.getElementById("nameStatus").innerHTML = 'The username is existed! Please try again!'
}
    if (JSON.stringify(data) == JSON.stringify(noEmail) && data.status==400) {
    document.getElementById("emailStatus").innerHTML = 'The Email is existed! Please try again!'
}
    if (JSON.stringify(data) == JSON.stringify(createSuccess) ) {
    console.log("??")
    status.innerHTML = 'Create User Account Success!'
}
}, error: err => {
    console.log(err)
}
})
})
})

