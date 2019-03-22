<template>
  <div>
    <h2>product List Two</h2>
    <ul>
      <li v-for="( product, index ) in products" :key ='index'>
        <span>{{product.name}}</span>
        <span>${{product.price}}</span>
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    props:'products',
    data(){
      return {
        
      }
    }
  }
</script>