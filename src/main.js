
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1280,
		height: 720,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		parent: "game-container",

		// 물리 엔진 활성화 (이게 있어야 physics.add 사용 가능)
		physics: {
			default: "arcade",
			arcade: {
				gravity: { y: 0 },   // Ep1에서 player.setGravityY()로 개별 적용할 거라 여기선 0
				debug: false
			}
		},

		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		dom: {
			createContainer: true
		}
	});

	game.scene.add("Level", Level);
	game.scene.add("player_pg", player_pg);
	game.scene.add("settings", settings);
	game.scene.add("Map1", Map1);
	game.scene.add("Charac_selec", Charac_selec);
	game.scene.add("Profile", Profile);

	//본격 게임씬
	game.scene.add("Ep1", Ep1);
	game.scene.add("Boot", Boot, true);
});

//버튼 인터렉션 공용 
window.setInteractiveButton = function(btn) {
    if (!btn) return;
    btn.setInteractive({
        useHandCursor: true,
        pixelPerfect: true,
        alphaTolerance: 1
    });
};

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/asset-pack.json");
		this.load.pack("epPack", "assets/ep-pack.json");
	}

	create() {

		this.scene.start("player_pg");
	}
}