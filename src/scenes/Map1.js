
// You can write more code here

/* START OF COMPILED CODE */

class Map1 extends Phaser.Scene {

	constructor() {
		super("Map1");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// m_back
		const m_back = this.add.image(640, 357, "m_back");
		m_back.scaleX = 0.67;
		m_back.scaleY = 0.67;

		// m_1
		const m_1 = this.add.image(522, 542, "m_1");
		m_1.scaleX = 0.45;
		m_1.scaleY = 0.4;

		// m_2
		const m_2 = this.add.image(786, 437, "m_2");
		m_2.scaleX = 0.3;
		m_2.scaleY = 0.3;

		// m_3
		const m_3 = this.add.image(191, 480, "m_3");
		m_3.scaleX = 0.65;
		m_3.scaleY = 0.65;

		// m_4
		const m_4 = this.add.image(220, 245, "m_4");
		m_4.scaleX = 0.67;
		m_4.scaleY = 0.65;

		// m_5
		const m_5 = this.add.image(702, 86, "m_5");
		m_5.scaleX = 0.5;
		m_5.scaleY = 0.5;

		// m_6_4
		const m_6_4 = this.add.image(1236, 75, "m_6_4");
		m_6_4.scaleX = 0.1;
		m_6_4.scaleY = 0.1;

		// m_7
		const m_7 = this.add.image(1133, 353, "m_7");
		m_7.scaleX = 0.6;
		m_7.scaleY = 0.65;

		// m_8
		const m_8 = this.add.image(180, 576, "m_8");
		m_8.scaleX = 0.65;
		m_8.scaleY = 0.65;

		// m_namebtn1
		const m_namebtn1 = this.add.image(522, 631, "m_namebtn1");
		m_namebtn1.scaleX = 0.25;
		m_namebtn1.scaleY = 0.25;

		// m_namebtn2
		const m_namebtn2 = this.add.image(766, 527, "m_namebtn2");
		m_namebtn2.scaleX = 0.25;
		m_namebtn2.scaleY = 0.25;

		// m_namebtn3
		const m_namebtn3 = this.add.image(394, 424, "m_namebtn3");
		m_namebtn3.scaleX = 0.25;
		m_namebtn3.scaleY = 0.25;

		// m_namebtn4
		const m_namebtn4 = this.add.image(136, 115, "m_namebtn4");
		m_namebtn4.scaleX = 0.25;
		m_namebtn4.scaleY = 0.25;

		// m_namebtn5
		const m_namebtn5 = this.add.image(683, 182, "m_namebtn5");
		m_namebtn5.scaleX = 0.25;
		m_namebtn5.scaleY = 0.25;

		// m_namebtn6
		const m_namebtn6 = this.add.image(1126, 211, "m_namebtn6");
		m_namebtn6.scaleX = 0.25;
		m_namebtn6.scaleY = 0.25;

		// m_namebtn7
		const m_namebtn7 = this.add.image(1147, 433, "m_namebtn7");
		m_namebtn7.scaleX = 0.25;
		m_namebtn7.scaleY = 0.25;

		// m_namebtn8
		const m_namebtn8 = this.add.image(176, 690, "m_namebtn8");
		m_namebtn8.scaleX = 0.25;
		m_namebtn8.scaleY = 0.25;

		// m_point
		const m_point = this.add.image(514, 445, "m_point");
		m_point.scaleX = 0.2;
		m_point.scaleY = 0.2;

		// m_lock
		const m_lock = this.add.image(771, 444, "m_lock");
		m_lock.scaleX = 0.1;
		m_lock.scaleY = 0.1;

		// m_lock_1
		const m_lock_1 = this.add.image(118, 440, "m_lock");
		m_lock_1.scaleX = 0.1;
		m_lock_1.scaleY = 0.1;

		// m_lock_2
		const m_lock_2 = this.add.image(169, 253, "m_lock");
		m_lock_2.scaleX = 0.1;
		m_lock_2.scaleY = 0.1;

		// m_lock_3
		const m_lock_3 = this.add.image(708, 92, "m_lock");
		m_lock_3.scaleX = 0.1;
		m_lock_3.scaleY = 0.1;

		// m_lock_4
		const m_lock_4 = this.add.image(1145, 109, "m_lock");
		m_lock_4.scaleX = 0.1;
		m_lock_4.scaleY = 0.1;

		// m_lock_5
		const m_lock_5 = this.add.image(1142, 354, "m_lock");
		m_lock_5.scaleX = 0.1;
		m_lock_5.scaleY = 0.1;

		// m_lock_6
		const m_lock_6 = this.add.image(176, 580, "m_lock");
		m_lock_6.scaleX = 0.1;
		m_lock_6.scaleY = 0.1;

		// m_6
		const m_6 = this.add.image(1151, 139, "m_6");
		m_6.scaleX = 0.3;
		m_6.scaleY = 0.3;

		// back
		const back = this.add.image(46, 35, "back");
		back.scaleX = 0.25;
		back.scaleY = 0.25;

		// setting_btn_black
		const setting_btn_black = this.add.image(1247, 31, "setting_btn_black");
		setting_btn_black.scaleX = 0.08;
		setting_btn_black.scaleY = 0.08;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		//공통 투명 영역 클릭 못하게 처리
		 const makeInteractive = (obj) => {
			if (!obj) return;

			obj.setInteractive({
				useHandCursor: true,
				pixelPerfect: true,
				alphaTolerance: 1
			});
		};

		//공통 hover
		 const setupHover = (obj) => {
			if (!obj) return;

			const normalScale = { x: obj.scaleX, y: obj.scaleY };
			const hoverScale = { x: obj.scaleX * 1.1, y: obj.scaleY * 1.1 };

			obj.on("pointerover", () => {
				this.tweens.add({
					targets: obj,
					scaleX: hoverScale.x,
					scaleY: hoverScale.y,
					duration: 180,
					ease: "Sine.out"
				});
			});

			obj.on("pointerout", () => {
				this.tweens.add({
					targets: obj,
					scaleX: normalScale.x,
					scaleY: normalScale.y,
					duration: 180,
					ease: "Sine.out"
				});
			});
		};

		//투명구역 노클릭
		 const map_alpha_noclick = ["m_1", "m_2", "m_3", "m_4", "m_5", "m_6", "m_7", "m_8", "back"];

			map_alpha_noclick.forEach(key => {
			const obj = this.children.list.find(o => o.texture?.key === key);
			makeInteractive(obj);
		});

		//맵 구역 hover
		const map_one_hover = ["m_1", "m_2", "m_3", "m_4", "m_5", "m_6", "m_7", "m_8"];

		  map_one_hover.forEach(key => {
			const obj = this.children.list.find(o => o.texture?.key === key);
			setupHover(obj);
		});

			// 키포인트 찾기
			const m_point = this.children.list.find(obj => obj.texture?.key === "m_point");
			// 둥둥 떠다니는 애니메이션, 키포인트
			this.tweens.add({
				targets: m_point,
				y: m_point.y - 10,
				duration: 800,
				yoyo: true,
				repeat: -1,
				ease: "Sine.inOut"
			});

			//자물쇠 찾기
			const locks = this.children.list.filter(obj => obj.texture?.key === "m_lock");
			//자물쇠 애니메이션
			locks.forEach(lock => {
				lock.setOrigin(0.5);

				this.tweens.chain({

					targets: lock,

					tweens: [
						// 커지기
						{
							scale: 0.13,
							duration: 200,
							ease: "Sine.out"
						},

						// 빠르게 좌우 흔들리기
						{
							angle: -15,
							duration: 200,
							yoyo: true,
							repeat: 1,  // 빠르게 흔들흔들
							ease: "Sine.inOut"
						},

						// 다시 원래 크기로
						{
							scale: 0.1,
							angle: 0,
							duration: 200,
							ease: "Sine.inOut"
						}
					],

					repeat: -1 // 전체 사이클 반복
				});
			});

			//뒤로가기
			 const backBtn = this.children.list.find(o => o.texture?.key === "back");
				if (backBtn) {
					backBtn.on("pointerup", () => {
						this.scene.start("player_pg");
					});
				}

		}





		/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
