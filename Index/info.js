getDetails();
let _id;

async function getDetails() {
    let response = await fetch('http://localhost:3000/portfolio');
    let result = await response.json();
    // console.log(result.data)
    let obj = result.data[0];
    console.log(obj)
    _id = obj['_id'];
    setMaxDate();
    document.getElementById('firstName').value = obj.first_name;
    document.getElementById('lastName').value = obj.last_name;
    document.getElementById('email').value = obj.email;
    document.getElementById('phone').value = obj.phone;
    document.getElementById('address').value = obj.address;
    document.getElementById('address-2').value = obj.address_2;
    document.getElementById('country').value = obj.country;
    document.getElementById('state').value = obj.state;
    document.getElementById('city').value = obj.city;
    document.getElementById('zip').value = obj.zip;
    document.getElementById('headline').value = obj.headline;
    document.getElementById('desc').value = obj.desc;
    setEducation(obj.education);
    setJob(obj.jobs);
    setSkill(obj.skills);
}

function setEducation(edu) {
    let eduBox = document.getElementById("extra-edu").children.length;
    edu.forEach((obj, i) => {
        if (i + 1 > eduBox) {
            createEdu();
        }
        document.getElementById(`school-${i+1}`).value = obj.school;
        document.getElementById(`branch-${i+1}`).value = obj.branch;
        document.getElementById(`degree-${i+1}`).value = obj.degree;
        document.getElementById(`year-${i+1}`).value = obj.year;
        document.getElementById(`grade-${i+1}`).value = obj.grade;
    })
}

function setJob(jobs) {
    let jobBox = document.getElementById("extra-job").children.length;
    jobs.forEach((obj, i) => {
        if (i + 1 > jobBox) {
            createJob();
        }
        document.getElementById(`company-${i+1}`).value = obj.company;
        document.getElementById(`desg-${i+1}`).value = obj.desg;
        document.getElementById(`start-${i+1}`).value = obj.start;
        document.getElementById(`end-${i+1}`).value = obj.end;
        document.getElementById(`job_desc-${i+1}`).value = obj.job_desc;
    })
}

function setSkill(skills) {
    let skillBox = document.getElementById("extra-skills").children.length;
    skills.forEach((obj, i) => {
        if (skillBox < i + 1) {
            createSkills();
        }
        document.getElementById(`skill-name-${i+1}`).value = obj.name;
        document.getElementById(`val-${i+1}`).value = obj.val;
    })
}

