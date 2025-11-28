
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

		// back
		const back = this.add.image(46, 35, "back");
		back.scaleX = 0.25;
		back.scaleY = 0.25;

		// my_rankbtn_1
		const my_rankbtn_1 = this.add.image(970, 149, "my_rankbtn_1");
		my_rankbtn_1.scaleX = 0.55;
		my_rankbtn_1.scaleY = 0.55;

		// my_btn_1
		const my_btn_1 = this.add.image(974, 612, "my_btn_1");
		my_btn_1.scaleX = 0.4;
		my_btn_1.scaleY = 0.4;

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
		this.PlayerloadCharacters(data);
        this.PlayercreateAnimations();
        this.PlayercreatePlayer();
        this.PlayersetupMainButtons();
		this.setupStartButton();
        this.setupBackButton();
		this.setupSettingButton();
	}

	//선택된 캐릭터 불러오기
	 PlayerloadCharacters(data) {
        this.chars = ["pachang", "brory", "conky", "tomang", "pote", "pyogoni"];

        // 선택 캐릭터 결정
        this.selectedKey =
            data?.selected ||
            localStorage.getItem("selectedCharacter") ||
            "pachang";
    }

	//캐릭터 애니메이션 생성
	 PlayercreateAnimations() {
        this.chars.forEach(key => {
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
    }

	PlayercreatePlayer() {
        this.player = this.add.sprite(350, 300, `${this.selectedKey}_anim`);

        // tomang, pote만 크기 조절
        let scale = ["tomang", "pote"].includes(this.selectedKey) ? 0.8 : 1;
        this.player.setScale(scale);

        // 애니메이션 재생
        this.player.play(`${this.selectedKey}_move`);
    }

	PlayersetupMainButtons() {
        const buttons = ["my_btn2", "my_btn3", "my_btn4"];

        buttons.forEach(key => {
            const btn = this.children.list.find(obj => obj.texture?.key === key);
            if (!btn) return;

            btn.setInteractive({ useHandCursor: true, pixelPerfect: true });
            const defaultScale = 0.35;

            btn.on("pointerdown", () => {
                this.tweens.add({
                    targets: btn,
                    scale: defaultScale * 0.8,
                    duration: 80,
                    ease: "Quad.easeOut"
                });
            });

            btn.on("pointerup", () => {
                this.tweens.add({
                    targets: btn,
                    scale: defaultScale,
                    duration: 100,
                    ease: "Bounce.easeOut"
                });

                // 이동 기능 분기
                if (key === "my_btn2") {
                    this.scene.start("Map1");
                } else if (key === "my_btn3") {
                    this.scene.start("Charac_selec");
                } else if (key === "my_btn4") {
                    this.scene.launch("Profile");
                    this.scene.pause();
                }
            });

            btn.on("pointerout", () => {
                btn.setScale(defaultScale);
            });
        });
    }

	//게임시작버튼//
	setupStartButton() {
			const startBtn = this.children.list.find(obj => obj.texture?.key === "my_btn_1");
			if (!startBtn) return;

			const defaultScale = 0.4;
			startBtn.setInteractive({ useHandCursor: true });

			startBtn.on("pointerdown", () => {
				this.tweens.add({
					targets: startBtn,
					scale: defaultScale * 0.85,
					duration: 80
				});
			});

			startBtn.on("pointerup", () => {

				this.tweens.add({
					targets: startBtn,
					scale: defaultScale,
					duration: 100,
					ease: "Bounce.easeOut"
				});

				// 게임 시작 Ep1.js 실행
				this.scene.start("Ep1");
			});

			startBtn.on("pointerout", () => {
				startBtn.setScale(defaultScale);
			});
		}

	//뒤로가기 버튼
	setupBackButton() {
        const backBtn = this.children.list.find(obj => obj.texture?.key === "back");
        if (!backBtn) return;

		setInteractiveButton(backBtn);
        const defaultScale = 0.25;
        backBtn.setInteractive({ useHandCursor: true });

        backBtn.on("pointerdown", () => {
            this.tweens.add({
                targets: backBtn,
                scale: defaultScale * 0.85,
                duration: 80
            });
        });

        backBtn.on("pointerup", () => {
            this.tweens.add({
                targets: backBtn,
                scale: defaultScale,
                duration: 100,
                ease: "Bounce.easeOut"
            });
            this.scene.start("Level");
        });

        backBtn.on("pointerout", () => backBtn.setScale(defaultScale));
    }

	//설정 버튼 클릭//
	setupSettingButton() {
		const settingBtn = this.children.list.find(obj => obj.texture?.key === "setting_btn");
		if (!settingBtn) return;

		settingBtn.setInteractive({ useHandCursor: true });

		settingBtn.on("pointerdown", () => {
			// 팝업 띄우기
			this.scene.launch("settings");

			// player_pg 일시정지 (뒤 배경 멈춤)
			this.scene.pause();
		});
	}





}

/* END-USER-CODE */


/* END OF COMPILED CODE */

// You can write more code here
