/* ------------ Page Loader ------------ */ 
window.addEventListener("load", ()=>{
    document.querySelector(".page-loader").classList.add("slide-out-right");
    setTimeout(()=>{
        document.querySelector(".page-loader").style.display = "none";
    }, 1000);
})

/* ------------ Background Animation Effect ------------ */ 
function bgAnimationItems(){
    const rows = 7, cols= 10;
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            const div = document.createElement("div");
            div.className = `col-${j+1}`;
            document.querySelector('.bg-animation-effect').appendChild(div);
    }
}
};
bgAnimationItems();

/* ------------ Toggle Navbar ------------ */
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNavbar);

function toggleNavbar(){
    navToggler.classList.toggle('active');
    document.querySelector('.nav').classList.toggle('open');
    toggleOverlayEffect();
    toggleBodyScrolling();
}

/* ------------ Hide & Show Sections ------------ */
document.addEventListener("click", (e)=>{
    if (e.target.classList.contains("link-item") && e.target.hash !== "") {
        const hash = e.target.hash;
        if (e.target.classList.contains("nav-item")) {
            activeSection(hash);
            toggleNavbar();
        }else{
            toggleBodyScrolling();
            toggleOverlayEffect();
            document.querySelector(".nav-toggler").classList.add("toggle-hide");
            setTimeout(()=>{
                activeSection(hash);
                toggleOverlayEffect();
                toggleBodyScrolling();
                document.querySelector(".nav-toggler").classList.remove("toggle-hide");
            }, 950)
        }
    }
})

function activeSection(sectionId){
    document.querySelector("section.active").classList.remove("active");
    document.querySelector(sectionId).classList.add("active");
    window.scrollTo(0, 0);
}

/* ------------ Toggle Overlay Effect ------------ */
function toggleOverlayEffect() {
    document.querySelector('.overlay-effect').classList.toggle('active');
}

/* ------------ Toggle Body Scrolling ------------ */
function toggleBodyScrolling(){
    document.body.classList.toggle('hide-scrolling');
}

/* ------------ Filter Portfolio Items ------------ */ 
const filterBtnsContainer = document.querySelector('.portfolio-filter');
let portfolioItems;

filterBtnsContainer.addEventListener("click", (e)=>{
    if(e.target.classList.contains('portfolio-filter-btn') && !e.target.classList.contains('active')){
        filterBtnsContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        toggleBodyScrolling();
        document.querySelector(".filter-status").classList.add('active');
        document.querySelector('.filter-status').innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
        setTimeout(()=>{
            filterItems(e.target);
        }, 400);
        setTimeout(()=>{
            document.querySelector(".filter-status").classList.remove('active');
            toggleBodyScrolling();
        }, 800);
    }
})

function filterItems(filterBtn){
    const selectedCategory = filterBtn.getAttribute('data-filter');
    document.querySelectorAll('.portfolio-item').forEach((item) => {
        const category = item.getAttribute('data-category');
        if(category.indexOf(selectedCategory)!==-1 || selectedCategory==='all'){
            item.classList.add('show');
        }else{
            item.classList.remove('show');
        }
    });
    portfolioItems = document.querySelectorAll('.portfolio-item.show');
};
// filter active category items
filterItems(document.querySelector('.portfolio-filter-btn.active'));

/* ------------ Filter Items Details Popup ------------ */ 
let portfolioItemIndex;
document.addEventListener("click", (e)=>{
    if(e.target.closest(".portfolio-item")){
        const currentItem = e.target.closest('.portfolio-item');
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
        togglePopup();
        portfolioItemDetails();
        updateNextPrevItem();
    }
});

function togglePopup(){
    document.querySelector('.portfolio-popup').classList.toggle('open');
    toggleBodyScrolling();
}
document.querySelector('.popup-close-btn').addEventListener("click", togglePopup);

function portfolioItemDetails(){
    document.querySelector('.popup-thumbnail').src = portfolioItems[portfolioItemIndex].querySelector('img').src;
    
    document.querySelector('.popup-header h3').innerHTML = portfolioItems[portfolioItemIndex].querySelector('.portfolio-item-title').innerHTML;

    document.querySelector('.popup-body').innerHTML = portfolioItems[portfolioItemIndex].querySelector('.portfolio-item-details').innerHTML;

    document.querySelector('.popup-counter').innerHTML = `${portfolioItemIndex+1} of ${portfolioItems.length} ( <span title="category">${document.querySelector('.portfolio-filter-btn.active').innerHTML}</span> )`;
}

function updateNextPrevItem() {
    if(portfolioItemIndex !== 0){
        document.querySelector('.popup-footer-left').classList.remove('hidden');
        
        document.querySelector('.popup-footer-left h3').innerHTML = portfolioItems[portfolioItemIndex-1].querySelector("h3").innerHTML;
        
        document.querySelector('.popup-footer-left img').src = portfolioItems[portfolioItemIndex-1].querySelector("img").src;
    }else{
        document.querySelector('.popup-footer-left').classList.add('hidden');
    }
    
    if(portfolioItemIndex !== portfolioItems.length-1){
        document.querySelector('.popup-footer-right').classList.remove('hidden');
        
        document.querySelector('.popup-footer-right h3').innerHTML = portfolioItems[portfolioItemIndex+1].querySelector("h3").innerHTML;
        
        document.querySelector('.popup-footer-right img').src = portfolioItems[portfolioItemIndex+1].querySelector("img").src;
        
    }else{
        document.querySelector('.popup-footer-right').classList.add('hidden');
    }
};

document.querySelector(".popup-prev-btn").addEventListener("click", ()=>{
    changePortfolioItem('prev');
});
document.querySelector(".popup-next-btn").addEventListener("click", ()=>{
    changePortfolioItem('next');
});

function changePortfolioItem(direction){
    if(direction == 'prev'){
        portfolioItemIndex--;
    }else{
        portfolioItemIndex++;
    }
    document.querySelector('.popup-overlay').classList.add(direction);
    setTimeout(()=>{
        document.querySelector('.popup-inner').scrollTo(0, 0);
        portfolioItemDetails();
        updateNextPrevItem();
    }, 400);
    setTimeout(()=>{
        document.querySelector('.popup-overlay').classList.remove(direction);
    }, 1000);
}

/* ------------ Toggle Contact Form ------------ */ 
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains('toggle-contact-form-btn')){
        document.querySelector('.contact-form').classList.toggle('open');
        toggleBodyScrolling();
    }
})