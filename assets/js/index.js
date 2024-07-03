const urlTitleInput = document.getElementById('urlTitle');
const urlInput = document.getElementById('urlInput');
const bookmarkNameclose =document.getElementById('bookmarkNameclose');
const bookmarkUrlclose =document.getElementById('bookmarkUrlclose');
const rowData =document.getElementById('rowData');
const addBtn=document.getElementById('addBtn');
const updateBtn=document.getElementById('updateBtn');
const searchInput=document.getElementById('searchInput');

// Event Listeners
urlTitleInput.addEventListener('keypress', function(){
    displayNameClear();
});
urlTitleInput.addEventListener('input', function(e){
    checkTitle(e.target.value);
});
urlInput.addEventListener('keypress', function(e){
    displayUrlclear();
    checkURL(e.target.value);
});
bookmarkNameclose.addEventListener('click' ,clearTitleField);
bookmarkUrlclose.addEventListener('click' ,clearUrlField);
addBtn.addEventListener('click',addBookmark);
updateBtn.addEventListener('click',updateBookmark);

// Function to Display Clear button of the Title field
function displayNameClear(){
    if (urlTitleInput.value.trim() !== '') {
        bookmarkNameclose.classList.remove('d-none');
        urlTitleInput.classList.remove('rounded-end-3');
    } else {
        bookmarkNameclose.classList.add('d-none');
        urlTitleInput.classList.add('rounded-end-3');
    }
    
};
// Function to Display Clear button of the URL field
function displayUrlclear(){
    if (urlInput.value.trim() !== '') {
        bookmarkUrlclose.classList.remove('d-none');
        urlInput.classList.remove('rounded-end-3');
    } else {
        bookmarkUrlclose.classList.add('d-none');
        urlInput.classList.add('rounded-end-3');
    }
};
// Function Clear the Title field
function clearTitleField(){
    urlTitleInput.value = null;
    bookmarkNameclose.classList.add('d-none');
    urlTitleInput.classList.add('rounded-end-3');
    urlTitleInput.classList.remove('is-valid' , 'is-invalid')
};
// Function Clear the URL field
function clearUrlField(){
    urlInput.value = null;
    bookmarkUrlclose.classList.add('d-none');
    urlInput.classList.add('rounded-end-3');
    urlInput.classList.remove('is-valid' , 'is-invalid')

};


let index;
//Array to contain all Bookmarks
let BookmarkList;
if(localStorage.getItem('BookmarkList') === null){
    BookmarkList = [];
}else{
    BookmarkList = JSON.parse(localStorage.getItem('BookmarkList'));
    displayBookmarks()
};

