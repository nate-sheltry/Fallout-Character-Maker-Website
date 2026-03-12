const armorFormHTML = './armor-form.html'
const ammoFormHTML = './ammo-form.html'
const __contentDiv = document.getElementById('content');
const API_URL = 'https://falloutdbapi.render.com'

function populate(){
    fetch(armorFormHTML).then(res => (res.text()))
    .then(data => __contentDiv.innerHTML = data).then(data => {main()})
}

function postData(object, request){
    const options ={
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(object)
    }
    fetch(`${API_URL}${request}newItem?token=${formData.get('API_TOKEN').trim()}`, options)
}

populate();

function ammo(__form){
    __form.addEventListener('submit', (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target);
        console.log(formData)
        const object = {};
        const name = formData.get("name").toLowerCase().replace(/[ ]/g, '-').replace(/[\.]/g, '_');
        object[name] = {
            value: formData.get("value").trim(),
            ac: formData.get("ac"),
            dr: formData.get("dr").trim(),
            vol: formData.get("vol").trim(),
            dmg: formData.get("dmg").trim(),
            category: formData.get("category").trim().split(',').map(item => item.trim()),
            img: formData.get('img').trim()
        }
        postData(object, '/Resources/Ammo/')
        const jsonData = JSON.stringify(object);
        console.log(jsonData)
    })
}

function armor(__form){
    __form.addEventListener('submit', (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target);
        console.log(formData)
        const object = {};
        const name = formData.get("name").toLowerCase().replace(/[ ]/g, '-').replace(/[\.]/g, '_');
        object[name] = {
            value: parseInt(formData.get("value")),
            ac: parseInt(formData.get("ac")),
            dr: {
                normal: parseInt(formData.get("drNormal")),
                fire: parseInt(formData.get("drFire")),
                plasma: parseInt(formData.get("drPlasma")),
                laser: parseInt(formData.get("drLaser")),
                explosion: parseInt(formData.get("drExplosion"))
            },
            dt: {
                normal: parseInt(formData.get("dtNormal")),
                fire: parseInt(formData.get("dtFire")),
                plasma: parseInt(formData.get("dtPlasma")),
                laser: parseInt(formData.get("dtLaser")),
                explosion: parseInt(formData.get("dtExplosion")),
            },
            elecRes: parseInt(formData.get("elecRes")),
            poisRes: parseInt(formData.get("poisRes")),
            radRes: parseInt(formData.get("radRes")),
            weight: parseInt(formData.get("weight")),
            otherBonuses: `"${formData.get("otherBonuses")}"`
        }
        console.log(object);
        postData(object, '/Resources/Armor/')
        const jsonData = JSON.stringify(object);
        console.log(jsonData)
    })  
}

function main(){
    const __form = document.querySelector('form');
    if(__form.classList == ('ammo-form')){
        ammo(__form);
    }
    else if(__form.classList == ('armor-form')){
        armor(__form);
    }
}