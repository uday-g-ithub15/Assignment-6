/*
 Get data from input field
*/
const getMobile = () => {
    const searchText = document.getElementById('search-bar').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    //Some error if user dosen't write anything
    if (searchText.length == 0) {
        document.getElementById('blank-error').style.display = 'block'
        document.getElementById('type-error').style.display = 'none';
        return getMobile();
    }
    document.getElementById('search-bar').value = '';
    loaderShow('block');
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                displayMobile(data.data)
            }
            else {
                document.getElementById('type-error').style.display = 'block';
                document.getElementById('blank-error').style.display = 'none';
                document.getElementById('load-more-btn').style.display = 'none';
                document.getElementById('display-mobile').textContent = '';
                document.getElementById('move-top').style.display = 'none';
                loaderShow('none');
            }
        })

}
/* 
    Display mobile after searching
*/
const displayMobile = (mobiles) => {
    document.getElementById('type-error').style.display = 'none';
    document.getElementById('blank-error').style.display = 'none';
    const first20 = mobiles.slice(0, 20);
    if (first20.length >= 20) {
        document.getElementById('load-more-btn').style.display = 'block';
        document.getElementById('move-top').style.display = 'block'
    }
    showMobileOnUi(first20);
    document.getElementById('load-more-btn').addEventListener('click', function () {
        showMobileOnUi(mobiles);
        document.getElementById('load-more-btn').style.display = 'none'
        document.getElementById('move-top').style.display = 'block'
    })
    loaderShow('none');
}
// Common style for showing in ul
const showMobileOnUi = (displayMobile) => {
    const showMobile = document.getElementById('display-mobile');
    showMobile.classList.add('display-mobile');
    showMobile.textContent = '';
    displayMobile.forEach(mobile => {
        const mobileShow = document.createElement('div');
        mobileShow.classList.add('mobile-card');
        mobileShow.innerHTML = `
        <img src='${mobile.image}'>
        <h3>Brand : ${mobile.brand}</h3>
        <h3>Name : ${mobile.phone_name}</h3>
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
    loaderShow('block')
}
// Display Single Mobile
const displaySingleMobile = mobile => {
    window.location.href = '#single-mobile';
    loaderShow('none');
    const singleMobileDisplay = document.getElementById('single-mobile');
    singleMobileDisplay.textContent = '';
    const singleMobile = document.createElement('div');
    singleMobile.classList.add('single-mobile');
    singleMobile.innerHTML = `
    <div single-image>
    <img src = ${mobile.image}>
    </div>
    <div class='single-text' id=''single-text>
    <h4>Name : ${mobile.name}</h4>
    <h4>Release Date : ${mobile.releaseDate ? mobile.releaseDate : 'Upcomig'}</h4>
    <h4>Chipset : ${mobile.mainFeatures.chipSet}</h4>
    <h4>Display Size : ${mobile.mainFeatures.displaySize}</h4>
    <h4>Memory : ${mobile.mainFeatures.memory}</h4>
    <h4>Sensors : ${mobile.mainFeatures.sensors}</h4>
    <h4>WLAN : ${mobile.others?.WLAN ? mobile.others.WLAN : 'No'}</h4>
    <h4>Blutooth : ${mobile.others?.Bluetooth ? mobile.others.Bluetooth : 'No'}</h4>
    <h4>GPS : ${mobile.others?.GPS ? mobile.others.GPS : 'No'}</h4>
    <h4>NFC : ${mobile.others?.NFC ? mobile.others.NFC : 'No'}</h4>
    <h4>Radio : ${mobile.others?.Radio ? mobile.others.Radio : 'No'}</h4>
    <h4>USB : ${mobile.others?.USB ? mobile.others.USB : 'No'}</h4>
    </div>
    `
    singleMobileDisplay.appendChild(singleMobile);
}

//Declare loader function
const loaderShow = display => {
    document.getElementById('loader').style.display = display;
}