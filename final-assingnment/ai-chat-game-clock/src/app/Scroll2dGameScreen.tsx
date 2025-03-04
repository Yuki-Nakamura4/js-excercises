"use client";

import { useEffect, useRef, useState } from "react";

export default function Scroll2dGameScreen({
  onEnterPress,
}: {
  onEnterPress: () => void;
}) {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null); // ゲームインスタンス管理
  const [dialogue, setDialogue] = useState<string | null>(null);

  useEffect(() => {
    if (!gameRef.current || gameInstanceRef.current) return;

    import("phaser").then((Phaser) => {
      class GameScene extends Phaser.Scene {
        player!: Phaser.Physics.Arcade.Sprite;
        keys!: { A: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };
        enterText!: Phaser.GameObjects.Text;
        canControl: boolean = false;
        bgm!: Phaser.Sound.BaseSound;

        constructor() {
          super("GameScene");
        }

        preload() {
          this.load.image("background", "/images/desert.png");
          this.load.image("player_r_1", "/images/player_r_1.png");
          this.load.image("player_r_2", "/images/player_r_2.png");
          this.load.image("player_r_3", "/images/player_r_3.png");
          this.load.audio("bgm", "/sounds/bgm/bgm.mp3");
        }

        create() {
          this.bgm = this.sound.add("bgm", { loop: true, volume: 0.4 });
          this.bgm.play();

          this.add
            .image(0, 0, "background")
            .setOrigin(0, 0)
            .setDisplaySize(1800, 600);

          const groundY = 520;
          const ground = this.add.rectangle(0, groundY, 5000, 10, 0x000000, 0);
          this.physics.add.existing(ground, true);

          this.player = this.physics.add
            .sprite(200, groundY - 155, "player_r_1")
            .setScale(1);
          this.player.setCollideWorldBounds(true);
          this.physics.add.collider(this.player, ground);

          this.anims.create({
            key: "walk",
            frames: [{ key: "player_r_2" }, { key: "player_r_3" }],
            frameRate: 6,
            repeat: -1,
          });

          this.keys = {
            A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
          };

          this.enterText = this.add.text(1567, 40, "Press Enter", {
            font: "24px Arial",
          });
          this.enterText.setOrigin(0.5);
          this.enterText.setVisible(false);

          this.tweens.add({
            targets: this.enterText,
            y: "+=10",
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
            duration: 800,
          });

          setDialogue("ここは一体どこで、いつなんだ......");
          this.canControl = false;

          this.time.delayedCall(2500, () => {
            setDialogue("ん......何かある。モノリス？");
            this.time.delayedCall(2000, () => {
              setDialogue("近づいてみよう");
              this.time.delayedCall(2000, () => {
                setDialogue(null);
                this.canControl = true;
              });
            });
          });

          this.input.keyboard!.on(
            "keydown-ENTER",
            () => this.handleEnterPress(),
            this
          );
        }

        update() {
          if (!this.player || !this.canControl) return;

          if (this.keys.A.isDown) {
            this.player.setVelocityX(-240);
            this.player.play("walk", true);
            this.player.setFlipX(true);
          } else if (this.keys.D.isDown) {
            this.player.setVelocityX(240);
            this.player.play("walk", true);
            this.player.setFlipX(false);
          } else {
            this.player.setVelocityX(0);
            this.player.setTexture("player_r_1");
          }

          if (this.player.x > 1350) {
            this.enterText.setVisible(true);
          } else {
            this.enterText.setVisible(false);
          }
        }

        handleEnterPress() {
          if (!this.canControl) return;
          this.canControl = false;
          this.player.setVelocityX(0);
          this.player.anims.stop();
          this.player.setTexture("player_r_1");

          this.time.delayedCall(500, () =>
            setDialogue("このモノリス......キーボードと液晶がついてる")
          );
          this.time.delayedCall(3000, () =>
            setDialogue("これでAIとチャットできるみたい")
          );
          this.time.delayedCall(5000, () =>
            setDialogue("こいつに今の時刻を聞ければ、元の時代に戻れるかも")
          );
          this.time.delayedCall(7000, () => setDialogue("試してみよう"));
          this.time.delayedCall(9000, () => {
            setDialogue(null);
            this.scene.stop("GameScene");
            if (gameInstanceRef.current) {
              gameInstanceRef.current.destroy(true);
              gameInstanceRef.current = null;
            }
            onEnterPress();
          });
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

      gameInstanceRef.current = new Phaser.Game(config);

      return () => {
        if (gameInstanceRef.current) {
          gameInstanceRef.current.destroy(true);
          gameInstanceRef.current = null;
        }
      };
    });
  }, []);

  return (
    <div className="relative">
      <div ref={gameRef} className="border" />
      {dialogue && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-gray-600 p-4 rounded shadow-lg w-1/3 text-center">
          {dialogue}
        </div>
      )}
    </div>
  );
}
