jQuery(document).ready(function ($) {    

    let autoPlayDelay = 1500;

    if($('.homeslider').length){
        function slideNext(){
            setTimeout(() => {
                $(".top_border_thumb").css("width", 0);
                $(".right_border_thumb").css("height", 0);
                $(".bottom_border_thumb").css("width", 0);
                $(".left_border_thumb").css("height", 0);
                // $(".top_border_thumb").css("width", '100%');
                // $(".right_border_thumb").css("height", '100%');
                // $(".bottom_border_thumb").css("width", '100%');
                // $(".left_border_thumb").css("height", '100%');
                
                swiper2.slideNext();    
            }, 200);
        }    
    
        setInterval(function() {
            slideNext();
        }, 5000);
        
    
        var swiper = new Swiper(".homepageslider-thumbs", {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            initialSlide: 1,
            allowTouchMove: false,
            effect: "fade",
            pagination: {
                el: ".slider__count-wrapper",
                type: "fraction",
            }, 
        });
    
        var swiper2 = new Swiper(".homeslider__main", {
            init: true,
            //slidesPerView: 1,
            centeredSlides: false,
            loop: false,
            effect: "fade",
            // navigation: {
            //     nextEl: ".swiper-button-next",
            //     prevEl: ".swiper-button-prev",
            // },
            autoplay: {
                delay: autoPlayDelay
            },
            thumbs: {
                swiper: swiper,
            },
            allowTouchMove: false,    
            on:{
                init: function(){
                    var numberofslides = parseInt($(".homeslider__main").attr("numslides"));
                    //if(numberofslides < 10 && (numberofslides = "0" + numberofslides))
                    $(".homeslider__thumbs .nexttextbtn").on("click", function(e) {
                        slideNext();
                    })
                }
            },
            slideNextTransitionStart: function() {
                swiper2.slideNext();
            }    
        });


        let slidersCount = swiper2.params.loop ? swiper2.slides.length - 2 : swiper2.slides.length;
        let widthParts = 100 / slidersCount;
        console.log(slidersCount);
        
        $('.swiper-counter .total').html(slidersCount);
        for(let i=0; i<slidersCount; i++){
            $('.swiper-progress-bar .progress-sections').append('<span></span>');
        }
        
        function initProgressBar(){
            let calcProgress = (slidersCount-1) * (autoPlayDelay + swiper2.params.speed);
            calcProgress += autoPlayDelay;
            $('.swiper-progress-bar .progress').animate({
                width: '100%'
            }, calcProgress, 'linear');
        }
        
        initProgressBar();
        
        swiper2.on('slideChange', function () {
            let progress = $('.swiper-progress-bar .progress');
            let activeIn = this.activeIndex + 1;
            activeIn = activeIn < 10 && (activeIn = "0" + activeIn)
            $('.swiper-counter .current').html(activeIn);
            
            if( 
                ( 
                    this.progress == -0 || (this.progress == 1 && this.params.loop) 
                ) && !progress.parent().is('.stopped')
            ){
                progress.css('width', '0');
                if(this.activeIndex == 0){
                    initProgressBar();
                }
            }
            
            if(progress.parent().is('.stopped')){		   
                progress.animate({
                    'width': Math.round(widthParts * (this.activeIndex + 1)) + '%'
                }, this.params.speed, 'linear');
            }
        });
    }
    
    var mySwiper = new Swiper ('.customsider', {
        
        speed: 1000,        
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 80,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
    });
});
