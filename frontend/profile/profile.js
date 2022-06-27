// copy firebase
const firebaseConfig = {
    apiKey: "AIzaSyCOjy4Th6Iz40mNsxnhtYUKsnSF4agqrLA",
    authDomain: "case4-7d208.firebaseapp.com",
    projectId: "case4-7d208",
    storageBucket: "case4-7d208.appspot.com",
    messagingSenderId: "43420649274",
    appId: "1:43420649274:web:e960d4d953400f95a67203",
    measurementId: "G-RRRNYKHEJT"
};


// Don't Edit
firebase.initializeApp(firebaseConfig);

var image = '';
// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = 'images';

// get elements
// var fileButton = document.getElementById('fileButton');

// listen for file selection
function upload(e) {

    // what happened
    console.log('file upload event');
    console.log(e);

    // get file
    var file = e.target.files[0];

    // create a storage ref
    var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);

    // upload file
    var uploadTask = storageRef.put(file);

    // The part below is largely copy-pasted from the 'Full Example' section from
    // https://firebase.google.com/docs/storage/web/upload-files

    // update progress bar
    var uploader = document.getElementById('uploader');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = progress;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            // save this link somewhere, e.g. put it in an input field
            var downloadURL = uploadTask.snapshot.downloadURL;
            image = downloadURL;
            console.log('downloadURL ===>', downloadURL);
            let divLocation = document.getElementById("imgDiv"); // sua id hien anh
            let imgElement = document.createElement("img");
            imgElement.src = downloadURL
            imgElement.width = 100;
            imgElement.height = 100;
            console.log('pic ==', downloadURL)
            divLocation.append(imgElement);
        });

}

// function resultImage() {
//     console.log('image resulte -->', image)
//     return image;
// }
// ?????

$(document).ready(function () {
    let editForm = {};
    $('#edit-profile').click(function (id) {
        signInForm.name = $('#name').val();
        signInForm.email = $('#email').val();
        signInForm.avatar = $('#avatar').val();
        let editFormOBJ = JSON.stringify(editForm);
        console.log('editForm == ', editForm)
        $.ajax({
            async: false,
            url: 'http://localhost:8080/users/edit/'+id,
            method: 'PUT',
            data: editFormOBJ,
            contentType: 'application/json; charset=utf8',
            success: function (data) {
                console.log('data login ===> ', data)
                console.log('data.status', data.status)
                // if (data.status == 202) {
                //     document.getElementById('status_login').innerHTML = 'edit fail! Please try again!';
                //     return
                // }
            }

        })
    })
})
