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
    }, 5000);
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
            </div>
            <div class="carousel-item">
              <img src="/img/slide-2.jpg" class="d-block w-100 h-100 object-fit-cover" alt="...">
            </div>
          </div>
          <a href="#"></a>

        </div>
    <!-- /carousel  -->
  </div>
  
  
</template>


<style lang="scss">
@use '../../scss/main.scss' as *;


@media all and (min-width: 650px){
  .carousel-item{
    min-height: 400px;
    max-height: 600px;
  }
}
@media all and (min-width: 1100px){
  .carousel-item{
    min-height: 600px;
    max-height: 800px;
  }
}
@media all and (min-width: 1400px){
  .carousel-item{
    min-height: 800px;
    max-height: 1000px;
  }
}




</style>