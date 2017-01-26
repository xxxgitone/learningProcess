 function debounce(func, wait = 20, immediate = true) {
   var timeout;
   return function() {
     var context = this,
       args = arguments;
     var later = function() {
       timeout = null;
       if (!immediate) func.apply(context, args);
     };
     var callNow = immediate && !timeout;
     clearTimeout(timeout);
     timeout = setTimeout(later, wait);
     if (callNow) func.apply(context, args);
   };
 }

 const sliderImages = document.querySelectorAll('.slide-in');

 function checkslide(e) {
    sliderImages.forEach(slideImage => {
      const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height / 2;
      const imageBottom = slideImage.offsetTop + slideImage.height;

      const isHalfShown =  slideInAt > slideImage.offsetTop;
      const isNotScrollPass = window.scrollY < imageBottom;

      if (isHalfShown && isNotScrollPass) {
        slideImage.classList.add('active');
      }else{
        slideImage.classList.remove('active');
      }
    })

   // console.count(e);
 }

 window.addEventListener('scroll', debounce(checkslide));