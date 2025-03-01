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
          W: Phaser.Input.Keyboard.Key;
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
          this.load.image("player", "/images/player.png");
        }

        create() {
          // 背景を画面左上に配置し、サイズを設定
          this.background = this.add.image(0, 0, "background");
          this.background.setOrigin(0, 0);
          this.background.setDisplaySize(1800, 600);

          // 地面を背景画像の水平線に合わせて配置
          const groundY = 500; // 地面のY座標を調整
          this.ground = this.add.rectangle(0, groundY, 5000, 10, 0x000000, 0);
          this.physics.add.existing(this.ground, true);

          // プレイヤーを適切な位置に配置
          this.player = this.physics.add
            .sprite(200, groundY - 105, "player")
            .setScale(1);
          this.player.setCollideWorldBounds(true);

          // プレイヤーと地面の衝突を設定
          this.physics.add.collider(this.player, this.ground);

          // カメラの設定（背景サイズに合わせる）
          this.cameras.main.setBounds(0, 0, 1800, 600);
          this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

          // キー入力設定（WASD対応）
          this.keys = {
            A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          };

          // WASDで操作できることを画面隅に表示
          this.wasdText = this.add.text(
            10,
            10,
            "【操作】A/D: 移動, W: ジャンプ",
            {
              font: "16px Arial",
            }
          );
          this.wasdText.setScrollFactor(0);

          // Enterキーのプロンプトを非表示で作成
          this.enterTextBackground = this.add.graphics();
          this.enterTextBackground.fillStyle(0xffffff, 1);
          this.enterTextBackground.fillRoundedRect(1600, 30, 200, 50, 15);
          this.enterTextBackground.setVisible(false);

          this.enterText = this.add.text(1700, 40, "Press Enter", {
            font: "24px Arial",
          });
          this.enterText.setOrigin(0.5);
          this.enterText.setVisible(false);
          // アニメーションを追加
          this.tweens.add({
            targets: [this.enterText, this.enterTextBackground],
            y: "+=10", // 10ピクセル上下に移動
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
            duration: 800,
          });
        }

        update() {
          if (!this.player) return;

          // 左右移動
          if (this.keys.A.isDown) {
            this.player.setVelocityX(-240);
          } else if (this.keys.D.isDown) {
            this.player.setVelocityX(240);
          } else {
            this.player.setVelocityX(0);
          }

          // ジャンプ
          if (this.keys.W.isDown && this.player.body?.blocked.down) {
            this.player.setVelocityY(-300);
          }

          // モノリスの前で Enter を押すと画面遷移
          if (this.player.x > 1550) {
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
