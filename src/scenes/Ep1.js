
// You can write more code here

/* START OF COMPILED CODE */

class Ep1 extends Phaser.Scene {

	constructor() {
		super("Ep1");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	preload() {

		this.load.pack("ep-pack", "assets/ep-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// _1_back
		const _1_back = this.add.image(642, 358, "_1_back");
		_1_back.scaleX = 0.67;
		_1_back.scaleY = 0.67;

		// floor_1
		const floor_1 = this.add.container(148, 669);

		// _1_flor
		const _1_flor = this.add.image(0, 2, "_1_flor");
		floor_1.add(_1_flor);

		// _1_flor_1
		const _1_flor_1 = this.add.image(298, 0, "_1_flor");
		floor_1.add(_1_flor_1);

		// _1_flor_2
		const _1_flor_2 = this.add.image(596.10546875, 1.09423828125, "_1_flor");
		floor_1.add(_1_flor_2);

		// _1_flor_3
		const _1_flor_3 = this.add.image(893.7147216796875, 1.15008544921875, "_1_flor");
		floor_1.add(_1_flor_3);

		// _1_flor_4
		const _1_flor_4 = this.add.image(1191, 0, "_1_flor");
		floor_1.add(_1_flor_4);

		// play
		const play = this.add.image(1232, 47, "play");
		play.scaleX = 0.08;
		play.scaleY = 0.08;

		// score
		const score = this.add.image(1082, 50, "score");
		score.scaleX = 0.3;
		score.scaleY = 0.3;

		// life
		const life = this.add.container(64, 52.72999954223633);

		// heart
		const heart = this.add.image(0, 3.270000457763672, "heart");
		heart.scaleX = 0.11;
		heart.scaleY = 0.11;
		life.add(heart);

		// heart_1
		const heart_1 = this.add.image(66.97999572753906, 3.8699989318847656, "heart");
		heart_1.scaleX = 0.11;
		heart_1.scaleY = 0.11;
		life.add(heart_1);

		// heart_2
		const heart_2 = this.add.image(139.16000366210938, 2.8300018310546875, "heart");
		heart_2.scaleX = 0.11;
		heart_2.scaleY = 0.11;
		life.add(heart_2);

		// heart_3
		const heart_3 = this.add.image(210.75, 0.8899993896484375, "heart");
		heart_3.scaleX = 0.11;
		heart_3.scaleY = 0.11;
		life.add(heart_3);

		// heart_4
		const heart_4 = this.add.image(282.239990234375, 0, "heart");
		heart_4.scaleX = 0.11;
		heart_4.scaleY = 0.11;
		life.add(heart_4);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here



	create() { 

		this.editorCreate();
		this.Ep1setupWorld();
		this.Ep1setupPlayer();
		this.Ep1setupControls();
	}

	//물리 세계//
	Ep1setupWorld() {
		// 바닥 생성 (충돌용)
		this.ground = this.physics.add.staticImage(640, 700, null)
			.setDisplaySize(1280, 20)
			.setVisible(false);
	}

	//플레이어 생성//
	Ep1setupPlayer() {
		this.player = this.physics.add.sprite(199, 530, "pote");
		this.player.setScale(0.35);   // 기본 크기
		this.originalScale = 0.35;    // 원래 크기 저장

		this.player.setGravityY(900);
		this.player.setCollideWorldBounds(true);

		const bodyWidth = this.player.width * 0.35 * 0.55;   // 이미지보다 좁게
    	const bodyHeight = this.player.height * 0.35 * 3.8; // 아랫부분만 충돌하도록
    	this.player.body.setSize(bodyWidth, bodyHeight);

		 this.player.body.setOffset(
        (this.player.width * 0.35 - bodyWidth) / 2,  // 좌우 가운데 정렬
        this.player.height * 0.35 * 0.55             // 아래쪽에 충돌박스 고정
    );

		this.physics.add.collider(this.player, this.ground);
	}

	//키 입력 정의//
	Ep1setupControls() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		// 마우스 클릭 점프
		this.input.on("pointerdown", () => this.Ep1playerJump());
	}

	//점프 함수//
	Ep1playerJump() {
		if (this.player.body.onFloor()) {
			this.player.setVelocityY(-450);
		}
	}

	update() {

		// ★ 스페이스바 점프
		if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
			this.Ep1playerJump();
		}

		// ★ ↓ 방향키 → 작아짐
		if (this.cursors.down.isDown) {
			this.player.setScale(this.originalScale * 0.7); // 약 30% 작아짐
		} else {
			// ↓ 키에서 손 떼면 원래 크기로
			this.player.setScale(this.originalScale);
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
