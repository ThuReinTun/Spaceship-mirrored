var vector = {
	x: null,
	y: null,

	create: function (x, y) {
		var obj = Object.create(this);
		obj.x = x;
		obj.y = y;

		return obj;
	},

	getX: function () {
		return this.x;
	},
	getY: function () {
		return this.y;
	},
	setX: function (val) {
		this.x = val;
	},
	setY: function (val) {
		this.y = val;
	},

	getMagnitude: function () {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	},
	getDirection: function () {
		return Math.atan2(this.y, this.x);
	},
	setMagnitude: function (mag) { // mag refers to Magnitude of Vector
		var dir = this.getDirection();
		this.x = Math.cos(dir) * mag;
		this.y = Math.sin(dir) * mag;
	},
	setDirection: function (dir) { // dir refers to Direction of Vector
		var mag = this.getMagnitude();
		this.x = Math.cos(dir) * mag;
		this.y = Math.sin(dir) * mag;
	},

	add: function (v2) {
		return vector.create((this.x + v2.x), (this.y + v2.y));
	},
	substruct: function (v2) {
		return vector.create((this.x - v2.x), (this.y - v2.y));
	},
	multiply: function (v2) {
		return vector.create((this.x * v2.x), (this.y * v2.y));
	},
	divide: function (v2) {
		return vector.create((this.x / v2.x), (this.y / v2.y));
	},


	addTo: function (v2) {
		this.x += v2.x;
		this.y += v2.y;
	},
	substructFrom: function (v2) {
		this.x -= v2.x;
		this.y -= v2.y;
	},
	multiplyBy: function (v2) {
		this.x *= v2.x;
		this.y *= v2.y;
	},
	divideBy: function (v2) {
		this.x /= v2.x;
		this.y /= v2.y;
	}
}