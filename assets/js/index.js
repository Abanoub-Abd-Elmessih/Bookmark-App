const siteName =document.getElementById('siteName');
const websiteUrl =document.getElementById('websiteUrl');
const submitBtn =document.getElementById('submitBtn');
const updateBtn =document.getElementById('updateBtn');
const tbody =document.getElementById('tbody');

// add Event Listeners
submitBtn.addEventListener('click',function(){
    addUrl()
    displayURL()
    clearInputs()
});
updateBtn.addEventListener('click',function(){
    updateUrl();
    displayURL();
    clearInputs();
})
siteName.addEventListener('keyup',function(e){
    checkName(e.target.value)
})
websiteUrl.addEventListener('keyup',function(e){
    checkURL(e.target.value)
})

let updateIndex;
let sitesList=[];
if(localStorage.getItem('Stored Sites')!==null){
    sitesList= JSON.parse(localStorage.getItem('Stored Sites'));
    displayURL();
}   
// add URL Functionality
function addUrl(){
    if(checkName(siteName.value) && checkURL(websiteUrl.value,)){
        let site={
            name :siteName.value,
            url :websiteUrl.value,
        }
        sitesList.push(site)
        localStorage.setItem('Stored Sites',JSON.stringify(sitesList))
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Bookmark has been saved",
            showConfirmButton: false,
            timer: 1500
          });
    }else{
        let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    }
}
// display URl Functionality
function displayURL(){
    let cartona =``
    for (let i = 0; i < sitesList.length; i++) {
        cartona +=`
        <tr>
                        <td class="px-5">${i + 1}</td>
                        <td>${sitesList[i].name}</td>
    <td><button class="btn btn-lg visit-btn" onclick="visitUrl(${i})"><i class="fa-solid fa-eye me-2"></i><a class="text-white text-decoration-none">Visit</a></button></td>                        <td><button class="btn btn-lg btn-danger" onclick="deleteUrl(${i})"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
                        <td><button class="btn btn-lg text-white btn-warning" onclick="setFormForUpdate(${i})"><i class="fa-solid fa-pen me-2"></i>Update</button></td>
                    </tr>`
    }
    tbody.innerHTML=cartona;
}
// clear Inputs Functionality
function clearInputs(){
    siteName.value = null;
    websiteUrl.value = null;
    siteName.classList.remove('is-valid')
    siteName.classList.remove('is-invalid')
    websiteUrl.classList.remove('is-valid')
    websiteUrl.classList.remove('is-invalid')
}
// Visit URl Functionality
function visitUrl(visitedUrlIndex) {
    const url = sitesList[visitedUrlIndex].url;
    window.open(url, '_blank');
}
// Delete URl Functionality
function deleteUrl(deleteIndex){
    sitesList.splice(deleteIndex ,1)
    localStorage.setItem('Stored Sites',JSON.stringify(sitesList))
    displayURL()
}
// Set form to Update URl Functionality
function setFormForUpdate(i){
    updateIndex=i
    siteName.value = sitesList[i].name
    websiteUrl.value = sitesList[i].url
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}
//Update URl Functionality
function updateUrl(){
    sitesList[updateIndex].name=siteName.value;
    sitesList[updateIndex].url=websiteUrl.value;
    updateBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none');
    localStorage.setItem('Stored Sites',JSON.stringify(sitesList));
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Bookmark has been Updated",
        showConfirmButton: false,
        timer: 1500
      });
}
//Check Name URl validation Functionality
function checkName(urlName){
    let validateName = /^[a-zA-Z0-9].{2,15}$/
    if(validateName.test(urlName)){
        siteName.classList.add('is-valid')
        siteName.classList.remove('is-invalid')
        return true
    }else{
        siteName.classList.add('is-invalid')
        siteName.classList.remove('is-valid')
        return false
    }
}
//Check URl validation Functionality
function checkURL(url){
    let validateUrl= /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})(:[0-9]{1,5})?(\/[a-zA-Z0-9._-]+)*\/?(\?[a-zA-Z0-9=&_.-]+)?(#\w*)?$/;
    if(validateUrl.test(url)){
        websiteUrl.classList.add('is-valid')
        websiteUrl.classList.remove('is-invalid')
        return true
    }else{
        websiteUrl.classList.add('is-invalid')
        websiteUrl.classList.remove('is-valid')
        return false
    }
}
