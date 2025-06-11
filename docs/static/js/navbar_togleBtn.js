const toggleBtn = document.querySelector('.navbar_menu');
const depth1 = document.querySelector('.depth1');
const rightside = document.querySelector('.rightside');
console.log(toggleBtn);
console.log(depth1);
console.log(rightside);


toggleBtn.addEventListener('click', (e)=>{
    console.log('clicked...',e)
    e.stopPropagation();
    depth1.classList.toggle('active');
    rightside.classList.toggle('active');
});

document.addEventListener('clickleave', (e)=>{

    e.stopPropagation();
    depth1.classList.remove('active');
    rightside.classList.remove('active');
});

depth1.addEventListener('click', (e) => e.stopPropagation());
rightside.addEventListener('click', (e) => e.stopPropagation());