// fetch('https://openapi.programming-hero.com/api/phones?search=${searchText}')

const mobileDataAll = (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => dataGroup(data))
    }

const clicked = () => {
    const getMobileInput = document.getElementById('mobile-input');
    const mobileInput = getMobileInput.value;
    mobileDataAll(mobileInput);
}

const dataGroup = (dataReceive) => {
    // console.log(dataReceive);
    const allMobileSection = document.getElementById('all-mobile-section');
    const mobiles = dataReceive.data;
    console.log(mobiles);
    for(const mobile of mobiles){
        console.log(mobile);
        const div = document.createElement('div');
        div.className = 'col-4 mx-auto';
        div.innerHTML = `
                <div class="card mx-auto" style="width: 18rem;">
                    <img src="${mobile.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${mobile.phone_name}</h5>
                        <p class="card-text">${mobile.brand}</p>
                        <a href="#" class="btn btn-primary">Detail</a>
                    </div>
                    </div>
                </div>
                        `;
        allMobileSection.appendChild(div);

    }
}
