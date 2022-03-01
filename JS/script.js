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
    })

}
