var spaceship = {
	particle: null, // particle retains position and velocity of spaceship
	mass: null,
	radius: null,
	turnRate: null,
	angle: null,
	thrust: null,		// vector
	thrusting: null,	// boolean
	drifting: null,		// boolean
	autoThrust: null,	// boolean
	brakeFriction: null,
	brakeUsing: null,	// boolean // this is lame use // think another way to know ship is using brake.

	create: function (x, y, speed, direction, radius, mass) {
		var obj = Object.create(this);
		obj.particle = particle.create(x, y, speed, direction, 0);
		obj.setRadius(radius || 1);
		obj.setTurnRate(0.2);
		obj.setAngle(0);
		obj.setThrust(vector.create(0, 0));
		obj.setThrusting(false);
		obj.setDrifting(true);
		obj.setAutoThrust(false);
		obj.setBrakeFriction(0.5);
		obj.setBrakeUsing(false);

		obj.setMass(mass || 1);

		return obj;
	},

	getParticle: function () {
		return this.particle;
	},
	getMass: function () {
		return this.mass;
	},
	getRadius: function () {
		return this.radius;
	},
	getTurnRate: function () {
		return this.turnRate;
	},
	getAngle: function () {
		return this.angle;
	},
	getThrust: function () {
		return this.thrust;
	},
	isThrusting: function () {
		return this.thrusting;
	},
	isDrifting: function () {
		return this.drifting;
	},
	isAutoThrust: function () {
		return this.autoThrust;
	},
	getBrakeFriction: function () {
		return this.brakeFriction;
	},
	isBrakeUsing: function () {
		return this.brakeUsing;
	},

	setMass: function (val) {
		this.mass = val;
	},
	setRadius: function (val) {
		this.radius = val;
	},
	setTurnRate: function (val) {
		this.turnRate = val;
	},
	setAngle: function (val) {
		this.angle = val;
	},
	setThrust: function (val) {
		this.thrust = val;
	},
	setThrusting: function (val) {
		this.thrusting = val;
	},
	setDrifting: function (val) {
		this.drifting = val;
	},
	setAutoThrust: function (val) {
		this.autoThrust = val;
	},
	setBrakeFriction: function (val) {
		this.brakeFriction = val;
	},
	setBrakeUsing: function (val) {
		this.brakeUsing = val;
	},

	controlOverspeed: function () {
		if (this.particle.velocity.getMagnitude() > 13) {
			this.particle.velocity.setMagnitude(13);
		}
	},
	brake: function () {
		var currentSpeed = this.particle.velocity.getMagnitude();
		currentSpeed -= this.brakeFriction; // brakeFriction is used to make variable friction overtime for fluent, easing stop.
		if (currentSpeed < 0) { // to prevent reversing
			currentSpeed = 0; // spaceship does not reverse. if you want to make a reverseable vehical, comment this if statement.
		}
		this.particle.velocity.setMagnitude(currentSpeed);
	},
	screenWrapping: function (width, height) {

		if (this.particle.position.x > width) {
			this.particle.position.setX(0);
		}
		else if (this.particle.position.x < 0) {
			this.particle.position.setX(width);
		}
		if (this.particle.position.y > height) {
			this.particle.position.setY(0);
		}
		else if (this.particle.position.y < 0) {
			this.particle.position.setY(height);
		}
	},
	updateThrust: function () {
		this.thrust.setDirection(this.angle);
		if (this.isAutoThrust()) {
			this.thrust.setMagnitude(0.1);
		}
		else {
			if (this.isThrusting()) {
				this.thrust.setMagnitude(0.1);
			}
			else {
				this.thrust.setMagnitude(0);
			}
		}
	},
	updateTurning: function () {
		this.particle.velocity.setDirection(this.angle);
	},
	update: function () {
		this.updateThrust();
		if (!this.isDrifting()) {
			this.updateTurning();
		}
		this.particle.accelerate(this.thrust);
		this.particle.updatePosition();
		this.controlOverspeed();
	}
}