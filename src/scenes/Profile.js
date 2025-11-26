
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

		//기본 이미지 크기
		const px = 645;
		const py = 200;

		this.profileImage = this.add.image(px, py, "basic_profile")
			.setScale(0.3)
			.setDepth(200);

		//원형 마스크
		const maskRadius = 70; // 원 크기 
		const maskgraphics = this.make.graphics({}, false);

		maskgraphics.fillStyle(0xffffff);
		maskgraphics.beginPath();
		maskgraphics.arc(px, py, maskRadius, 0, Math.PI * 2);
		maskgraphics.closePath();
		maskgraphics.fill();

		const mask = maskgraphics.createGeometryMask();

		this.profileImage.setMask(mask);

		this.tempImage = null;

		//파일 생성
		this.fileInput = document.createElement("input");
		this.fileInput.type = "file";
		this.fileInput.accept = "image/*";
		this.fileInput.style.display = "none";
		document.body.appendChild(this.fileInput);

		//선택된 파일 읽기
		this.fileInput.addEventListener("change", (e) => {
			const file = e.target.files[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onload = (event) => {
				this.tempImage = event.target.result;

				//이미지 바로 저장
				localStorage.setItem("user_profile_img", this.tempImage);

				//base64 → HTML 이미지 → Phaser 텍스처 방식
				const img = new Image();
				img.src = this.tempImage;

				img.onload = () => {

					// 기존 텍스처 삭제
					if (this.textures.exists("preview_profile"))
						this.textures.remove("preview_profile");

					//진짜 텍스처 생성
					this.textures.addImage("preview_profile", img);
					const targetRadius = 70;    // 원형 마스크 반지름
					const targetSize = targetRadius * 2; // 목표 직경(=크기)

						const imgWidth = img.width;
						const imgHeight = img.height;

						// cover 방식 스케일 계산
						const scale = targetSize / Math.min(imgWidth, imgHeight);

						// 최종 적용
						this.profileImage
							.setTexture("preview_profile")
							.setScale(scale);
					};
   			 };

    		reader.readAsDataURL(file);
		});

		const saved = localStorage.getItem("user_profile_img");

		//자동 저장 코드
		if (saved) {
			const savedImg = new Image();
			savedImg.src = saved;

			savedImg.onload = () => {

				// 기존 텍스처 삭제
				if (this.textures.exists("user_profile"))
					this.textures.remove("user_profile");

				// 텍스처 생성
				this.textures.addImage("user_profile", savedImg);

				const targetRadius = 70;
				const targetSize = targetRadius * 2;

				const imgWidth = savedImg.width;
				const imgHeight = savedImg.height;

				// cover 방식 스케일 계산
				const scale = targetSize / Math.min(imgWidth, imgHeight);

				// 적용
				this.profileImage
					.setTexture("user_profile")
					.setScale(scale);
			};
		}

		//이미지 버튼 불러오기
		const loadBtn = this.add.text(px -150, py + 90, "이미지 불러오기", {
			fontFamily: "Pretendard",
			fontSize: "15px",
			backgroundColor: "#fff",
			color: "#000",
			padding: { left: 15, right: 15, top: 8, bottom: 8 }
		}).setInteractive({ useHandCursor: true });

		loadBtn.on("pointerdown", () => {
			this.fileInput.click();  // HTML input 열기
		});

		const defaultBtn = this.add.text(px + 10, py + 90, "기본 이미지로", {
			fontFamily: "Pretendard",
			fontSize: "15px",
			backgroundColor: "#000000ff",
			color: "#ffffffff",
			padding: { left: 15, right: 15, top: 8, bottom: 8 }
		}).setInteractive({ useHandCursor: true });

		defaultBtn.on("pointerdown", () => {

			//localStorage 초기화 (기본 이미지로 교체)
			localStorage.removeItem("user_profile_img");

			//기본 이미지로 되돌림
			const img = this.textures.get("basic_profile").getSourceImage();

			const imgWidth = img.width;
			const imgHeight = img.height;

			const targetRadius = 70;
			const targetSize = targetRadius * 2;

			const scale = targetSize / Math.min(imgWidth, imgHeight);

			this.profileImage
				.setTexture("basic_profile")
				.setScale(scale);
		});

		//캐릭터 뱃지 버튼
		const batchKeys = [
			"pachang_batch",
			"brory_batch",
			"conky_batch",
			"tomang_batch",
			"pote_batch",
			"pyogoni_batch"
		];

		batchKeys.forEach(key => {
			const sprite = this.children.list.find(o => o.texture?.key === key);

			if (sprite) {
				sprite.setInteractive({ useHandCursor: true });

				sprite.on("pointerdown", () => {

				const texture = this.textures.get(key);
				const source = texture.getSourceImage();

				// 텍스처 캔버스 그리기
				const canvas = document.createElement("canvas");
				canvas.width = source.width;
				canvas.height = source.height;

				const ctx = canvas.getContext("2d");
				ctx.drawImage(source, 0, 0);

				// base64 변환
				const base64 = canvas.toDataURL("image/png");

				// localStorage 저장
				localStorage.setItem("user_profile_img", base64);

				// 프로필 이미지 교체
				const targetRadius = 70;
				const targetSize = targetRadius * 2;
				const scale = targetSize / Math.min(source.width, source.height);

				this.profileImage
					.setTexture(key)
					.setScale(scale);
				});
			   }
			});

			
			//여기서부터 시작 닉네임 부분 코드 위치 재수정필요 기능에는 문제가 없음
			this.createNameInput(px, py);

			 // 닉네임 저장 버튼
			const saveNameBtn = this.add.text(px - 45, py + 230, "변경하기", {
				fontFamily: "Pretendard",
				fontSize: "16px",
				backgroundColor: "#000",
				color: "#fff",
				padding: { left: 10, right: 10, top: 6, bottom: 6 }
			})
			.setInteractive({ useHandCursor: true });

			saveNameBtn.on("pointerdown", () => {

				const newName = this.nameDom.getChildByID("profileNameInput").value.trim();
				if (!newName) return;

				localStorage.setItem("user_nickname", newName);
				this.registry.set("nickname", newName);

				alert("닉네임이 변경되었습니다!");
			});

			this.events.once("shutdown", () => {
			if (this.nameInput) this.nameInput.remove();
			});

		//x 버튼 닫기
		const x_btn = this.children.list.find(obj => obj.texture?.key === "x_btn");

		x_btn.setInteractive({ useHandCursor: true });
		x_btn.on("pointerdown", () => {
		this.scene.stop();          // 팝업 닫기
		this.scene.resume("player_pg"); // 원래 씬 다시 활성화
	});








	
	}

	// Phaser DOM 방식으로 닉네임 입력창 생성
	createNameInput(px, py) {

		// DOM input 요소 생성
		this.nameDom = this.add.dom(px - 10, py + 190).createFromHTML(`
			<input id="profileNameInput" 
				type="text"
				style="
					width: 200px;
					font-size: 20px;
					padding: 6px 10px;
					border: 1px solid #ccc;
					border-radius: 6px;
					box-sizing: border-box;
				"
			>
		`);

		this.nameDom.setOrigin(0.5);

		// 기존 닉네임 자동 입력
		const nickname = localStorage.getItem("user_nickname") || "게스트";
		this.nameDom.getChildByID("profileNameInput").value = nickname;

		// 씬 종료 시 DOM Element 제거
		this.events.once("shutdown", () => {
			if (this.nameDom) this.nameDom.destroy();
		});
	}


}


	/* END-USER-CODE */


/* END OF COMPILED CODE */

// You can write more code here
