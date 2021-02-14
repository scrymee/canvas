<template>
  <div class="hello">
		<canvas id="test" width=900 height=1600></canvas>
		<!--		<img src ="../assets/logo.png">-->
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
	//mountedはすべて読み込まれてから発火。createdは読み込まれる前に発火
	mounted: function(){
		const canvas = document.getElementById('test');
		//描写オブジェクトの呼び出し
		const ctx = canvas.getContext('2d');

		this.insertImage(ctx, require("../assets/01.png"), 10, 40);



	},
	methods :{
		insertImage: function(ctx, img_path, dx, dy){
			var img = new Image();
			img.src = img_path;
			img.onload = () => {
				ctx.drawImage(img, dx, dy);
			};
		},
		drawMoney: function(ctx, img_path, dx, dy){
			//canvasに文字を記載する
			ctx.font = "32px Comic Sans MS";
			const y = 350;
			ctx.strokeStyle = '#f00';
			ctx.strokeText("2,200", y, 50);

			ctx.font = "bold 16px YuGothic";
			ctx.fillText("円", y + 88, 50);

			ctx.font = "8px YuGothic";
			ctx.fillText("(税込)", y + 86, 31);
		},
	},
}

</script>
<style>
#test{
	border: 1px solid black;
}
</style>

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
</style>
