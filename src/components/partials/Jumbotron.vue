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
    }, 7000);
  },
};
</script>
<template>

  <div class="jumbotron text-center">
    <!-- carousel  -->
  
        <div id="jumbocarousel" class="carousel slide mb-4" data-bs-ride="carousel">

          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/img/slide-1.jpg" class="d-block w-100 h-100 object-fit-cover" alt="...">
              <a class="btn-cs btn-danger" href="#search-restaurant">
                <span>Find your favourite restaurant</span>
                <i class="ms-1 fa-solid fa-utensils"></i>
              </a>
            </div>
            <div class="carousel-item">
              <img src="/img/slide-2.jpg" class="d-block w-100 h-100 object-fit-cover" alt="...">
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
      padding: 5px 10px;
      width: 150px;
      bottom: 25px;
      left: 110px;
      font-size: 15px;
      &:hover{
        color: $detail_color;
        background-color: $primary_color;
      }
    }
}

@media all and (min-width: 550px){

  #jumbocarousel {
    .btn-cs {
      bottom: 55px;
      left: 150px;     
      }
  }

}


@media all and (min-width: 600px){

    #jumbocarousel {
      .btn-cs {
        bottom: 50px;
        left: 170px;     
        }
  }
 
}

@media all and (min-width: 750px){

#jumbocarousel {
  .btn-cs {
    width: 160px;
    font-size: 15px;
    bottom: 80px;
    left: 220px;     
    }
  }

}

@media all and (min-width: 840px){

  #jumbocarousel {
    .btn-cs {
        left: 220px;     
      }
    }

}

@media all and (min-width: 920px){

#jumbocarousel {
  .btn-cs {
      width: 220px;
      left: 250px;     
    }
  }

}

@media all and (min-width: 1000px){

#jumbocarousel {
  .btn-cs {
      left: 270px;
      bottom: 120px;     
    }
  }

}

@media all and (min-width: 1100px){

#jumbocarousel {
  .btn-cs {
      width: 230px;
      left: 300px;
      bottom: 150px;     
    }
  }

}

@media all and (min-width: 1200px){

#jumbocarousel {
  .btn-cs {
      width: 230px;
      left: 340px; 
    }
  }

}

@media all and (min-width: 1300px){

#jumbocarousel {
  .btn-cs {
      width: 280px;
      font-size: 25px;
      left: 360px; 
    }
  }

}


@media all and (min-width: 1400px){

    #jumbocarousel {
    .btn-cs {
        width: 280px;
        font-size: 25px;
        left: 390px; 
      }
    }
 
}

@media all and (min-width: 1500px){

    #jumbocarousel {
      .btn-cs {
          width: 350px;
          left: 400px; 
          padding: 20px 5px;
        }
      }
}

</style>