<template>
  <div class="hello">
    <h1>{{ canvasname }}</h1>
		<div class="form">
			<img :src="imagePath" v-show="imagePath">
			<p class="label">テキスト</p>
			<input type="text" name="text" id="text" v-model="uploadedText.msg">
			<!-- 初期値が100でないとダメ? -->
			<button @click="drawText(0,100)">テキストを送信する</button><br>
			<p class="label">テキスト位置調整</p>
			<input type="range" name="text" v-model="uploadedText.x" @input='dxyText' max="1000" min='-1000'>
			<input type="range" name="text" v-model="uploadedText.y" @input='dxyText' max="1000" min="-1000">
			<p class="label">画像反映</p>
			<input type="file" name="file" id="file" @change="uploadFile">
			<button @click="drawImage(0,0)">画像を送信する</button><br>
			<p class="label">画像位置調整</p>
			<input type="range" name="text" v-model="uploadedImage.x" @input='dx' max="1000" min='-1000'>
			<input type="range" name="text" v-model="uploadedImage.y" @input='dy' max="1000" min="-1000">
			<p class="label">未実装</p>
			<button @click="changeCanvasToImage">画像に設定する</button>
		</div>
		<div class="canvas-area">
			<canvas :id="canvasname" class="canvas" width=1000 height=1000></canvas>
		</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
	props: {
		canvasname: {
			default: '',
			type: String
		}
	},
  data () {
    return {
			canvas: '',
			uploadedText: {
				msg: '',
				x: 0,
				y: 0,
			},
			imagePath: false,
			uploadedImage : {
				path: false,
				x: 0,
				y: 0,
			},
    }
  },
	//mountedはすべて読み込まれてから発火。createdは読み込まれる前に発火
	mounted: function(){
		const canvas = document.getElementById(this.canvasname);
		this.canvas = canvas;
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
			//描写オブジェクトの呼び出し
			const ctx = this.canvas.getContext('2d');
				this.insertImage(ctx, this.uploadedImage.path, x, y);
		},
		drawText: function(x, y){
			//描写オブジェクトの呼び出し
			const ctx = this.canvas.getContext('2d');
			ctx.font = "bold 64px YuGothic";
			ctx.fillText(this.uploadedText.msg, x, y);
		},
		dx: function(){
			//描写オブジェクトの呼び出し
			const ctx = this.canvas.getContext('2d');
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.drawImage(this.uploadedImage.x, this.uploadedImage.y)
		},
		dy: function(){
			//描写オブジェクトの呼び出し
			const ctx = this.canvas.getContext('2d');
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.drawImage(this.uploadedImage.x, this.uploadedImage.y)
		},
		dxyText: function(){
			//描写オブジェクトの呼び出し
			const ctx = this.canvas.getContext('2d');
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.drawText(this.uploadedText.x, this.uploadedText.y)
		},
		changeCanvasToImage(){
			  var png = this.canvas.toDataURL();
			this.imagePath = png
		},
	},
}

</script>
<style>
#test{
	border: 1px solid black;
}
body{
	/**
    background-image: this.url("~@/../static/back.jpg");
		**/
}

	/**
		理由は謎だけどcanvasはcssでwidthを指定するとcanvasサイズというより、拡大出苦笑扱いになる
		**/
.canvas{
	border: 1px solid black;
	width:50%;
	height:50%;
}

.form, .canvas-area{
	display: inline-block;
	width: 40vw;
}
.form{
	text-align: left;
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

.label{
	margin:0;
	font-weight: bold;
}
</style>
