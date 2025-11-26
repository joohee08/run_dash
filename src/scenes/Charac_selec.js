
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

		// cha_ok
		const cha_ok = this.add.image(896, 427, "cha_ok");
		cha_ok.scaleX = 0.3;
		cha_ok.scaleY = 0.3;

		// setting_btn
		const setting_btn = this.add.image(1232, 47, "setting_btn");
		setting_btn.scaleX = 0.08;
		setting_btn.scaleY = 0.08;

		// back
		const back = this.add.image(46, 36, "back");
		back.scaleX = 0.25;
		back.scaleY = 0.25;

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
		this.isFirstSelect = true;

		 const makeInteractive = (obj) => {
			if (!obj) return;

			obj.setInteractive({
				useHandCursor: true,
				pixelPerfect: true,
				alphaTolerance: 1
			});
		};

		const savedKey = localStorage.getItem("selectedCharacter") || "pachang";

		//캐릭터 배열
		this.characters = [
			this.children.list.find(obj => obj.texture?.key === "pachang"),
			this.children.list.find(obj => obj.texture?.key === "brory"),
			this.children.list.find(obj => obj.texture?.key === "conky"),
			this.children.list.find(obj => obj.texture?.key === "tomang"),
			this.children.list.find(obj => obj.texture?.key === "pote"),
			this.children.list.find(obj => obj.texture?.key === "pyogoni")
		];

		//바구니 객체
		this.basket = this.children.list.find(obj => obj.texture?.key === "cha_basket");

		//현재 선택
		this.currentIndex = this.characters.findIndex(c => c.texture.key === savedKey);

		// 만약 못찾으면 기본값
		if (this.currentIndex === -1) this.currentIndex = 0;

		//화살표 
		this.arrowRight = this.children.list.find(obj => obj.texture?.key === "cha_arrow" && !obj.flipX);
		this.arrowLeft = this.children.list.find(obj => obj.texture?.key === "cha_arrow" && obj.flipX);

		//화살표 클릭 이벤트
		this.arrowLeft.setInteractive({ useHandCursor: true });
		this.arrowRight.setInteractive({ useHandCursor: true });

		//왼쪽
		this.arrowLeft.on("pointerdown", () => {
			this.currentIndex = (this.currentIndex - 1 + this.characters.length) % this.characters.length;
			this.updateSelection();
		});

		//오른쪽
		this.arrowRight.on("pointerdown", () => {
			this.currentIndex = (this.currentIndex + 1) % this.characters.length;
			this.updateSelection();
		});

		//캐릭터 표시 객체
		this.cha_selrec = this.children.list.find(obj => obj.texture?.key === "cha_selrec");

		//바구니 표시용 캐릭터
		this.selectedCharacterDisplay = this.add.sprite(
			this.basket.x, this.basket.y - 150, // 바구니 바로 위
			this.characters[this.currentIndex].texture.key
		);

		 this.selectedCharacterDisplay.setScale(0.7); // 바구니 안 크기 조정
 		 this.selectedCharacterDisplay.setDepth(10);  // 항상 위에 보이게

		//기본 캐릭터 표시
		// 흔들림 방지 핵심
		this.selectedCharacterDisplay.setOrigin(0.5, 0.5);

		// 모든 캐릭터 애니메이션 생성
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

		// 캐릭터 설명 텍스트 추가
		this.charDescription = this.add.text(
			this.basket.x + 130,       // 캐릭터 오른쪽 위치
			this.basket.y - 320,
			"",
			{
				fontFamily: "Pretendard",
				fontSize: "25px",
				color: "#ffffff",
				align: "left",
				stroke: "#000000",
				strokeThickness: 4
			}
		);
		this.charDescription.setDepth(20);

		// 캐릭터 선택후 확인 버튼 클릭시
		this.okButton = this.children.list.find(obj => obj.texture?.key === "cha_ok");
		this.okButton.setInteractive({ useHandCursor: true });

		// 클릭 시 player_pg로 이동
		this.okButton.on("pointerdown", () => {

			// 현재 선택된 캐릭터 key
			const selectedKey = this.characters[this.currentIndex].texture.key;

			// player_pg로 이동하면서 선택 캐릭터 전달
			localStorage.setItem("selectedCharacter", selectedKey);
			this.scene.start("player_pg", { selected: selectedKey });
		});

		//뒤로가기
			const backBtn = this.children.list.find(o => o.texture?.key === "back");
			if (backBtn) {
				makeInteractive(backBtn); 

				backBtn.on("pointerup", () => {
					this.scene.start("player_pg");
				});

			this.updateSelection();
		}
	}

	updateSelection() {
		const selectedChar = this.characters[this.currentIndex];
		const charKey = selectedChar.texture.key;

		// 선택 사각형 이동
		if (selectedChar && this.cha_selrec) {

			// 첫 실행일 때는 Tween 없이 즉시 이동
			if (this.isFirstSelect) {
				this.cha_selrec.x = selectedChar.x;
				this.isFirstSelect = false;
			} else {
				// 그 뒤부터는 애니메이션 이동
				this.tweens.add({
					targets: this.cha_selrec,
					x: selectedChar.x,
					duration: 200,
					ease: "Sine.easeOut"
				});
			}
		}

		// 텍스처가 다른 캐릭터로 전환될 때만 변경
		if (this.selectedCharacterDisplay.texture.key !== charKey) {
			this.selectedCharacterDisplay.setTexture(charKey);

			let newScale = 0.7;
			if (["tomang", "pote"].includes(charKey)) {
				newScale = 0.6;
			}
			this.selectedCharacterDisplay.setScale(newScale);
		}

		// 애니메이션 재생 (중복 재생 방지)
		const animKey = `${charKey}_move`;

		if (this.anims.exists(animKey)) {
			if (this.selectedCharacterDisplay.anims.currentAnim?.key !== animKey) {
				this.selectedCharacterDisplay.play(animKey, true);
			}
		} else {
			this.selectedCharacterDisplay.anims.stop();
		}

		// 캐릭터 설명 변경
		const descriptions = {
		pachang: 
			`파쨩(Pachang)
			“요리조리 피하는 파쨩”
			• 냄새로 바이러스 디버프 제거
			• 피로 회복 버프
			• 파워러시 모드 발동
			• 매운 향기 폭발!`,

		brory:
		   `브로리(Brory)
			“브로콜리Bro” 
			• 힐 스킬: 브로콜리 브레스 
			• 항산화 보호막 생성! 
			• 턴마다 HP 5% 
			• 회복 감기 디버프 면역!`,

		conky: 
			`콘키(Conky) 
			“Cheeky콘” 
			• 옥수수 에너지 부스트 
			• 콘바디 강화 
			• 황금빛 시선 
			• 스위트 러시`,

		tomang:
			`토맹(Tomang) 
			“토마토 + 멍” = 멍청하지만 귀여운” 
			• 비타민 파워 업!
			• 리코펜 보호막 생성
			• 토마토 정화 필드 
			• 신선 쿨다운 패시브`,

		pote: 
			`포테(Pote) 
			“포테토남” 
			• 포테 에너지 부스트
			• 비타민 힐링 
			• 감자 보호막 
			• 심근 안정 패시브`,

		pyogoni: 
			`표고니(Pyogoni) 
			“표고 + 귀요미형 어미 ‘니’,"
			 버섯계 대표 귀요미
			• 버섯 보호막
			• 표고 에너지 재생 
			• 촉촉 방패막이 
			• 항산화 버프`
		};

		this.charDescription.setText(descriptions[charKey]);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
