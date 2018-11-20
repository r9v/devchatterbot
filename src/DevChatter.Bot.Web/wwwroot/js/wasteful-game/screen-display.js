import { MetaData } from '/js/wasteful-game/metadata.js';
import { AttackableComponent } from '/js/wasteful-game/entity/components/attackableComponent.js';

const wastefulGray = '#cccccc';
const hangryRed = '#ff0000';
const heartIcon = '\u{1F499}';
const fontSize = 16;

export class ScreenDisplay {
  constructor(game, entityManager, canvas) {
    this._game = game;
    this._entityManager = entityManager;
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._gridWidth = this._canvas.width - MetaData.wastefulInfoWidth;
    this._gridHeight = this._canvas.height;
    this._infoLeftX = canvas.width - MetaData.wastefulInfoWidth;
    this._topY = 0;
  }

  /**
   * @public
   */
  start(userInfo, player) {
    this._playerName = userInfo.displayName;
    this._player = player;
    this._background = new Background(this._context, this._gridWidth, this._gridHeight);
    this._animationHandle = window.requestAnimationFrame(() => this._updateFrame());
  }

  /**
   * @public
   */
  stop() {
    this._clearCanvas();
    window.cancelAnimationFrame(this._animationHandle);
  }

  /**
   * @private
   */
  _updateFrame() {
    if (this._game._isGameOver) {
      this._drawGameOver();
      let delay = ms => new Promise(r => setTimeout(r, ms));
      delay(5000).then(() => this._game._endGame());
    } else {
      this._clearCanvas();
      this._drawBackground();

      this._entityManager.update();
      this._entityManager.all.forEach(entity => {
        const location = entity.location;
        if(entity.sprite !== null) {
          this._context.drawImage(entity.sprite.image, location.x * MetaData.tileSize, location.y * MetaData.tileSize);
        }
      });

      this._drawInfo();
      this._animationHandle = window.requestAnimationFrame(() => this._updateFrame());
    }
  }

  /**
   * @private
   */
  _clearCanvas() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  /**
   * @private
   */
  _drawGameOver() {
    this._context.fillStyle = hangryRed;
    this._context.font = '128px Arial';
    this._context.fillText(this._endType, 20, this._gridHeight - 10);
  }

  /**
   * @private
   */
  _drawBackground() {
    this._background.drawBackground();

    this._context.fillStyle = wastefulGray;
    this._context.fillRect(this._gridWidth, 0, MetaData.wastefulInfoWidth, this._gridHeight);
  }

    /**
   * @private
   * @param {Player} player the player's data to draw
   */
  _drawInfo() {
    this._lineNumber = 1;
    this._context.fillStyle = '#000000';
    this._context.font = `${fontSize}px Arial`;

    this._writeLine(this._playerName);
    const playerHealthCount = this._player.getComponent(AttackableComponent).health;
    this._writeLine(heartIcon.repeat(playerHealthCount));
    this._writeLine(`Points: ${this._player.points}`);
    this._writeLine(`Money: ${this._player.money}`);

    this._showItems(this._player.inventory.items);
  }

  /**
   * @private
   * @param {string} text text to write
   */
  _writeLine(text) {
    this._context.fillText(text, this._infoLeftX + 5, this._topY + 24 * this._lineNumber);
    this._lineNumber++;
  }

  /**
   * @private
   * @param {Array<Item>} items items to display
   */
  _showItems(items) {
    let y = this._canvas.height - MetaData.tileSize;
    items.forEach((item, index) => {
      let x = this._infoLeftX + (MetaData.tileSize * index + 5);

      this._context.rect(x, y - fontSize, MetaData.tileSize, MetaData.tileSize + fontSize);
      this._context.stroke();

      this._context.drawImage(item.sprite.image, x, y);
      this._context.fillText(item.remainingUses.toString(), x + 10, y);
    });
  }

}
