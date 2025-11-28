
// You can write more code here

/* START OF COMPILED CODE */

class Profile extends Phaser.Scene {

	constructor() {
		super("Profile");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// shadow
		const shadow = this.add.image(637, 357, "shadow");
		shadow.scaleX = 0.67;
		shadow.scaleY = 0.681;

		// my_board
		const my_board = this.add.image(640, 353, "my_board");
		my_board.scaleX = 1.75;
		my_board.scaleY = 1.65;

		// x_btn
		const x_btn = this.add.image(1032, 131, "x_btn");
		x_btn.scaleX = 0.05;
		x_btn.scaleY = 0.05;

		// pachang_batch
		const pachang_batch = this.add.image(330, 538, "pachang_batch");
		pachang_batch.scaleX = 0.5;
		pachang_batch.scaleY = 0.5;

		// brory_batch
		const brory_batch = this.add.image(460, 538, "brory_batch");
		brory_batch.scaleX = 0.5;
		brory_batch.scaleY = 0.5;

		// conky_batch
		const conky_batch = this.add.image(587, 538, "conky_batch");
		conky_batch.scaleX = 0.5;
		conky_batch.scaleY = 0.5;

		// tomang_batch
		const tomang_batch = this.add.image(715, 538, "tomang_batch");
		tomang_batch.scaleX = 0.5;
		tomang_batch.scaleY = 0.5;

		// pote_batch
		const pote_batch = this.add.image(842, 538, "pote_batch");
		pote_batch.scaleX = 0.5;
		pote_batch.scaleY = 0.5;

		// pyogoni_batch
		const pyogoni_batch = this.add.image(965, 538, "pyogoni_batch");
		pyogoni_batch.scaleX = 0.5;
		pyogoni_batch.scaleY = 0.5;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	//기본 이미지
	preload(){
    this.load.image("basic_profile", "assets/mypage/my_profile.png");
	}

	create() {

		this.editorCreate();

		// 강제로 preload 실행 
		if (!this._preloaded) {
			this._preloaded = true;

			this.load.once("complete", () => {
				this.startCreate();
			});

			this.preload();
			this.load.start();
			return;
		}

		this.startCreate();
	}

	startCreate() {
		const px = 645;
    	const py = 200;

		this.createProfileImage(px, py);

		this.createFileInput(px, py);
		this.setupFileInputChange(px, py);
		this.loadSavedProfileImage();

		this.createLoadImageButton(px, py);
		this.createDefaultImageButton(px, py);

		this.setupBadgeButtons();
		this.setupNameInput(px, py);
		this.setupNameSaveButton(px, py);
		this.setupCloseButton();
	}

	//프로필 기본 이미지 생성//
	createProfileImage(px, py) {
		this.profileImage = this.add.image(px, py, "basic_profile")
			.setScale(0.3)
			.setDepth(200);

		// 원형 마스크
		const maskRadius = 70;
		const maskgraphics = this.make.graphics({}, false);

		maskgraphics.fillStyle(0xffffff);
		maskgraphics.beginPath();
		maskgraphics.arc(px, py, maskRadius, 0, Math.PI * 2);
		maskgraphics.closePath();
		maskgraphics.fill();

		this.profileImage.setMask(maskgraphics.createGeometryMask());
	}

	//저장된 프로필 불러오기//
	loadSavedProfileImage() {
		const saved = localStorage.getItem("user_profile_img");
		if (!saved) return;

		const savedImg = new Image();
		savedImg.src = saved;

		savedImg.onload = () => {
			if (this.textures.exists("user_profile"))
				this.textures.remove("user_profile");

			this.textures.addImage("user_profile", savedImg);

			const scale = 140 / Math.min(savedImg.width, savedImg.height);

			this.profileImage
				.setTexture("user_profile")
				.setScale(scale);
		};
	}

	//파일 input 생성//
	createFileInput() {
		this.fileInput = document.createElement("input");
		this.fileInput.type = "file";
		this.fileInput.accept = "image/*";
		this.fileInput.style.display = "none";
		document.body.appendChild(this.fileInput);
	}


	//파일 선택 후 이미지 적용//
	setupFileInputChange(px, py) {

		this.fileInput.addEventListener("change", (e) => {
			const file = e.target.files[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onload = (event) => {

				const imgBase64 = event.target.result;
				localStorage.setItem("user_profile_img", imgBase64);

				const img = new Image();
				img.src = imgBase64;

				img.onload = () => {
					if (this.textures.exists("preview_profile"))
						this.textures.remove("preview_profile");

					this.textures.addImage("preview_profile", img);

					const scale = 140 / Math.min(img.width, img.height);

					this.profileImage
						.setTexture("preview_profile")
						.setScale(scale);
				};
			};

			reader.readAsDataURL(file);
		});
	}

	//이미지 불러오기 버튼//
	createLoadImageButton(px, py) {
		const btn = this.add.text(px - 150, py + 90, "이미지 불러오기", {
			fontFamily: "Pretendard",
			fontSize: "15px",
			backgroundColor: "#fff",
			color: "#000",
			padding: { left: 15, right: 15, top: 8, bottom: 8 }
		})
			.setInteractive({ useHandCursor: true });

		btn.on("pointerdown", () => this.fileInput.click());
	}

	//기본 이미지 버튼//
	createDefaultImageButton(px, py) {
		const btn = this.add.text(px + 10, py + 90, "기본 이미지로", {
			fontFamily: "Pretendard",
			fontSize: "15px",
			backgroundColor: "#000000ff",
			color: "#ffffff",
			padding: { left: 15, right: 15, top: 8, bottom: 8 }
		})
			.setInteractive({ useHandCursor: true });

		btn.on("pointerdown", () => {
			localStorage.removeItem("user_profile_img");

			const img = this.textures.get("basic_profile").getSourceImage();
			const scale = 140 / Math.min(img.width, img.height);

			this.profileImage
				.setTexture("basic_profile")
				.setScale(scale);
		});
	}

	//캐릭터 뱃지 버튼//
	setupBadgeButtons() {
		const keys = ["pachang_batch", "brory_batch", "conky_batch", "tomang_batch", "pote_batch", "pyogoni_batch"];

		keys.forEach(key => {
			const sprite = this.children.list.find(o => o.texture?.key === key);
			if (!sprite) return;

			setInteractiveButton(sprite);
			sprite.setInteractive({ useHandCursor: true });

			sprite.on("pointerdown", () => {
				const source = this.textures.get(key).getSourceImage();
				const canvas = document.createElement("canvas");

				canvas.width = source.width;
				canvas.height = source.height;
				canvas.getContext("2d").drawImage(source, 0, 0);

				const base64 = canvas.toDataURL("image/png");

				localStorage.setItem("user_profile_img", base64);

				const scale = 140 / Math.min(source.width, source.height);

				this.profileImage
					.setTexture(key)
					.setScale(scale);
			});
		});
	}

	//닉네임 입력창//
	setupNameInput(px, py) {
		this.nameDom = this.add.dom(px - 10, py + 190).createFromHTML(`
			<input id="profileNameInput"
				type="text"
				style="
					width: 200px;
					font-size: 20px;
					padding: 6px 10px;
					border: 1px solid #ccc;
					border-radius: 6px;
				"
			>
		`);
		this.nameDom.setOrigin(0.5);

		const nickname = localStorage.getItem("user_nickname") || "게스트";
		this.nameDom.getChildByID("profileNameInput").value = nickname;

		this.events.once("shutdown", () => this.nameDom?.destroy());
	}

	//닉네임 저장 버튼//
	setupNameSaveButton(px, py) {
		const btn = this.add.text(px - 45, py + 230, "변경하기", {
			fontFamily: "Pretendard",
			fontSize: "16px",
			backgroundColor: "#000",
			color: "#fff",
			padding: { left: 10, right: 10, top: 6, bottom: 6 }
		})
			.setInteractive({ useHandCursor: true });

		btn.on("pointerdown", () => {
			const newName = this.nameDom.getChildByID("profileNameInput").value.trim();
			if (!newName) return;

			localStorage.setItem("user_nickname", newName);
			this.registry.set("nickname", newName);

			alert("닉네임이 변경되었습니다!");
		});
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
}







	/* END-USER-CODE */


/* END OF COMPILED CODE */

// You can write more code here
