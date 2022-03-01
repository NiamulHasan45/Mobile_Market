// Search and get the data
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
    getMobileInput.value = '';
   
}

// Get search result show it to website

const dataGroup = (dataReceive) => {
    const allMobileSection = document.getElementById('all-mobile-section');
    const specificSection = document.getElementById('specific-section');
    specificSection.textContent = '';
    allMobileSection.textContent ='';
    const mobiles = dataReceive.data;

    if(mobiles.length === 0){
        return allMobileSection.innerHTML = `<h1 class="text-center text-danger"> Sorry, Matched products are not found</h1>`;
    }
    // Loop for every mobile

    for(let i=0; i<mobiles.length; i++){
        const mobile = mobiles[i];
        console.log(mobile);
        if(i>=20){
            break;
        }
        const div = document.createElement('div');
        div.className = 'one-mobile col-lg-4 col-md-12 mx-auto';
        div.innerHTML = `
                <div class="card cards-group mx-auto mt-3 p-3" style="width: 18rem;">
                <img src="${mobile.image}" class="card-img-top" alt="No image found">
                    <div class="card-body">
                        <h5 class="card-title text-center">${mobile.phone_name}</h5>
                        <p class="card-text text-center">${mobile.brand}</p>
                        <button onclick='detailButton("${mobile.slug}")' class="btn btn-primary d-flex justify-content-center mx-auto">Detail</button>
                    </div>
                </div>
                        `;
        allMobileSection.appendChild(div);

    }
}

// After clicking the detail button, it will be called

const detailButton = (id) => {

    const url2 = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url2)
    .then(res => res.json())
    .then(about => oneItemDetail(about.data)) 
}

// from the item show all necessary information

 const oneItemDetail = (about) => {
    const specificSection = document.getElementById('specific-section');
   
    specificSection.innerHTML = `
            <div class="card one-clicked-item mx-auto mt-3 p-3" style="width: 50rem;">
            <div class="d-flex">
                <div class='w-50 d-flex align-items-center' >
                        <img src="${about.image}" class="card-img-top" alt="No images found">
                 </div>
                 <div class="card-body w-50">
                        <h4 class="card-title">${about.name}</h4>
                        <p id="release-date" class="card-text"></p>
                        <h6>Main Features</h6>
                        <div id='main-features'>
                        </div>
                        <h6>Others</h6>
                        <div id='others-features'>
                        </div> 
                </div>
            </div>
        </div>
    `;
//    This fuction will get the main features and other features
   
    const FeaturesFuntion = (features, feature) => {
        const getFeatures = document.getElementById(feature);
        if(typeof features === 'undefined'){
            getFeatures.innerHTML= `<p>No result</p>`;
        }
        for (const property in features) {
            const p = document.createElement('p');
            p.innerText =`${property}: ${features[property]}`;
            getFeatures.appendChild(p); 
          }
    }

    FeaturesFuntion(about.mainFeatures, 'main-features');
    FeaturesFuntion(about.others, 'others-features');

   
// This will show if relase date not found

    const releaseDate = document.getElementById('release-date');
    const releaseFuntion = () => {
        if(about.releaseDate === ''){
            releaseDate.innerText = 'Release date not found';
        }
        else{
            releaseDate.innerText = `${about.releaseDate}`; 
        }
    }
    releaseFuntion();
    

} 
