"use client";

import { useEffect, useRef, useState } from "react";

export default function Scroll2dGameScreen({
  onEnterPress,
}: {
  onEnterPress: () => void;
}) {
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameRef.current || gameStarted) return;

    setGameStarted(true);

    import("phaser").then((Phaser) => {
      class GameScene extends Phaser.Scene {
        player!: Phaser.Physics.Arcade.Sprite;
        background!: Phaser.GameObjects.Image;
        ground!: Phaser.GameObjects.Rectangle;
        keys!: {
          A: Phaser.Input.Keyboard.Key;
          D: Phaser.Input.Keyboard.Key;
        };
        wasdText!: Phaser.GameObjects.Text;
        enterText!: Phaser.GameObjects.Text;
        enterTextBackground!: Phaser.GameObjects.Graphics;

        constructor() {
          super("GameScene");
        }

        // 画像の読み込み
        preload() {
          this.load.image("background", "/images/desert.png");
          this.load.image("player_r_1", "/images/player_r_1.png"); // 立ち
          this.load.image("player_r_2", "/images/player_r_2.png"); // 歩き1
          this.load.image("player_r_3", "/images/player_r_3.png"); // 歩き2
        }

        create() {
          // 背景を設定
          this.background = this.add.image(0, 0, "background");
          this.background.setOrigin(0, 0);
          this.background.setDisplaySize(1800, 600);

          // 地面の設定
          const groundY = 520; // 地面のY座標
          this.ground = this.add.rectangle(0, groundY, 5000, 10, 0x000000, 0);
          this.physics.add.existing(this.ground, true);

          // プレイヤーの設定
          this.player = this.physics.add
            .sprite(200, groundY - 155, "player_r_1")
            .setScale(1);
          this.player.setCollideWorldBounds(true);
          this.physics.add.collider(this.player, this.ground);

          // **アニメーションの作成**
          this.anims.create({
            key: "walk",
            frames: [{ key: "player_r_2" }, { key: "player_r_3" }],
            frameRate: 6, // 1秒間に6フレーム
            repeat: -1, // 無限ループ
          });

          // **キー入力の設定（A, D のみ）**
          this.keys = {
            A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
          };

          // WASD説明テキスト
          this.wasdText = this.add.text(10, 10, "【操作】A/D: 移動", {
            font: "16px Arial",
          });
          this.wasdText.setScrollFactor(0);

          // Enterキーのプロンプト（非表示）
          this.enterTextBackground = this.add.graphics();
          this.enterTextBackground.fillStyle(0xffffff, 1);
          this.enterTextBackground.fillRoundedRect(1600, 30, 200, 50, 15);
          this.enterTextBackground.setVisible(false);

          this.enterText = this.add.text(1567, 40, "Press Enter", {
            font: "24px Arial",
          });
          this.enterText.setOrigin(0.5);
          this.enterText.setVisible(false);

          // Enterキーの点滅アニメーション
          this.tweens.add({
            targets: [this.enterText, this.enterTextBackground],
            y: "+=10",
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
            duration: 800,
          });
        }

        update() {
          if (!this.player) return;

          // **移動処理**
          if (this.keys.A.isDown) {
            this.player.setVelocityX(-240);
            this.player.play("walk", true);
            this.player.setFlipX(true); // 左向き
          } else if (this.keys.D.isDown) {
            this.player.setVelocityX(240);
            this.player.play("walk", true);
            this.player.setFlipX(false); // 右向き
          } else {
            this.player.setVelocityX(0);
            this.player.setTexture("player_r_1"); // 静止状態
          }

          // **モノリスの前で Enter を押すと画面遷移**
          if (this.player.x > 1350) {
            this.enterText.setVisible(true);
            this.input.keyboard!.on("keydown-ENTER", () => onEnterPress());
          } else {
            this.enterText.setVisible(false);
          }
        }
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1800,
        height: 600,
        parent: gameRef.current!,
        physics: {
          default: "arcade",
          arcade: { gravity: { x: 0, y: 500 } },
        },
        scene: GameScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      const game = new Phaser.Game(config);

      return () => {
        game.destroy(true);
      };
    });
  }, []);

  return <div ref={gameRef} className="border" />;
}
