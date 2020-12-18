async function forgetPassword(){
    try{
       
    document.getElementById("btn-forgot").disabled=true;
    let data={
        email:document.getElementById("email").value.trim()
    }

    let res1=await fetch("https://shailesh-reset-password.herokuapp.com/forget-password",{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json"
        }
    });
    let rez=await res1.json();
    if(rez.status=="success")
    {
        salert(rez.message,'success');
    }else{
        salert(rez.message,'danger');
    }
    document.getElementById("btn-forgot").disabled=false;
}
catch(error){
    console.log(error);
}
}

function salert(message,status,next="")
{
    let alertBox = document.getElementById('alert-message');
    alertBox.removeAttribute('class');
    alertBox.style.display = 'block';
    alertBox.setAttribute('class', `alert alert-${status}`);
    alertBox.innerHTML = message;
}
