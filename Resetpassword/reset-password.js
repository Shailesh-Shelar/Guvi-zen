
async function resetPassword(){
    try{
        let uid = window.location.search.split('=').pop();
       document.getElementById("btn-reset").disabled=true;
       let data={
           password:document.getElementById("password").value.trim(),
           confirm_password:document.getElementById("confirm_password").value.trim()
       }
//    console.log(req.query.uid)

       let apiReset = await fetch(`https://shailesh-reset-password.herokuapp.com/resetpassword/${uid}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
    let response = await apiReset.json();
    if (response.status == 'success') {
        showAlert(response.message, 'success', true);
    } else {
        showAlert(response.message, 'danger');
    }
}
 catch (error) {
    console.log(error);
}
}



function showAlert(message, status, next = '') {
let alertBox = document.getElementById('alert-message');
alertBox.removeAttribute('class');
alertBox.style.display = 'block';
alertBox.setAttribute('class', `alert alert-${status}`);
alertBox.innerHTML = message;
if (next) {
    redirectToLogin();
}
}

function redirectToLogin() {
setTimeout(() => {
    window.location.href = 'login.html'
}, 1500);
}
