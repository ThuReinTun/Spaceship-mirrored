var particle = {
	position: null,
	velocity: null,
	gravity: null,

	create: function (x, y, speed, direction, grav) {
		var obj = Object.create(this);

		obj.position = vector.create(x, y);
		obj.velocity = vector.create(0, 0);
		obj.velocity.setMagnitude(speed);
		obj.velocity.setDirection(direction);

		obj.gravity = vector.create(0, grav || 0);

		return obj;
	},

	getPosition: function () {
		return this.position;
	},
	getVelocity: function () {
		return this.velocity;
	},
	setPosition: function (x, y) {
		this.position.x = x;
		this.position.y = y;
	},
	setVelocity: function (speed, direction) {
		this.velocity.x = Math.cos(direction) * speed;
		this.velocity.y = Math.sin(direction) * speed;
	},

	accelerate: function (val) {
		this.velocity.addTo(val);
	},
	updatePosition: function () {
		// this.velocity.addTo(this.gravity); // no need gravity for now
		this.position.addTo(this.velocity);
	}
}