<template>
  <div class="hello">
		<div class="upload">
			<input type="text" name="text" id="text" v-model="text">
			<input type="file" name="file" id="file" @change="uploadFile">
		</div>
		<button @click="drawImage(0,0)">画像を送信する</button>
			<input type="range" name="text" v-model="uploadedImage.x" @input='dx'>
			<input type="range" name="text" v-model="uploadedImage.y" @input='dy'>
		<button @click="drawText">テキストを送信する</button>
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
      msg: 'Welcome to Your Vue.js App',
      text: '',
			uploadedImage : {
				path: false,
				x: 0,
				y: 0,
			},
    }
  },
	//mountedはすべて読み込まれてから発火。createdは読み込まれる前に発火
	mounted: function(){
		const canvas = document.getElementById('test');
		//描写オブジェクトの呼び出し
		const ctx = canvas.getContext('2d');


		show().then(console.log('hopge'));

		async function getData(){
			console.log('ho')
			return 'success';
		}

		async function show(){
			const data = await getData();
		}

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
		uploadFile: function(event){
			const files = event.target.files
			const reader = new FileReader();
			//なぜか必要理由を調べるべき
			reader.readAsDataURL(files[0]);

			reader.onload = e => {
				this.uploadedImage.path = e.target.result;
			};
		},
		drawImage: function(x, y){
			const canvas = document.getElementById('test');
			//描写オブジェクトの呼び出し
			const ctx = canvas.getContext('2d');
				this.insertImage(ctx, this.uploadedImage.path, x, y);
		},
		drawText: function(){
			const canvas = document.getElementById('test');
			//描写オブジェクトの呼び出し
			const ctx = canvas.getContext('2d');
			ctx.font = "bold 64px YuGothic";
			ctx.fillText(this.text, 100,100);
		},
		dx: function(){
			const canvas = document.getElementById('test');
			//描写オブジェクトの呼び出し
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			this.drawImage(this.uploadedImage.x, this.uploadedImage.y)
		},
		dy: function(){
			const canvas = document.getElementById('test');
			//描写オブジェクトの呼び出し
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			this.drawImage(this.uploadedImage.x, this.uploadedImage.y)
		},
	},
}

</script>
<style>
#test{
	border: 1px solid black;
    background-image: url("~@/../static/back.jpg");
}
.hello{
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
