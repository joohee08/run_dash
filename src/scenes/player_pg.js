
// You can write more code here

/* START OF COMPILED CODE */

class player_pg extends Phaser.Scene {

	constructor() {
		super("player_pg");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// my_back
		const my_back = this.add.image(641, 358, "my_back");
		my_back.setInteractive(new Phaser.Geom.Rectangle(0, 0, 1920, 1080), Phaser.Geom.Rectangle.Contains);
		my_back.scaleX = 0.67;
		my_back.scaleY = 0.681;

		// shadow
		const shadow = this.add.image(639, 365, "shadow");
		shadow.scaleX = 0.67;
		shadow.scaleY = 0.681;

		// setting_btn
		const setting_btn = this.add.image(1232, 47, "setting_btn");
		setting_btn.scaleX = 0.08;
		setting_btn.scaleY = 0.08;

		// my_btn2
		const my_btn2 = this.add.image(142, 606, "my_btn2");
		my_btn2.scaleX = 0.35;
		my_btn2.scaleY = 0.35;

		// my_btn3
		const my_btn3 = this.add.image(342, 608, "my_btn3");
		my_btn3.scaleX = 0.35;
		my_btn3.scaleY = 0.35;

		// my_btn4
		const my_btn4 = this.add.image(546, 607, "my_btn4");
		my_btn4.scaleX = 0.35;
		my_btn4.scaleY = 0.35;

		// my_ques
		const my_ques = this.add.image(1143, 613, "my_ques");
		my_ques.scaleX = 0.1;
		my_ques.scaleY = 0.1;

		// my_btn
		const my_btn = this.add.image(974, 612, "my_btn");
		my_btn.scaleX = 0.4;
		my_btn.scaleY = 0.4;

		// container_1
		const container_1 = this.add.container(974, 331);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(0, 1, 128, 128);
		rectangle_1.scaleX = 3.05;
		rectangle_1.scaleY = 2.9;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 4688071;
		container_1.add(rectangle_1);

		// rectangle_2
		const rectangle_2 = this.add.rectangle(0, -21, 128, 128);
		rectangle_2.scaleX = 2.8;
		rectangle_2.scaleY = 2.15;
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 11984126;
		container_1.add(rectangle_2);

		// container_2
		const container_2 = this.add.container(974, 242);

		// rectangle_3
		const rectangle_3 = this.add.rectangle(0, 86, 128, 128);
		rectangle_3.scaleX = 2.8;
		rectangle_3.scaleY = 1.85;
		rectangle_3.isFilled = true;
		rectangle_3.fillColor = 11984126;
		rectangle_3.isStroked = true;
		rectangle_3.strokeColor = 0;
		container_2.add(rectangle_3);

		// rectangle_4
		const rectangle_4 = this.add.rectangle(0, 0, 128, 128);
		rectangle_4.scaleX = 2.8;
		rectangle_4.scaleY = 0.46;
		rectangle_4.isFilled = true;
		rectangle_4.fillColor = 4688071;
		container_2.add(rectangle_4);

		// rectangle
		const rectangle = this.add.rectangle(0, 116, 128, 128);
		rectangle.scaleX = 2.8;
		rectangle.scaleY = 0.46;
		rectangle.isFilled = true;
		rectangle.fillColor = 4688071;
		container_2.add(rectangle);

		// my_rankbtn
		const my_rankbtn = this.add.image(970, 149, "my_rankbtn");
		my_rankbtn.scaleX = 0.55;
		my_rankbtn.scaleY = 0.55;

		// back
		const back = this.add.image(46, 35, "back");
		back.scaleX = 0.25;
		back.scaleY = 0.25;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */ //수동 코드 작성 영역
	// Write your code here

	preload() {
    const chars = ["pachang", "brory", "conky", "tomang", "pote", "pyogoni"];

    chars.forEach(key => {
        this.load.spritesheet(
            `${key}_anim`,
            `assets/spritesheet/${key}sheet.png`,
            { frameWidth: 500, frameHeight: 500 }
        );
    });
}

	create(data) {
		this.editorCreate();

		   // 선택된 캐릭터 이름 (예: pachang, brory)
			let selectedKey = data?.selected || localStorage.getItem("selectedCharacter") || "pachang";

			const chars = ["pachang", "brory", "conky", "tomang", "pote", "pyogoni"];
			chars.forEach(key => {
				const animKey = `${key}_move`;

				if (!this.anims.exists(animKey)) {
					this.anims.create({
						key: animKey,
						frames: this.anims.generateFrameNumbers(`${key}_anim`),
						frameRate: 23,
						repeat: -1
					});
				}
			});

			// 스프라이트 생성 (★ 반드시 _anim 사용)
			this.player = this.add.sprite(350, 300, `${selectedKey}_anim`);

			//토망 포테만 크기 작게
			let scale = ["tomang","pote"].includes(selectedKey) ? 0.8 : 1;
			this.player.setScale(scale);


			// 애니메이션 재생
			this.player.play(`${selectedKey}_move`);


		//지도 ,캐릭터 선택, 프로필 버튼
		const buttons = ["my_btn2", "my_btn3", "my_btn4"];

		buttons.forEach(key => {
			const btn = this.children.list.find(obj => obj.texture?.key === key);

			if (btn) {
				btn.setInteractive({
					useHandCursor: true,
					pixelPerfect: true,
					alphaTolerance: 1
				});

				const defaultScale = 0.35;

				// 눌렀을 때 작아짐
				btn.on("pointerdown", () => {
					this.tweens.add({
						targets: btn,
						scale: defaultScale * 0.8,
						duration: 80,
						ease: "Quad.easeOut"
					});
				});

				// 손을 뗐을 때 원래 크기로 복원 + 버튼별 기능 실행
				btn.on("pointerup", () => {
					this.tweens.add({
						targets: btn,
						scale: defaultScale,
						duration: 100,
						ease: "Bounce.easeOut"
					});

					// 버튼별 이동
					if (key === "my_btn2") {
						console.log("지도 버튼 클릭됨 → Map1 씬으로 이동");
						this.scene.start("Map1");
					} else if (key === "my_btn3") {
						this.scene.start("Charac_selec");
						console.log("캐릭터 선택 화면으로 이동");
					} else if (key === "my_btn4") {
						this.scene.launch("Profile"); //씬 이동은 아니고 팝업처럼 띄움
						this.scene.pause(); //현재 씬 일시정지
						console.log("프로필 화면으로 이동");
					}
				});

				// 커서가 벗어났을 때 원래 크기로 복원
				btn.on("pointerout", () => {
					btn.setScale(defaultScale);
				});
			}
		});
	}

}

/* END-USER-CODE */


/* END OF COMPILED CODE */

// You can write more code here
