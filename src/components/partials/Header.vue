
<script>
export default {
  name: 'header'
}
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
           <router-link :to="{name: 'home'}">home</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>


<style>

</style>