async function editDetails() {

    let eduCount = document.getElementById("extra-edu").children.length;
    let education = [];
    for (let i = 1; i <= eduCount; i++) {
        education.push({
            school: document.getElementById(`school-${i}`).value,
            branch: document.getElementById(`branch-${i}`).value,
            degree: document.getElementById(`degree-${i}`).value,
            year: document.getElementById(`year-${i}`).value,
            grade: document.getElementById(`grade-${i}`).value,
        });
    }

    let jobCount = document.getElementById("extra-job").children.length;
    let jobs = [];
    for (let i = 1; i <= jobCount; i++) {
        jobs.push({
            company: document.getElementById(`company-${i}`).value,
            desg: document.getElementById(`desg-${i}`).value,
            start: document.getElementById(`start-${i}`).value,
            end: document.getElementById(`end-${i}`).value,
            job_desc: document.getElementById(`job_desc-${i}`).value,
        });
    }

    let skillCount = document.getElementById("extra-skills").children.length;
    let skills = [];
    for (let i = 1; i <= skillCount; i++) {
        skills.push({
            name: document.getElementById(`skill-name-${i}`).value,
            
        });
    }

    document.getElementById('save').disabled = true;
    data = {
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        address_2: document.getElementById('address-2').value,
        country: document.getElementById('country').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        headline: document.getElementById('headline').value,
        desc: document.getElementById('desc').value,
        education,
        jobs,
        skills
    };

    let response = await fetch(`http://localhost:3000/portfolio/edit/${_id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
    let result = await response.json();
    getDetails();
    alert(result.message);
    document.getElementById('save').disabled = false;
}

function setMaxDate() {
    let dateFields = document.querySelectorAll('input[type="date"]');
    dateFields.forEach(ele => {
        ele.max = new Date().toISOString().split("T")[0];
    });
}

function createMyTag(tagName, className = '', idName = '') {
    let ele = document.createElement(tagName);
    ele.setAttribute('class', className);
    ele.setAttribute('id', idName);
    return ele;
}

let i = 2;

function createEdu() {
    let edu = document.getElementById('extra-edu');
    let div = createMyTag('div', 'row border mb-3', `edu-${i}`);
    div.innerHTML = `
        <div class="col-12 mb-3">
            <label for="school-${i}">School / College Name</label>
            <input type="text" class="form-control" id="school-${i}" placeholder="School / College Name"
                required>
        </div>
        <div class="col-6 mb-3">
            <label for="branch-${i}">Branch</label>
            <input type="text" class="form-control" id="branch-${i}" placeholder="Branch" required>
        </div>
        <div class="col-6 mb-3">
            <label for="degree-${i}">Degree</label>
            <input type="text" class="form-control" id="degree-${i}" placeholder="Degree" required>
        </div>
        <div class="col-6 mb-3">
            <label for="year-${i}">Year of Passing</label>
            <input type="date" class="form-control" id="year-${i}" placeholder="year of passing"
                required>
        </div>
        <div class="col-6 mb-3">
            <label for="grade-${i}">Grade</label>
            <input type="text" class="form-control" id="grade-${i}" placeholder="Grade Obtained"
                required>
        </div>
        <div class="col-6 mb-3">
            <button class="btn btn-danger" onclick="removeEle('edu-${i++}')">Remove Field</button>
        </div>
    `;
    edu.appendChild(div);
    setMaxDate();
}

let j = 2;

function createJob() {
    let job = document.getElementById('extra-job');
    let div = createMyTag('div', 'row border mb-3', `job-${j}`);
    div.innerHTML = `
    <div class="col-12 mb-3">
        <label for="company-${j}">Company Name</label>
        <input type="text" class="form-control" id="company-${j}" placeholder="Company Name"
            required>
    </div>
    <div class="col-12 mb-3">
        <label for="desg-${j}">Designation</label>
        <input type="text" class="form-control" id="desg-${j}" placeholder="You worked as..."
            required>
    </div>
    <div class="col-md-6">
        <div class="mb-3">
            <label for="start-${j}">Starting Date</label>
            <input type="text" class="form-control" id="start-${j}" placeholder="starting date"
                required>
        </div>
    </div>
    <div class="col-md-6">
        <div class="mb-3">
            <label for="end-${j}">Ending Date</label>
            <input type="text" class="form-control" id="end-${j}" placeholder="ending date">
            <small class="text-muted">If your working currently don't provide the ending date.</small>
        </div>
    </div>
    <div class="col-12 mb-3">
        <label for="job_desc-${j}">Job Description</label>
        <textarea type="text" class="form-control" id="job_desc-${j}" rows="5"
            placeholder="describe your job" required></textarea>
    </div>
    <div class="col-6 mb-3">
        <button class="btn btn-danger" onclick="removeEle('job-${j++}')">Remove Field</button>
    </div>
    `;
    job.appendChild(div);
}

let k = 2;

function createSkills() {
    let skills = document.getElementById('extra-skills');
    let div = createMyTag('div', 'row border mb-3', `skill-${k}`);
    div.innerHTML = `
        <div class="col-md-6">
            <div class="mb-3">
                <label for="skill-name-${k}">Skill Name</label>
                <input type="text" class="form-control" id="skill-name-${k}" placeholder="Skill Name"
                    required>
            </div>
        </div>
      
        <div class="col-6 mb-3">
            <button class="btn btn-danger" onclick="removeEle('skill-${k++}')">Remove Field</button>
        </div>
    `;
    skills.appendChild(div);
}

function removeEle(id) {
    let div = document.getElementById(id);
    div.remove();
}