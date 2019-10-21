const canvas = document.createElement("canvas");
c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let imageData = c.createImageData(canvas.width, canvas.height);
document.body.appendChild(canvas);

(function loop() {
	for (let i = 0, a = imageData.data.length; i < a; i++) {
		imageData.data[i] = (Math.random() * 255)|0;
	}
		    
	c.putImageData(imageData, 0, 0);
	requestAnimationFrame(loop);
		    
})();