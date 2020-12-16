async function login(){
    try{

        document.getElementById("btn-singin").disabled=true;
        let data={
            
            email:document.getElementById("email").value.trim(),
            password:document.getElementById("password").value.trim(),
        }
        console.log(data)
        let log=await fetch("https://shailesh-shorturl.herokuapp.com/login",{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json"
        }

    });

    let res=await log.json();
    
    console.log(res.status)
    if(res.status=="failed")
    {
        salert(res.message,'danger');
        // document.getElementById("email-error").innerHTML=`${res.responce}`

    }
    else{
        localStorage.setItem('_token', res.token);
        localStorage.setItem('uid', res.userId);
        salert(res.message,'success',true);
       // document.getElementById("email-error").innerHTML="";

    }
    document.getElementById("btn-singin").disabled=false;

    }
    catch(error)
    {
        setTimeout(() => {
            // alertBox.innerHTML = 'You will now be redirect to login page.';
            console.log(error)
        }, 4000);
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
            alertBox.innerHTML = 'You will now be redirect to Main page.';
            redirectTomain();
        }, 1000);
    }
}


function redirectTomain()
 {setTimeout(()=>{
    window.location.href = 'main.html';
 },2000)
        
}
