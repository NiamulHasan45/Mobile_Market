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
    getMobileInput.value = '';
   
}




const dataGroup = (dataReceive) => {
    // console.log(dataReceive);
    const allMobileSection = document.getElementById('all-mobile-section');
    const specificSection = document.getElementById('specific-section');
    specificSection.textContent = '';
    allMobileSection.textContent ='';
    const mobiles = dataReceive.data;

    if(mobiles.length === 0){
        return allMobileSection.innerHTML = `<h1 class="text-center text-danger"> Sorry, Matched products are not found</h1>`;
    }
    for(let i=0; i<mobiles.length; i++){
        const mobile = mobiles[i];
        console.log(mobile);
        // console.log(mobile.slug);
        if(i>=20){
            break;
        }
        const div = document.createElement('div');
        div.className = 'one-mobile col-lg-4 col-md-12 mx-auto';
        div.innerHTML = `
                <div class="card mx-auto border-0 rounded mt-3 p-3" style="width: 18rem;">
                    <img src="${mobile.image}" class="card-img-top" alt="No image found">
                    <div class="card-body">
                        <h5 class="card-title">${mobile.phone_name}</h5>
                        <p class="card-text">${mobile.brand}</p>
                        <button onclick='detailButton("${mobile.slug}")' class="btn btn-primary">Detail</button>
                    </div>
                </div>
                        `;
        allMobileSection.appendChild(div);

    }
}

const detailButton = (id) => {
    // console.log(id);
    const url2 = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url2)
    .then(res => res.json())
    .then(about => oneItemDetail(about.data)) 
}

 const oneItemDetail = (about) => {
    const specificSection = document.getElementById('specific-section');
    // console.log(about.releaseDate);
   
    // const div = document.createElement('div');
    // div.className = 'col-12 mx-auto';
    specificSection.innerHTML = `
            <div class="card mx-auto border-0 rounded mt-3 p-3" style="width: 25rem;">
            <img src="${about.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${about.name}</h4>
                <p id="release-date" class="card-text"></p>
                <h6>Main Features</h6>
                <div id='main-features'>
                </div>
                <h6>Others</h6>
                <div id='others-features'>
                </div>
                <div id='special-features'>
                    <h6>Sensors</h6>
                </div>
                
            </div>
        </div>
    `;
    // const features = about.mainFeatures;
    // console.log(about.others);
   
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

   
    // <p><span class="fw-bold">Sensors: </span>${about.mainFeatures.sensors[1]}</p>
    const specialFeatures = document.getElementById('special-features');
    for(const sensor of about.mainFeatures.sensors){
        const span = document.createElement('span');
        span.innerText = `${sensor}, `;
        specialFeatures.appendChild(span);
    }

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
