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

	create: function (x, y, radius, mass) {
		var obj = Object.create(this);
		obj.particle = particle.create(x, y, 0, 0, 0);
		obj.setRadius(radius);
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
	screenCollision: function (width, height) { // not very realistic yet // need to apply better physics
		var angle = this.particle.velocity.getDirection();

		if (this.particle.position.x > width) {
			this.particle.velocity.setDirection(angle - (Math.PI / 2));
		}
		else if (this.particle.position.x < 0) {
			this.particle.velocity.setDirection(angle + (Math.PI / 2));
		}
		if (this.particle.position.y > height) {
			this.particle.velocity.setDirection(angle + (Math.PI / 2));
		}
		else if (this.particle.position.y < 0) {
			this.particle.velocity.setDirection(angle - (Math.PI / 2));
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
	},

	//// /* /* View Controller Starts here */ */ 
	/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
	
	render: function (context, width, height, shipColor) {

		// translate and rotate
		context.save();
		context.translate(this.particle.position.x, this.particle.position.y);
		context.rotate(this.angle); // VERY BIG DIFFERENCE between ship.velocity.getDirection and thrust.getDirection()

		// Draw roket body triangle 
		context.beginPath();
			/* triangle head */
		context.moveTo(-10, -10);
		context.lineTo(-10, 10);
		context.lineTo(20, 0);
		context.lineTo(-10, -10);
			/* exhaust */
		context.moveTo(-10, -10);
		context.lineTo(-15, -5);
		context.moveTo(-10, 10);
		context.lineTo(-15, 5);

		context.stroke();

			/* round body */
		context.beginPath();
		context.moveTo(-10, 20);
		context.lineTo(-10, -20);
		context.stroke();

		context.beginPath();
		context.arc(-10, 0, 15, -(Math.PI) / 2, Math.PI / 2, false);
		context.stroke();

		context.fillStyle = shipColor;
		context.fill();

		// red color filling for brake
		if (this.isBrakeUsing()) {
			context.fillStyle = "rgba(255, 0, 0, 0.8)";
			context.fill();
		}

		// Draw ignition triangle // this is lame // need to built modular objects 
		if (this.isThrusting() || this.isAutoThrust()) {
			context.beginPath();
			context.moveTo(-10, 5);
			context.lineTo(-25, 0);
			context.lineTo(-10, -5);
			context.fillStyle = "rgba(255, 100, 0, 0.8)";
			context.fill();

			// Draw ignition cluster particles // ignition consumes performance
			// 1000 spaceships on screen with the following ignition cluster particles will make the screen lag.
			for (var i = 0; i < 5; i ++) {
				var x = Math.random() * (50 - 20) - 40,
					y = Math.random() * (30 - 10) - 10;

				context.beginPath();
				context.arc(x, y, 1, 0, Math.PI * 2, false);
				context.strokeStyle = context.fillStyle = "rgba(250, 100, 0, 1)";
				context.stroke();
			}
		}

		// restore context state
		context.restore();

		// screen Wrapping of ship // to stay inside the screen
				// you can use either of the two below
		// this.screenCollision(width, height);
		this.screenWrapping(width, height);
	}
}