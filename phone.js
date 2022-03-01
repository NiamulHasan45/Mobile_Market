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
    getMobileInput.value = '';
    mobileDataAll(mobileInput);
}

// const errorMessage = () =>{
//    const getContainer = document.getElementById('container-id');
//    getContainer.innerHTML = `<h1 class="text-center text-danger"> Sorry, Matched products are not found</h1>`;


// }


const dataGroup = (dataReceive) => {
    // console.log(dataReceive);
    const allMobileSection = document.getElementById('all-mobile-section');
    allMobileSection.textContent ='';
    const mobiles = dataReceive.data;
    //console.log(mobiles);
    console.log(mobiles.length);
    if(mobiles.length === 0){
        return allMobileSection.innerHTML = `<h1 class="text-center text-danger"> Sorry, Matched products are not found</h1>`;
    }



    for(const mobile of mobiles){
        //console.log(mobile);
        const div = document.createElement('div');
        div.className = 'one-mobile col-lg-4 col-md-12 mx-auto';
        div.innerHTML = `
                <div class="card mx-auto border-0 rounded mt-3 p-3" style="width: 18rem;">
                    <img src="${mobile.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${mobile.phone_name}</h5>
                        <p class="card-text">${mobile.brand}</p>
                        <button onclick="detailButton()" class="btn btn-primary">Detail</button>
                    </div>
                </div>
                        `;
        allMobileSection.appendChild(div);

    }
}

const detailButton = () => {
    fetch('https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089')
    .then(res => res.json())
    .then(data => oneItemDetail(data))
}

const oneItemDetail = (data) => {
    console.log(data);

}
