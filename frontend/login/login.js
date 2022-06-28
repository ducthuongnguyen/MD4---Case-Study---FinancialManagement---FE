
function logIn() {
    let logInForm = {};

    logInForm.username = $('#namelogin').val();
    logInForm.password = $('#passwordlogin').val();
    let logInFormOBJ = JSON.stringify(logInForm);
    console.log('signInFormOBJ == ', logInFormOBJ)
    $.ajax({
        async: false,
        url: 'http://localhost:8081/users/signin',
        method: 'POST',
        data: logInFormOBJ,
        contentType: 'application/json; charset=utf8',
        success: function (data) {
            console.log('data login ===> ', data)
            console.log('data.status', data.status)
            if (data.status == 202) {
                console.log("ID=",JSON.stringify(data.id))
                document.getElementById('status_login').innerHTML = 'Login Failed! Please try again!';
                return
            }
            window.sessionStorage.removeItem('TOKEN_KEY');

            window.sessionStorage.setItem('TOKEN_KEY', data.token);
            window.sessionStorage.removeItem('NAME_KEY');
            window.sessionStorage.setItem('NAME_KEY', data.name);
            window.sessionStorage.removeItem('AVATAR_KEY');
            window.sessionStorage.setItem('AVATAR_KEY', data.avatar);
            window.sessionStorage.setItem('IDUSER_KEY', data.id);
            console.log(",,," ,data.id)
            window.sessionStorage.setItem('ROLE_KEY', JSON.stringify(data.roles))

            window.location.href = '../home/index.html';
        }

    })
}

function signUp() {
    let signUpForm = {};
    let noUser = {
        message: "user_existed"
    }
    let createSuccess = {
        message: "yes"
    }
    signUpForm.name = $('#name').val();
    signUpForm.username = $('#username').val();
    signUpForm.email = $('#email').val();
    signUpForm.password = $('#password').val();
    signUpForm.roles = ["user"];
    let signUpFormOBJ = JSON.stringify(signUpForm);
    console.log('signUpFormOBJ === ', signUpFormOBJ)
    $.ajax({
        url: 'http://localhost:8081/users/signup',
        method: 'POST',
        data: signUpFormOBJ,
        contentType: 'application/json; charset=utf8',
        success: function (data) {
            console.log('data ===', data);
            if (JSON.stringify(data) == JSON.stringify(noUser)) {
                document.getElementById('status').innerHTML = 'The username is existed! Please try again!'
            }
            if (JSON.stringify(data) == JSON.stringify(createSuccess)) {
                document.getElementById('status').innerHTML = 'Create User Account Success!'
            }
        }
    })
}
function changePassword(){
    let token=window.sessionStorage.getItem("TOKEN_KEY");
    console.log("a==",token)
    let no={
        message:"no"
    }
    let yes={
        message:"yes"
    }
    let changePasswordForm={};
    changePasswordForm.currentPassword=$('#currentPassword').val();
    changePasswordForm.newPassword=$('#newPassword').val();
    let changePassword=JSON.stringify(changePasswordForm);
    console.log("changPASSform=",changePasswordForm)
    $.ajax({
        headers:{
            Authorization: 'Bearer ' + token
        },
        url: 'http://localhost:8081/users/change-password',
        method: 'PUT',
        data: changePassword,
        contentType: 'application/json; charset=utf8',
        success: function (data) {
            console.log('data ===', data);
            if (JSON.stringify(data) == JSON.stringify(no)) {
                console.log("failed")
                document.getElementById('status').innerHTML = 'Failed to change password!'
            }
            if (JSON.stringify(data) == JSON.stringify(yes)) {console.log("success")
                document.getElementById('status').innerHTML = 'Change password successfully!'
            }
        }
    })
}

function showFormChangePassword(){
    window.location.href = '../login/changePassword.html';
}
