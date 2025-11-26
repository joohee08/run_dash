
// You can write more code here

/* START OF COMPILED CODE */

class settings extends Phaser.Scene {

	constructor() {
		super("settings");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// my_back
		const my_back = this.add.image(643, 364, "my_back");
		my_back.setInteractive(new Phaser.Geom.Rectangle(0, 0, 1920, 1080), Phaser.Geom.Rectangle.Contains);
		my_back.scaleX = 0.67;
		my_back.scaleY = 0.681;

		// setting_btn
		const setting_btn = this.add.image(58, 64, "setting_btn");
		setting_btn.scaleX = 0.13;
		setting_btn.scaleY = 0.13;

		// my_btn2
		const my_btn2 = this.add.image(129, 622, "my_btn2");
		my_btn2.scaleX = 0.4;
		my_btn2.scaleY = 0.4;

		// my_btn3
		const my_btn3 = this.add.image(348, 625, "my_btn3");
		my_btn3.scaleX = 0.4;
		my_btn3.scaleY = 0.4;

		// my_btn4
		const my_btn4 = this.add.image(564, 624, "my_btn4");
		my_btn4.scaleX = 0.4;
		my_btn4.scaleY = 0.4;

		// pyogoni
		const pyogoni = this.add.image(352, 336, "pyogoni");
		pyogoni.scaleX = 0.9;
		pyogoni.scaleY = 0.9;

		// my_btn
		const my_btn = this.add.image(966, 617, "my_btn");
		my_btn.scaleX = 0.4;
		my_btn.scaleY = 0.4;

		// my_ques
		const my_ques = this.add.image(1145, 619, "my_ques");
		my_ques.scaleX = 0.1;
		my_ques.scaleY = 0.1;

		// shadow
		const shadow = this.add.image(639, 362, "shadow");
		shadow.scaleX = 0.67;
		shadow.scaleY = 0.681;

		// my_map
		const my_map = this.add.image(652, 379, "my_map");
		my_map.scaleX = 1.65;
		my_map.scaleY = 1.6;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