//Add Bookmark Functionality
function addBookmark(){
    if(checkTitle(urlTitleInput.value) && checkURL(urlInput.value) ){
        let bookmark = {
            title: urlTitleInput.value,
            url: urlInput.value,
        }
        BookmarkList.push(bookmark);
        localStorage.setItem('BookmarkList',JSON.stringify(BookmarkList));
        displayBookmarks();
        clearTitleField();
        clearUrlField();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Bookmark has been added successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    }
};
//Display Bookmark Functionality
function displayBookmarks(){
    let bookmarksHTML = '';
    for (let i = 0; i < BookmarkList.length; i++) {
        index=i;
        bookmarksHTML+=`
            <div class="urlContainer d-flex justify-content-between p-3 border-bottom mx-5 my-3 border-dark-subtle rounded-3 secondary-font">
                <h3><span>${i + 1} -</span> ${BookmarkList[i].title}</h3>
                <div class="btn-container d-flex justify-content-around w-50">
                <a href="#" onclick="visitBookmark(${i})" target="_blank" class="text-decoration-none btn btn-outline-primary"><i class="fa-solid fa-arrow-up-right-from-square me-3"></i>Open</a>                    <button class="btn btn-outline-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can me-3"></i>Delete</button>
                <button class="btn btn-outline-secondary" onclick="setUpdateBookmark(${i})"><i class="fa-solid fa-pen me-3"></i>Update</button>
                </div>
            </div>`
    }
    rowData.innerHTML=bookmarksHTML;
};
// Visit Bookmark Functionality
function visitBookmark(index) {
    let url = BookmarkList[index].url;
    if (!url.includes('http://') && !url.includes('https://')) {
        url = 'https://' + url;
    }
    window.open(url, '_blank');
};
//Delete Bookmark Functionality
function deleteBookmark(deleteIndex){
    BookmarkList.splice(deleteIndex,1);
    localStorage.setItem('BookmarkList',JSON.stringify(BookmarkList));
    displayBookmarks();
    clearTitleField();
    clearUrlField();
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Bookmark has been deleted successfully",
        showConfirmButton: false,
        timer: 1500
    });
};
//Set the form for update Functionality
function setUpdateBookmark(setUpdateIndex){
    index=setUpdateIndex;
    urlTitleInput.value = BookmarkList[setUpdateIndex].title;
    urlInput.value = BookmarkList[setUpdateIndex].url;
    updateBtn.classList.remove('d-none');
    addBtn.classList.add('d-none');
    displayNameClear();
    displayUrlclear();
};
//Update the Bookmark Functionality
function updateBookmark(){
    if(checkTitle(urlTitleInput.value) && checkURL(urlInput.value) ){
        BookmarkList[index].title=urlTitleInput.value;
        BookmarkList[index].url=urlInput.value;
        displayBookmarks();
        localStorage.setItem('BookmarkList',JSON.stringify(BookmarkList));
        addBtn.classList.remove('d-none');
        updateBtn.classList.add('d-none');
        clearTitleField();
        clearUrlField();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Bookmark has been updated successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    }
    if (!url.includes('http://') && !url.includes('https://')) {
        url = 'https://' + url;
    }
};
//Validation Title Functionality
function checkTitle(urlName){
    let validateName = /^[a-zA-Z0-9].{2,30}$/
    if(validateName.test(urlName)){
        urlTitleInput.classList.add('is-valid');
        urlTitleInput.classList.remove('is-invalid');
        return true
    }else{
        urlTitleInput.classList.add('is-invalid')
        urlTitleInput.classList.remove('is-valid')
        return false
    }
};
//Validation URL Functionality
function checkURL(url) {
    urlInput.value = url; // Update the input field with the modified URL if needed
    let validateUrl = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})(:[0-9]{1,5})?(\/[a-zA-Z0-9._-]+)*\/?(\?[a-zA-Z0-9=&_.-]+)?(#\w*)?$/;
    if (validateUrl.test(url)) {
        urlInput.classList.add('is-valid');
        urlInput.classList.remove('is-invalid');
        return true;
    } else {
        urlInput.classList.add('is-invalid');
        urlInput.classList.remove('is-valid');
        return false;
    }
};
//Search by name Functionality
function searchByName(){
    rowData.innerHTML='';
    let term = searchInput.value.toLowerCase();
    for(let i =0;i<BookmarkList.length;i++){
        let isIncluded = BookmarkList[i].title.toLowerCase().includes(term);
        if(isIncluded){
            rowData.innerHTML+=`
                <div class="urlContainer d-flex justify-content-between p-3 border-bottom mx-5 my-3 border-dark-subtle rounded-3 secondary-font">
                <h3><span>${i + 1} -</span> ${BookmarkList[i].title}</h3>
                <div class="btn-container d-flex justify-content-around w-50">
                <a href="#" onclick="visitBookmark(${i})" target="_blank" class="text-decoration-none btn btn-outline-primary"><i class="fa-solid fa-arrow-up-right-from-square me-3"></i>Open</a>                    <button class="btn btn-outline-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can me-3"></i>Delete</button>
                <button class="btn btn-outline-secondary" onclick="setUpdateBookmark(${i})"><i class="fa-solid fa-pen me-3"></i>Update</button>
                </div>
            </div>
            `;
        }
    }
}


