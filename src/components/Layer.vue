<template>
  <div class="hello">
		<button v-on:click="same">合成</button>
		<div id="can">
			<HelloWorld canvasname='canvas1'></HelloWorld>
			<HelloWorld canvasname='canvas2'></HelloWorld>
		</div>
		<hr>
		<div>
			<canvas id="canvas_res" width=1000 height=1000></canvas>
		</div>
  </div>
</template>

<script>

import HelloWorld from './HelloWorld.vue'
export default {
  name: 'Layer',
  data () {
    return {
    }
  },
	components: {
		HelloWorld
	},
	mounted: function(){
	},
	methods :{
		same: function(){

			const ctx1 = document.getElementById('canvas1').getContext('2d');
			const ctx2 = document.getElementById('canvas2').getContext('2d');

			const ctx_res = document.getElementById('canvas_res').getContext('2d');
			ctx_res.drawImage(this.createImage(ctx1.canvas), 0, 0);
			ctx_res.drawImage(this.createImage(ctx2.canvas), 0, 0);
		},
		createImage: function(canvas){
			const img = new Image();
			img.src = canvas.toDataURL();
			return img;
		},
	},
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#canvas_res{
	border: 1px solid #666;
	width: 50%;
	height: 50%;
}

.hello{
	position:relative;
}


#canvas1, #canvas2{
	position: absolute;
	top:0;
	left:0;
}
</style>
