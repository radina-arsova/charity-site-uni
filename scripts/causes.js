let data = [
    {
        "title": "Cause 1",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at elementum quam. Aenean tempor malesuada elit a sagittis. ",
        "image": "https://www.anointedapostolicchurch.org/wp-content/uploads/2020/05/charity.jpg",
        "money": 0
    },
    // {
    //     "title": "Cause 2",
    //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at elementum quam. Aenean tempor malesuada elit a sagittis.",
    //     "image": "https://png.pngtree.com/png-clipart/20210530/original/pngtree-international-charity-day-world-charity-png-image_6348139.jpg"
    // },
    // {
    //     "title": "Cause 3",
    //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at elementum quam. Aenean tempor malesuada elit a sagittis.",
    //     "image": "https://www.anointedapostolicchurch.org/wp-content/uploads/2020/05/charity.jpg"
    // },
    // {
    //     "title": "Cause 4",
    //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at elementum quam. Aenean tempor malesuada elit a sagittis.",
    //     "image": "https://png.pngtree.com/png-clipart/20210530/original/pngtree-international-charity-day-world-charity-png-image_6348139.jpg"
    // },
    // {
    //     "title": "Cause 5",
    //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at elementum quam. Aenean tempor malesuada elit a sagittis.",
    //     "image": "https://www.anointedapostolicchurch.org/wp-content/uploads/2020/05/charity.jpg"
    // },
    // {
    //     "title": "Cause 6",
    //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at elementum quam. Aenean tempor malesuada elit a sagittis.",
    //     "image": "https://png.pngtree.com/png-clipart/20210530/original/pngtree-international-charity-day-world-charity-png-image_6348139.jpg"
    // },
]

function onLoad() {
    if (!localStorage.causes) {
        localStorage.setItem('causes', JSON.stringify(data))
    }
    let ul = document.getElementById("causes-list");
    let causes = JSON.parse(localStorage.causes);
    causes.map((cause, index) => {
        let li = document.createElement("li");
        li.classList.add("cause-container");
        let img = document.createElement("img");
        img.classList.add("cause-img");
        img.src = cause.image;
        li.appendChild(img);

        let descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add('description-container');

        let div = document.createElement("div");
        let title = document.createElement('h2');
        title.appendChild(document.createTextNode(cause.title));
        let description = document.createElement('p');
        description.appendChild(document.createTextNode(cause.description));
        div.appendChild(title);
        div.appendChild(description);

        let p = document.createElement('p');
        p.innerText = `Fund raised: ${cause.money.toFixed(2)} lv.`;

        let input = document.createElement('input');
        input.type = 'input';
        input.placeholder = 'Enter your donation';
        input.addEventListener("keyup", function (event) {
            if (event.key == 'Enter') donate(p, input, index)
        });
        input.classList.add('input-donate');
        input.classList.add('invisible');

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add('cause-buttons');

        let donateBtn = document.createElement("button");
        donateBtn.type = "button";
        donateBtn.innerHTML = "Donate";
        donateBtn.onclick = () => { donate(p, input, index) }
        donateBtn.classList.add('donate-button');

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.innerHTML = "Delete";
        deleteBtn.onclick = () => { deleteCause(index) }
        deleteBtn.classList.add('delete-button');

        buttonsDiv.appendChild(donateBtn);
        buttonsDiv.appendChild(deleteBtn);

        descriptionContainer.appendChild(div);
        descriptionContainer.appendChild(p);
        descriptionContainer.appendChild(input);
        descriptionContainer.appendChild(buttonsDiv);

        li.appendChild(descriptionContainer)

        ul.appendChild(li);
    })
}

function donate(p, input, index) {
    if (input.classList.contains('invisible')) {
        p.classList.add('invisible');
        input.classList.remove('invisible')
        input.focus()
    } else {
        if (input.value !== '' && Number(input.value)) {
            let causes = JSON.parse(localStorage.causes);
            causes[index].money = causes[index].money + Number(input.value);
            localStorage.setItem('causes', JSON.stringify(causes))
            p.innerText = `Fund raised: ${causes[index].money.toFixed(2)} lv.`;
        }
        input.value = '';
        p.classList.remove('invisible');
        input.classList.add('invisible')
    }
}

function deleteCause(index) {
    let causes = JSON.parse(localStorage.causes);
    causes.splice(index, 1);
    localStorage.setItem('causes', JSON.stringify(causes))
    window.location.reload();
}

function createCause() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    if (title.length === 0) document.getElementById('title-error').innerText = "Field is required"
    else document.getElementById('title-error').innerText = ""
    if (description.length === 0) document.getElementById('description-error').innerText = "Field is required"
    else document.getElementById('description-error').innerText = ""

    if (title.length > 0 && description.length > 0) {
        const newCause = {
            "title": title,
            "description": description,
            "image": image || 'https://www.anointedapostolicchurch.org/wp-content/uploads/2020/05/charity.jpg',
            "money": 0
        }
        let causes = JSON.parse(localStorage.causes);
        causes.push(newCause);
        localStorage.setItem("causes", JSON.stringify(causes));
        window.location.href = './causes.html';
    }
}

// function readTextFile(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 alert(allText);
//             }
//         }
//     }
//     rawFile.send(null);
// }