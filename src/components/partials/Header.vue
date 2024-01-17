
<script>
export default {
  name: 'header'
}
</script>

<template>

  <header class="bg-primary">
    <nav>
      <ul>
        <li>
           <router-link class="text-white" :to="{name: 'home'}">home</router-link>
        </li>
      </ul>
    </nav>
  </header>

</template>


<style>

</style>