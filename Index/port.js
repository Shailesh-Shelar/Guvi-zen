(async function getDetails() {
    let response = await fetch('https://shailesh-portfolio.herokuapp.com/portfolio');
    let result = await response.json();
    //console.log(result.data);
    let obj = result.data[0];
    console.log(obj)
    document.getElementById('name').innerHTML = `I'm ${obj.first_name} ${obj.last_name}.`;
    document.getElementById('headline').innerHTML = `${obj.headline}.`;
    document.getElementById('desc').innerHTML = `${obj.desc}.`;
    document.getElementById('contact').innerHTML = `
        ${obj.first_name} ${obj.last_name} <br>
        ${obj.address} <br>
        ${obj.address_2} <br>
        ${obj.city}, ${obj.state}, ${obj.country}, ${obj.zip} <br>
        +91 ${obj.phone} <br>
        ${obj.email}
    `;

    obj.education.forEach(ele => {
        let edu = document.getElementById('edu');
        let div = document.createElement('div');
        div.setAttribute('class', 'col-12')
        div.innerHTML = `
            <h3>${ele.school}</h3>
            <p><i>${ele.degree}</i> with <i>${ele.branch}</i><span>• ${ele.year}</span></p>
            <p>Graduated with - ${ele.grade}%</p>
        `;
        edu.appendChild(div);
    });

    obj.jobs.forEach(ele => {
        let edu = document.getElementById('job');
        let div = document.createElement('div');
        div.setAttribute('class', 'col-12')
        div.innerHTML = `
            <h3>${ele.company}</h3>
            <p><i>${ele.desg}</i><span>• ${ele.start} - ${ele.end}</span></p>
            <p>${ele.job_desc}</p>
        `;
        edu.appendChild(div);
    });

    obj.skills.forEach(ele => {
        let skills = document.getElementById('skills');
        let div = document.createElement('div');
        div.innerHTML = `
            <h6>${ele.name}</h6>
        `;
        skills.appendChild(div);
    });

})();