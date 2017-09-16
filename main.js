window.onload = function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var ship = spaceship.create(width / 2, height / 2, 0, 0),
		shipMirrored = [];

	ship.setAngle( Math.random() * Math.PI * 2);
	for (var i = 0; i < 6; i ++) {
		shipMirrored.push(spaceship.create(Math.random() * width, Math.random() * height, 0, 0));
		shipMirrored[i].setAngle(Math.random() * Math.PI * 2);
	}

	updateFrame(); // pdate calculations and render animations
	function updateFrame() {
		// clear context
		context.clearRect(0, 0, width, height);
		// update ship properties
		ship.update();
		for (var i = 0; i < 6; i ++) {
			shipMirrored[i].update();
		}
		// reder ship animation
		renderSpaceship(ship, "rgba(0, 0, 0, .5");
		for (var i = 0; i < 6; i ++) {
			renderSpaceship(shipMirrored[i], "rgba(255, 255, 255, 1");
		}
		// refresh recursive animation frame
		requestAnimationFrame(updateFrame);
	}

	// rendering ship Object // // reusable method
	function renderSpaceship(obj, color) {

		// translate and rotate
		context.save();
		context.translate(obj.particle.position.x, obj.particle.position.y);
		context.rotate(obj.angle); // VERY BIG DIFFERENCE between ship.velocity.getDirection and thrust.getDirection()

		// Draw roket body triangle // still lame // haven't built mvc 
		context.beginPath();
		context.moveTo(-10, -10);
		context.lineTo(-10, 10);
		context.lineTo(20, 0);
		context.lineTo(-10, -10);
		context.strokeStyle = "rgba(0, 0, 0, 1)";
		context.stroke();

		context.fillStyle = color;
		context.fill();

		// red color filling for brake
		if (obj.isBrakeUsing()) {
			context.fillStyle = "rgba(255, 0, 0, 0.8)";
			context.fill();
		}

		// Draw ignition triangle // this is lame // need to built modular objects 
		if (obj.isThrusting() || obj.isAutoThrust()) {
			context.beginPath();
			context.moveTo(-10, 5);
			context.lineTo(-25, 0);
			context.lineTo(-10, -5);
			context.fillStyle = "rgba(255, 100, 0, 0.8)";
			context.fill();

			// Draw ignition cluster particles // this is still lame // haven't built particle system yet.
			for (var i = 0; i < 5; i ++) {
				var x = Math.random() * (50 - 20) - 40,
					y = Math.random() * (30 - 10) - 10;

				context.beginPath();
				context.arc(x, y, 0.5, 0, Math.PI * 2, false);
				context.strokeStyle = context.fillStyle = "rgba(250, 100, 0, 1)";
				context.stroke();
			}
		}
		// restore context state
		context.restore();
		// screen Wrapping of ship // to stay inside the screen
		obj.screenWrapping(width, height);
	}

	// Event listener
	document.body.addEventListener("keydown", function(event){
		switch (event.keyCode) {
			case 38: // up
				ship.setThrusting(true);
				// mirrored
				for (var i = 0; i < 6; i ++) {
					shipMirrored[i].setThrusting(true);
				}
				break;
			case 32: // spacebar
				if (ship.isAutoThrust()) {
					ship.setAutoThrust(false);
				// mirrored
					for (var i = 0; i < 6; i ++) {
						shipMirrored[i].setAutoThrust(false);
					}
				}
				else {
					ship.setAutoThrust(true);
				// mirrored
					for (var i = 0; i < 6; i ++) {
						shipMirrored[i].setAutoThrust(true);
					}
				}
				break;
			case 16: // shift
				if (ship.isDrifting()) {
					ship.setDrifting(false);
				// mirrored
					for (var i = 0; i < 6; i ++) {
						shipMirrored[i].setDrifting(false);
					}
				}
				else {
					ship.setDrifting(true);
				// mirrored
					for (var i = 0; i < 6; i ++) {
						shipMirrored[i].setDrifting(true);
					}
				}
				break;
			case 40: // down
				ship.brake();
				ship.setBrakeUsing(true);
				// mirrored
				for (var i = 0; i < 6; i ++) {
					shipMirrored[i].brake();
					shipMirrored[i].setBrakeUsing(true);
				}
				break;
			case 37: // left
				ship.angle -= ship.turnRate;
				// mirrored
				for (var i = 0; i < 6; i ++) {
					if (i % 2 == 0) {
						shipMirrored[i].angle += shipMirrored[i].turnRate;
					}
					else {
						shipMirrored[i].angle -= shipMirrored[i].turnRate;
					}
				}
				break;
			case 39: //right
				ship.angle += ship.turnRate;
				// mirrored
				for (var i = 0; i < 6; i ++) {
					if (i % 2 == 0) {
						shipMirrored[i].angle -= shipMirrored[i].turnRate;
					}
					else {
						shipMirrored[i].angle += shipMirrored[i].turnRate;
					}
				}
				break;
			default:
				break;
		}
		console.log ("keycode = " + event.keyCode);
	});
	document.body.addEventListener("keyup", function(event){
		switch (event.keyCode) {
			case 38: // up
				ship.setThrusting(false);
				// mirrored
				for (var i = 0; i < 6; i ++) {
					shipMirrored[i].setThrusting(false);
				}
				break;
			case 40: // down
				ship.setBrakeUsing(false);
				// mirrored
				for (var i = 0; i < 6; i ++) {
					shipMirrored[i].setBrakeUsing(false);
				}
				break;
			case 37: // left
				break;
			case 39: //right
				break;
			default:
				break;
		}
	});
}