<template>
  <div id="product-one">
    <h2>product List One</h2>
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
    computed: {
      products(){
        console.log(this)
        return this.$store.state.products
      }
    }
  }
</script>