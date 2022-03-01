const getMobile = () => {
    const searchText = document.getElementById('search-bar').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    if (searchText.length == 0) {
        document.getElementById('blank-error').style.display = 'block'
        return getMobile;
    }
    else if (searchText.length > 0) {
        document.getElementById('blank-error').style.display = 'none'
    }
    document.getElementById('search-bar').value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => displayMobile(data.data))

}
// getMobile();

const displayMobile = (mobiles) => {
    const showMobile = document.getElementById('display-mobile');
    showMobile.classList.add('display-mobile');
    showMobile.textContent = '';
    mobiles.forEach(mobile => {
        // console.log(mobile);
        const mobileShow = document.createElement('div');
        mobileShow.classList.add('mobile-card');
        mobileShow.innerHTML = `
        <img src='${mobile.image}'>
        <h3>Brand : ${mobile.brand}</h3>
        <h3>${mobile.phone_name}</h3>
        <button class='btn' onclick='getSingleMobile("${mobile.slug}")'>Explore</button>
        `
        showMobile.appendChild(mobileShow);
    }
    )
}

//Get single mobile details
const getSingleMobile = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleMobile(data.data))
}
// Display Single Mobile
const displaySingleMobile = mobile => {
    const singleMobileDisplay = document.getElementById('single-mobile');
    singleMobileDisplay.textContent = '';
    const mobileSensor = mobile.mainFeatures.sensors;
    console.log(mobileSensor);
    console.log(mobile);
    const singleMobile = document.createElement('div');
    singleMobile.classList.add('single-mobile')
    singleMobile.innerHTML = `
    <div>
    <img src = ${mobile.image}>
    </div>
    <div>
    <h4>Name : ${mobile.name}</h4>
    <h4>Release Date : ${mobile.releaseDate ? mobile.releaseDate : 'No release date found'}</h4>
    <h4>Chipset : ${mobile.mainFeatures.chipSet}</h4>
    <h4>Display Size : ${mobile.mainFeatures.displaySize}</h4>
    <h4>Memory : ${mobile.mainFeatures.memory}</h4>
    <h4>Sensors : ${mobile.mainFeatures.sensors}</h4>
    </div>

    `
    singleMobileDisplay.appendChild(singleMobile);
}
