
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1280,
		height: 720,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		parent: "game-container",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Level", Level);
	game.scene.add("player_pg", player_pg);
	game.scene.add("Profile", Profile);
	game.scene.add("Map1", Map1);
	game.scene.add("Charac_selec", Charac_selec);
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
	}

	create() {

		this.scene.start("Level");
	}
}