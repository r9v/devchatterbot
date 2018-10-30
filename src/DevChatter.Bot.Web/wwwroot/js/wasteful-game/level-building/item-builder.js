import { EffectItem } from '/js/wasteful-game/entity/items/effect-item.js';
import { Item, ItemEffectType, ItemPickupType, ItemType } from '/js/wasteful-game/entity/items/item.js';
import { Sprite } from '/js/wasteful-game/entity/sprite.js';

export class ItemBuilder {
  /**
   * @param {Wasteful} game
   */
  constructor(game) {
    this._game = game;

    // TODO: Get the Item Data from passed in argument
    this._itemData = this._createStaticData();
  }

  /**
   * @public
   * @param {number} levelNumber
   */
  getItemsForLevel(levelNumber) {
    let itemType = levelNumber % 2 === 0 ? ItemType.CONSUMABLE : ItemType.WEAPON;
    return [this._pickRandom(this._itemData.filter(item => item.type === itemType))];
  }

  /**
   * @private
   * @param {Array} choices
   */
  _pickRandom(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  /**
   * @private
   */
  _createStaticData() {
    return [
      new EffectItem(
        this._game,
        new Sprite('/images/ZedChatter/Taco-0.png', 1, 1, 1),
        ItemType.CONSUMABLE,
        ItemPickupType.INSTANT,
        ItemEffectType.HEALTH,
        1,
        [{ [ItemEffectType.HEALTH]: 1 }]
      ),
      new EffectItem(
        this._game,
        new Sprite('/images/ZedChatter/Pizza-0.png', 1, 1, 1),
        ItemType.CONSUMABLE,
        ItemPickupType.INSTANT,
        ItemEffectType.POINTS,
        1,
        [{ [ItemEffectType.POINTS]: 10 }]
      ),
      new EffectItem(
        this._game,
        new Sprite('/images/ZedChatter/BlackCan-0.png', 1, 1, 1),
        ItemType.CONSUMABLE,
        ItemPickupType.INSTANT,
        ItemEffectType.POINTS,
        1,
        [{ [ItemEffectType.POINTS]: 25 }]
      ),

      new Item(
        this._game,
        new Sprite('/images/ZedChatter/BaseballBat-1.png', 1, 1, 1),
        ItemType.WEAPON,
        ItemPickupType.INVENTORY,
        null,
        1
      ),
      new Item(
        this._game,
        new Sprite('/images/ZedChatter/Axe-1.png', 1, 1, 1),
        ItemType.WEAPON,
        ItemPickupType.INVENTORY,
        null,
        1
      ),
      new Item(
        this._game,
        new Sprite('/images/ZedChatter/Sword-1.png', 1, 1, 1),
        ItemType.WEAPON,
        ItemPickupType.INVENTORY,
        null,
        1
      ),
    ];
  }
}