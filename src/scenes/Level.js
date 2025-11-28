/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// f_back_1
		const f_back_1 = this.add.image(636, 361, "f_back_1");
		f_back_1.scaleX = 0.67;
		f_back_1.scaleY = 0.68;

		// f_txt_1
		this.add.image(416, 155, "f_txt_1");

		// f_btn_1
		const f_btn_1 = this.add.image(639, 564, "f_btn_1");
		f_btn_1.scaleX = 0.5;
		f_btn_1.scaleY = 0.5;

		// f_btn_2
		const f_btn_2 = this.add.image(639, 564, "f_btn_2");
		f_btn_2.scaleX = 0.5;
		f_btn_2.scaleY = 0.5;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */ //수동 코드 작성 영역
	create() {
		this.editorCreate();

		const savedName = localStorage.getItem("user_nickname");

		 // 버튼 객체들 가져오기
    	this.f_btn_1 = this.children.list.find(obj => obj.texture?.key === "f_btn_1"); // 시작하기
    	this.f_btn_2 = this.children.list.find(obj => obj.texture?.key === "f_btn_2"); // 등록하기

		this.LevelTitleTween();

		 if (savedName) {
			// 닉네임 이미 있음 -> 시작 버튼만 보여주기
			this.LevelshowStartButton();
		} else {
			// 최초 실행 -> 인풋박스 + 등록 버튼 활성화
			this.LevelcreateInputBox();
			this.LevelSubmitButton();

			// 등록하기 버튼 보이기
			this.f_btn_2.setVisible(true);

			// 시작하기 버튼 숨기기
			this.f_btn_1.setVisible(false);
		}
	 }

	//제목 타이틀 트윈 함수//
	LevelTitleTween() {
        const title = this.children.list.find(obj => obj.texture?.key === "f_txt_1");
        if (!title) return;

		//제목 흔들림 효과 추가
        this.tweens.add({
            targets: title,
            angle: { from: -5, to: 5 },
            duration: 1000,
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1
        });
    }

	//닉네임 입력창 함수//
	LevelcreateInputBox() {
		 this.inputBox = this.add.dom(639, 466).createFromHTML(`
        <input 
            id="nicknameInput"
            type="text" 
            placeholder="닉네임을 입력하세요"
            style="
                width: 320px;
                height: 45px;
                font-size: 18px;
                padding: 5px 10px;
                border-radius: 10px;
                border: 2px solid #3ca84c;
                box-sizing: border-box;
            "
        >
    `);

    this.inputBox.setOrigin(0.5);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
        this.inputBox.destroy();
    });
	}

	//등록하기 버튼 클릭 함수//
	LevelSubmitButton() {
		this.f_btn_2 = this.children.list.find(obj => obj.texture?.key === "f_btn_2");

		if (!this.f_btn_2) return;

		setInteractiveButton(this.f_btn_2);

		const btn2 = this.f_btn_2;
		const defaultScale = 0.5;

		btn2.setInteractive({ useHandCursor: true });

		//클릭 시 (마우스 누름)
		btn2.on("pointerdown", () => {
			this.tweens.add({
				targets: btn2,
				scale: defaultScale * 0.9,
				duration: 80,
				ease: "Quad.easeOut"
			});
		});

		//클릭 해제 시 (원래 크기로 복귀)
		btn2.on("pointerup", () => {
			this.tweens.add({
				targets: btn2,
				scale: defaultScale,
				duration: 100,
				ease: "Bounce.easeOut"
			});

			this.LevelhandleSubmit(); 
		});
	}

	//제출처리+닉네임 저장+이동 함수//
	 LevelhandleSubmit() {

		// 닉네임 입력 확인
		const input = this.inputBox.getChildByID("nicknameInput");
        const nickname = input?.value?.trim();

        if (!nickname) {
            alert("닉네임을 입력해주세요!");
            return;
        }

        //닉네임 저장
        this.registry.set("nickname", nickname);
        localStorage.setItem("user_nickname", nickname);

        // 인풋 제거 후 다음 씬 이동
        this.inputBox.remove();

		//등록 후 바로 시작 버튼 모드로 전환
		this.LevelshowStartButton();

        this.scene.start("player_pg");
    }


	//시작버튼 함수//
	LevelshowStartButton() {

		// 시작 버튼(f_btn_1) 표시
		this.f_btn_1.setVisible(true);

		setInteractiveButton(this.f_btn_1);

		const btn1 = this.f_btn_1;
		const defaultScale = 0.5;

		btn1.setInteractive({ useHandCursor: true });

		//클릭 시 (마우스 누름)
		btn1.on("pointerdown", () => {
			this.tweens.add({
				targets: btn1,
				scale: defaultScale * 0.9,
				duration: 80,
				ease: "Quad.easeOut"
			});
		});

		//클릭 해제 시 (원래 크기로 복귀)
		btn1.on("pointerup", () => {
			this.tweens.add({
				targets: btn1,
				scale: defaultScale,
				duration: 100,
				ease: "Bounce.easeOut"
			});

			this.scene.start("player_pg");
		});

		// 등록 버튼(f_btn_2) 숨기기
		if (this.f_btn_2) this.f_btn_2.setVisible(false);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
