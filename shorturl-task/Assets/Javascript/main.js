function logout() {
        localStorage.setItem('_token', '');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
    
 async function abc() {
            try {
                console.log("in api");
                let data = {
                    long_url: document.getElementById('url').value
                }
                console.log(data)
                let apiShortUrl = await fetch('https://shailesh-shorturl.herokuapp.com/short-url', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Authorization": localStorage.getItem('_token'),
                        "Content-type": "application/json"
                    }
                });
        
                let response = await apiShortUrl.json();
                showAlert(response.message, 'success');
                document.getElementById('btn-url').disabled = false;
                document.getElementById("surl").innerHTML=`https://shailesh-shorturl.herokuapp.com/${response.shorturl}`
            } catch (error) {
                console.log(error);
            }
            document.getElementById('btn-url').disabled = true;
        }


        function showAlert(message, status) {
            let alertBox = document.getElementById('alert-message');
            alertBox.removeAttribute('class');
            alertBox.style.display = 'block';
            alertBox.setAttribute('class', `alert alert-${status}`);
            alertBox.innerHTML = message;
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 2000);
        }



