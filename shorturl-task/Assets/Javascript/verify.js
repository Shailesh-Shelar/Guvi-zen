async function authUser() {
    let uid = localStorage.getItem('uid');
    let token = localStorage.getItem('_token');
    localStorage.setItem('fromPage', window.location.pathname);
    try {
        let apiAuth = await fetch(`https://shailesh-shorturl.herokuapp.com/verify/${uid}`, {
            method: 'GET',
            headers: {
                "Authorization": token
            }
        });
        let response = await apiAuth.json();
        if (response.status == 'failed') {
            if (localStorage.getItem('fromPage') == '/main.html') {
                alert('Session expired. Login again.')
                localStorage.setItem('fromPage', window.location.pathname);
                window.location.href = 'login.html';
            }
        } 
    } catch (error) {
        console.log(error);
    }
}

authUser();