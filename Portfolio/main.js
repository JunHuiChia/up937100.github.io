$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $(".navbar").addClass("sticky");
        }else{
            $(".navbar").removeClass("sticky");
        }
    })

    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
    })

    // typing animation
    var typed = new Typed(".typing",{
        strings: ["^700 Web Developer"],
        typeSpeed: 85,
        backSpeed: 60,
        loop: false
    })

})