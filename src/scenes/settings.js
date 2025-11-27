
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

		// shadow
		const shadow = this.add.image(639, 362, "shadow");
		shadow.scaleX = 0.67;
		shadow.scaleY = 0.681;

		// my_map
		const my_map = this.add.image(635, 360, "my_map");
		my_map.scaleX = 1.65;
		my_map.scaleY = 1.6;

		// my_txt1
		const my_txt1 = this.add.image(432, 239, "my_txt1");
		my_txt1.scaleX = 0.18;
		my_txt1.scaleY = 0.18;

		// my_prog1
		const my_prog1 = this.add.image(647, 285, "my_prog1");
		my_prog1.scaleX = 0.9;
		my_prog1.scaleY = 0.9;

		// my_txt2
		const my_txt2 = this.add.image(434, 338, "my_txt2");
		my_txt2.scaleX = 0.23;
		my_txt2.scaleY = 0.23;

		// my_prog2
		const my_prog2 = this.add.image(647, 390, "my_prog2");
		my_prog2.scaleX = 0.9;
		my_prog2.scaleY = 0.9;

		// my_txt3
		const my_txt3 = this.add.image(438, 437, "my_txt3");
		my_txt3.scaleX = 0.2;
		my_txt3.scaleY = 0.2;

		// my_color
		const my_color = this.add.image(547, 474, "my_color");
		my_color.scaleX = 0.2;
		my_color.scaleY = 0.2;

		// x_btn
		const x_btn = this.add.image(979, 204, "x_btn");
		x_btn.scaleX = 0.05;
		x_btn.scaleY = 0.05;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.setupCloseButton();
	}

	//X 버튼 닫기//
	setupCloseButton() {
		const btn = this.children.list.find(o => o.texture?.key === "x_btn");
		if (!btn) return;

		btn.setInteractive({ useHandCursor: true });

		btn.on("pointerdown", () => {
			this.scene.stop();
			this.scene.resume("player_pg");
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
