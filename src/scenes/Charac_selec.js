
// You can write more code here

/* START OF COMPILED CODE */

class Charac_selec extends Phaser.Scene {

	constructor() {
		super("Charac_selec");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// cha_back
		const cha_back = this.add.image(635, 360, "cha_back");
		cha_back.scaleX = 0.67;
		cha_back.scaleY = 0.67;

		// cha_basket
		const cha_basket = this.add.image(629, 386, "cha_basket");
		cha_basket.scaleX = 0.85;
		cha_basket.scaleY = 0.85;

		// pachang
		const pachang = this.add.image(159, 609, "pachang");
		pachang.scaleX = 0.35;
		pachang.scaleY = 0.3;

		// brory
		const brory = this.add.image(327, 614, "brory");
		brory.scaleX = 0.3;
		brory.scaleY = 0.3;

		// conky
		const conky = this.add.image(497, 612, "conky");
		conky.scaleX = 0.3;
		conky.scaleY = 0.3;

		// tomang
		const tomang = this.add.image(681, 605, "tomang");
		tomang.scaleX = 0.25;
		tomang.scaleY = 0.25;

		// pote
		const pote = this.add.image(883, 604, "pote");
		pote.scaleX = 0.3;
		pote.scaleY = 0.3;

		// pyogoni
		const pyogoni = this.add.image(1079, 603, "pyogoni");
		pyogoni.scaleX = 0.3;
		pyogoni.scaleY = 0.3;

		// cha_selrec
		const cha_selrec = this.add.image(157, 608, "cha_selrec");
		cha_selrec.scaleX = 0.6;
		cha_selrec.scaleY = 0.6;

		// cha_arrow
		const cha_arrow = this.add.image(1203, 369, "cha_arrow");
		cha_arrow.scaleX = 0.3;
		cha_arrow.scaleY = 0.3;

		// cha_arrow_1
		const cha_arrow_1 = this.add.image(77, 378, "cha_arrow");
		cha_arrow_1.scaleX = 0.3;
		cha_arrow_1.scaleY = 0.3;
		cha_arrow_1.flipX = true;

		// setting_btn
		const setting_btn = this.add.image(1232, 47, "setting_btn");
		setting_btn.scaleX = 0.08;
		setting_btn.scaleY = 0.08;

		// back
		const back = this.add.image(46, 36, "back");
		back.scaleX = 0.25;
		back.scaleY = 0.25;

		// cha_ok
		this.add.image(878, 458, "cha_ok");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */ //수동 코드 작성 영역
	// Write your code here

	preload() {
		this.charSheets = {
			pote: "potesheet.png",
			tomang: "tomangsheet.png",
			pachang: "pachangsheet.png",
			brory: "brorysheet.png",
			conky: "conkysheet.png",
			pyogoni: "pyogonisheet.png"
		};

		for (const key in this.charSheets) {
			this.load.spritesheet(
				`${key}_anim`,
				`assets/spritesheet/${this.charSheets[key]}`,
				{
					frameWidth: 500,
					frameHeight: 500
				}
			);
		}
	}

	create() {
		this.editorCreate();
		this.setupCharacterArray();
    	this.setupArrows();
    	this.setupSelectedDisplay();
    	this.setupCharDescription();
    	this.setupOkButton();
    	this.setupBackButton();
    	this.updateSelection();
	}


	//캐릭터 배열 및 초기 인덱스//
	setupCharacterArray() {
        const savedKey = localStorage.getItem("selectedCharacter") || "pachang";

        this.characters = [
            this.children.list.find(o => o.texture?.key === "pachang"),
            this.children.list.find(o => o.texture?.key === "brory"),
            this.children.list.find(o => o.texture?.key === "conky"),
            this.children.list.find(o => o.texture?.key === "tomang"),
            this.children.list.find(o => o.texture?.key === "pote"),
            this.children.list.find(o => o.texture?.key === "pyogoni")
        ];

        this.basket = this.children.list.find(o => o.texture?.key === "cha_basket");

        this.currentIndex = this.characters.findIndex(c => c.texture.key === savedKey);
        if (this.currentIndex === -1) this.currentIndex = 0;
    }

	//화살표 설정//
	 setupArrows() {
        this.arrowRight = this.children.list.find(o => o.texture?.key === "cha_arrow" && !o.flipX);
        this.arrowLeft = this.children.list.find(o => o.texture?.key === "cha_arrow" && o.flipX);

		setInteractiveButton(this.arrowLeft);
        this.arrowLeft.setInteractive({ useHandCursor: true });

		setInteractiveButton(this.arrowRight);
        this.arrowRight.setInteractive({ useHandCursor: true });

        this.arrowLeft.on("pointerdown", () => {
            this.currentIndex = (this.currentIndex - 1 + this.characters.length) % this.characters.length;
            this.updateSelection();
        });

        this.arrowRight.on("pointerdown", () => {
            this.currentIndex = (this.currentIndex + 1) % this.characters.length;
            this.updateSelection();
        });
    }

	//표시 캐릭터 스프라이트 생성//
	setupSelectedDisplay() {
        const firstKey = this.characters[this.currentIndex].texture.key;

        this.selectedCharacterDisplay = this.add.sprite(
            this.basket.x,
            this.basket.y - 150,
            firstKey
        );

        this.selectedCharacterDisplay.setScale(0.7);
        this.selectedCharacterDisplay.setDepth(10);
        this.selectedCharacterDisplay.setOrigin(0.5);

        // 애니메이션 생성
        for (const key in this.charSheets) {
            const animKey = `${key}_move`;

            if (!this.anims.exists(animKey)) {
                this.anims.create({
                    key: animKey,
                    frames: this.anims.generateFrameNumbers(`${key}_anim`),
                    frameRate: 23,
                    repeat: -1
                });
            }
        }

        this.cha_selrec = this.children.list.find(o => o.texture?.key === "cha_selrec");
    }

	//캐릭터 설명 텍스트//
	setupCharDescription() {
        this.charDescription = this.add.text(
            this.basket.x + 130,
            this.basket.y - 320,
            "",
            {
                fontFamily: "Pretendard",
                fontSize: "25px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4
            }
        );
        this.charDescription.setDepth(20);

        this.descriptions = {
            pachang:
                `파쨩(Pachang)
				“요리조리 피하는 파쨩”
				• 냄새로 디버프 제거
				• 피로 회복 버프
				• 파워러시 발동
				• 매운 향기 폭발!`,

			brory:
				`브로리(Brory)
				“브로콜리Bro”
				• 힐 스킬
				• 항산화 보호막
				• 매턴 HP 5% 회복
				• 감기 면역!`,

			conky:
				`콘키(Conky)
				“Cheeky콘”
				• 에너지 부스트
				• 콘바디 강화
				• 황금빛 시선
				• 스위트 러시`,

			tomang:
				`토맹(Tomang)
				“토마토 멍청이”
				• 비타민 파워
				• 리코펜 보호막
				• 정화 필드
				• 쿨다운 패시브`,

			pote:
				`포테(Pote)
				“포테토남”
				• 에너지 부스트
				• 비타민 힐
				• 감자 보호막
				• 안정 패시브`,

			pyogoni:
				`표고니(Pyogoni)
				“표고 + 귀요미”
				• 버섯 보호막
				• 에너지 재생
				• 촉촉 방패
				• 항산화 버프`
			};
    }

	// OK 버튼//
	 setupOkButton() {
		const okButton = this.children.list.find(obj => obj.texture?.key === "cha_ok");

		if (!okButton) return;

		//setInteractiveButton(okButton);

        okButton.setInteractive({ useHandCursor: true });

        okButton.on("pointerdown", () => {
            const selectedKey = this.characters[this.currentIndex].texture.key;
            localStorage.setItem("selectedCharacter", selectedKey);
            this.scene.start("player_pg", { selected: selectedKey });
        });
    }


	//캐릭터 변경 시 업데이트//
	 updateSelection() {
        const selectedChar = this.characters[this.currentIndex];
        const charKey = selectedChar.texture.key;

        if (this.isFirstSelect) {
            this.cha_selrec.x = selectedChar.x;
            this.isFirstSelect = false;
        } else {
            this.tweens.add({
                targets: this.cha_selrec,
                x: selectedChar.x,
                duration: 200,
                ease: "Sine.out"
            });
        }

        if (this.selectedCharacterDisplay.texture.key !== charKey) {
            this.selectedCharacterDisplay.setTexture(charKey);

            let newScale = 0.7;
            if (["tomang", "pote"].includes(charKey)) {
                newScale = 0.6;
            }
            this.selectedCharacterDisplay.setScale(newScale);
        }

        const animKey = `${charKey}_move`;

        if (this.anims.exists(animKey)) {
            if (this.selectedCharacterDisplay.anims.currentAnim?.key !== animKey) {
                this.selectedCharacterDisplay.play(animKey, true);
            }
        }

        this.charDescription.setText(this.descriptions[charKey]);
    }

	//뒤로가기 버튼//
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
            this.scene.start("player_pg");
        });

        backBtn.on("pointerout", () => backBtn.setScale(defaultScale));
    }




	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
