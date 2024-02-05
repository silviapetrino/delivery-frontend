<script>

export default {
  name: 'Jumbotron',
  methods: {
    nextSlide() {
      $('#jumbocarousel').carousel('next');
    },
   
  },
  mounted() {
    setInterval(() => {
      this.nextSlide();
    }, 9000);
  },
};
</script>
<template>

  <div class="jumbotron text-center">
    <!-- carousel  -->
  
        <div id="jumbocarousel" class="carousel slide mb-3" data-bs-ride="carousel">

          <div class="carousel-inner h-100">
            <div class="carousel-item active">
              <img src="/img/prova-1.png" class="d-block w-100 h-100 object-fit-cover " alt="slide-1">
              <a class="btn-cs" href="#search-restaurant">
                <span>Find your favourite restaurant</span>
                <i class="ms-1 fa-solid fa-utensils ps-2"></i>
              </a>
            </div>
            <div class="carousel-item">
              <img src="/img/prova-2.png" class="d-block w-100 h-100 object-fit-cover " alt="slide-2">
              <a class="btn-cs beta" href="#search-restaurant">
                <span >Let's order something delicius</span>
                <i class="fa-solid fa-face-laugh-wink ps-2"></i>
              </a>
            </div>
          </div>

        </div>
    <!-- /carousel  -->
  </div>
  
  
</template>


<style lang="scss" scoped>
@use '../../scss/main.scss' as *;


#jumbocarousel {
    position: relative;
    
    .btn-cs {
      position: absolute;
      border-radius: 25px;
      text-decoration: none;
      background-color: $detail_color;
      color: $primary_color;
      padding: 5px;
      width: 160px;
      bottom: 15px;
      left: 90px;
      font-size: 10px;
      &:hover{
        color: $detail_color;
        background-color: $primary_color;
      }
    }
    .beta{
      background-color: $secondary_color;
    }

}

@media all and (min-width: 440px){

  #jumbocarousel {

    .carousel-item{
      height:625px;
    }
    .btn-cs {
      bottom: 20px;
      left: 93px;     
      }
  }

}


@media all and (min-width: 545px){

  #jumbocarousel {
    .btn-cs {
      bottom: 25px;
      left: 108px;
      font-size: 12px;
      width: 185px;     
      }
  }

}


@media all and (min-width: 600px){

    #jumbocarousel {
      .btn-cs {
        bottom: 30px;
        left: 125px;     
      }
  }
 
}
@media all and (min-width: 700px){

  #jumbocarousel {
    .btn-cs {
      bottom: 35px;
      left: 135px;     
    }
  }

}

@media all and (min-width: 750px){

#jumbocarousel {
  .btn-cs {
    width: 225px;
    font-size: 15px;
    bottom: 40px;
    left: 150px;     
    }
  }

}

@media all and (min-width: 840px){

  #jumbocarousel {
    .btn-cs {
        left: 170px;     
      }
    }

}

@media all and (min-width: 920px){

#jumbocarousel {
  .btn-cs {
      width: 240px;
      left: 180px;     
    }
  }

}

@media all and (min-width: 1000px){

#jumbocarousel {
  .btn-cs {
      left: 200px;
      bottom: 50px;
      font-size: 17px;    
      width: 250px;
      padding: 6px; 
    }
  }

}

@media all and (min-width: 1100px){

#jumbocarousel {
  .btn-cs {
      width: 270px;
      left: 225px;
      bottom: 60px;
      padding: 8px;     
    }
  }

}

@media all and (min-width: 1200px){

#jumbocarousel {
  .btn-cs {
      left: 243px;
      bottom: 70px;
      padding: 9px;   
    }
  }

}

@media all and (min-width: 1300px){

#jumbocarousel {
  .btn-cs {
      width: 300px;
      font-size: 20px;
      left: 260px;
      padding: 10px; 
    }
  }

}


@media all and (min-width: 1400px){

    #jumbocarousel {

    .btn-cs {
        width: 340px;
        font-size: 22px;
        left: 290px;
        padding: 10px 15px; 
      }
    }
 
}

@media all and (min-width: 1500px){

    #jumbocarousel {
     
      .btn-cs {
          width: 350px;
          left: 310px; 
          padding: 13px 18px; 
        }
      }
}

</style>