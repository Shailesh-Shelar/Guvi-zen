async function register(){
    
try{

    document.getElementById("btn-register").disabled=true;
    let data={
        first_name:document.getElementById("first_name").value.trim(),
        last_name:document.getElementById("last_name").value.trim(),
        email:document.getElementById("email").value.trim(),
        password:document.getElementById("password").value.trim(),
        confirm_password:document.getElementById("confirm_password").value.trim()

    }

    let register=await fetch("https://shailesh-reset-password.herokuapp.com/register",{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json"
        }

    });

    let res=await register.json();

    if(res.status=="failed")
    {
        salert(res.message,'danger');
        document.getElementById("email-error").innerHTML=`${res.responce}`

    }
    else{
        salert(res.message,'success',true);
        //document.getElementById("email-error").innerHTML="";

    }
    document.getElementById("btn-register").disabled=false;
}
catch(error)
{
    console.log(error)
}
}
    
function salert(message,status,next="")
{

    let alertBox = document.getElementById('alert-message');
    alertBox.removeAttribute('class');
    alertBox.style.display = 'block';
    alertBox.setAttribute('class', `alert alert-${status}`);
    alertBox.innerHTML = message;
    if (next) {
        setTimeout(() => {
            alertBox.innerHTML = 'You will now be redirect to login page.';
            redirectToLogin();
        }, 4000);
    }
}


function redirectToLogin() {
        window.location.href = 'login.html';
}
