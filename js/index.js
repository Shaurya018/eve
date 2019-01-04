var Slider = function(options){
    this.options = options ? options : {};
    this.init()
  }
  
  Slider.prototype.init = function(){
      
    this.slider = document.querySelector('.slider1');
    
    this.container = this.slider.querySelector('.container1');
    
    this.sections = this.container.querySelectorAll('.section1');
    
    this.currentSection = 0;
    
    this.initAnimation();
    this.setLayout();
    this.bindEvent();
  }
  
  Slider.prototype.bindEvent = function(){
    document.querySelector('#prev').addEventListener('click', this.prev.bind(this))
    document.querySelector('#next').addEventListener('click', this.next.bind(this))
    
    document.addEventListener( 'mousewheel', this.onScroll.bind(this), false );     // Chrome/Safari/Opera
      document.addEventListener( 'DOMMouseScroll', this.onScroll.bind(this), false ); // Firefox
  }
  
  Slider.prototype.setLayout = function(){
    
    this.totalOfSection = this.sections.length;
    this.container.style.width = this.totalOfSection * 100 +"%"
    
    for(i=0; i<this.totalOfSection; i++){
      this.sections[i].style.width = 100 / this.totalOfSection + "%"
    }
  }
  
  Slider.prototype.initAnimation = function(){
    
    /* set default options */
    this.animationDuration = this.options.duration ? this.options.duration : 500;
    this.waitForAnimationEnd = typeof this.options.wait == "undefined" ? true :     this.options.wait;
    
    this.animationEnded = true;
    this.container.style.transition = "transform "+this.animationDuration+"ms";
    
  }
  
  Slider.prototype.goTo = function(index){
    if(this.animationEnded){
      this.container.style.transform = "translateX("+ -  index*100/this.totalOfSection + "%)";
    this.currentSection = index;
      
      if(this.waitForAnimationEnd){
        this.animationEnded = false;
         setTimeout(function(){
            this.animationEnded = true;
         }.bind(this), this.animationDuration);
      }
     
    }
    
  }
  
  Slider.prototype.prev = function(){
    var newIndex = this.currentSection-1;
    if(newIndex >= 0){
      this.goTo(newIndex);
    }else{
    }
  }
  
  Slider.prototype.next = function(){
    var newIndex = this.currentSection+1;
    if(newIndex <= this.totalOfSection-1){
      this.goTo(newIndex)
    }
  }
  
  Slider.prototype.onScroll = function(e){
    if(e.wheelDeltaY>0){
      console.log('scroll up');
      this.prev();
    }else if(e.wheelDeltaY<0){
      console.log('scroll down');
      this.next();
    }
  }
  
  
  
  var options = {
    duration : 700,
    wait : true
  }
  var slider = new Slider(options);