<script>
import { store } from '../../data/store';
import axios from 'axios';

export default {
  name: 'FooterComponent',
  data() {
    return {
      store
    }
  }
}
</script>
<template>

  <footer>
    <div class="container">

      <div class="row top-footer row-cols-2 row-cols-md-3 ">
        <div class="col">
          <h4>Discover Deliveboo</h4>
          <ul>
            <li>
              <a href="#">Restaurants</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contacts</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Work With Us</a>
            </li>
          </ul>
        </div>
        <div class="col">
          <h4>Legal Notices</h4>
          <ul>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Information</a>
            </li>
            <li>
              <a href="#">Cookies</a>
            </li>
          </ul>
        </div>
        <div class="col d-none d-md-block">
          <h4>Take Deliveboo With You</h4>
          <ul>
            <li class="mb-1">
              <a href="#">
                <img src="/public/img/scarica-da-app-store.png" alt="" width="125px">
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/public/img/google-store.png" alt="" width="125px">
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="row bottom-footer">
        <div class="col">
          <div class="social">
            <h6>Seguici su</h6>
            <ul class="d-flex flex-row">
              <li class="me-1">
                <a href="#">
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-brands fa-x-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col d-flex justify-content-end align-items-end">
          <div class="copyright">
            <i class="fa-regular fa-copyright"></i>
            <span>2024 Deliveboo</span> 
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>

<style lang="scss" scoped>
@use '../../scss/main.scss' as *;
footer {
  // margin: 50px 0 0 0;
  padding: 50px 0 20px 0;
  background-color: $quaternary_color;
  color: $quinary_color;
  .top-footer {
    margin-bottom: 20px;
    .col {
      margin-bottom: 15px;
    }
    h4 {
      color: $primary_color;
      margin-bottom: 20px;
    }
    a {
      color: $quinary_color;
      &:hover {
        color: $tertiary_color;
      }
    }
  }
  .bottom-footer {
    .copyright {
      text-align: end;
      font-size: 0.7rem;
    }
    
    .social {
      .fa-brands {
        margin: 0 10px 0 0;
        color: $primary_color;
      }
      .fa-instagram:hover {
        color: #C13584;
        // background: linear-gradient(45DEG, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
      }
      .fa-facebook:hover {
        color: #3b5998;
      }
      .fa-x-twitter:hover {
        background-color: black;
        color: white;
      }
    }
  }
}

ul {
  margin: 0;
  padding: 0;
}


</style>