<template>
  <div>
    <!-- <h2>product-list-one</h2> -->
    <product-list-one>
    </product-list-one>
    <!-- <h2>product-list-two</h2> -->
    <product-list-two>
    </product-list-two>
  </div>
</template>


<script>
import productListOne from './components/productListOne.vue'
import productListTwo from './components/productListTwo.vue'
  export default {
    components:{
      'product-list-one':productListOne,
      'product-list-two':productListTwo  
    },
    data(){
      return {
        
        
      }
    },computed: {
      products(){
        console.log('22',this)
      }
    },

  }
</script>


