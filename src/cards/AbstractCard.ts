import {Helper} from "../Helper";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

/**
 * Abstract Card Class
 *
 * To create a new card, extend the new class with this one.
 *
 * @class
 * @abstract
 */
class AbstractCard {
    /**
     * Entity to create the card for.
     *
     * @type {generic.hassEntity | generic.areaEntity}
     */
    entity: generic.hassEntity | generic.areaEntity;

    /**
     * Settings of the card
     *
     * @type {cards.abstractOptions}
     */
    settings: cards.abstractOptions = {
        type: "custom:mushroom-entity-card",
        icon: "mdi:help-circle",
    };

    /**
     * Class constructor.
     *
     * @param {generic.hassEntity | generic.areaEntity} entity The hass entity to create a card for.
     * @throws {Error} If the Helper module isn't initialized.
     */
    constructor(entity: generic.hassEntity | generic.areaEntity) {
        if (this.constructor === AbstractCard) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        if (!Helper.isInitialized()) {
            throw new Error("The Helper module must be initialized before using this one.");
        }

        this.entity = entity;
    }

    /**
     * Get a card.
     *
     * @return {cards.entityCard} A card object.
     */
    getCard(): cards.entityCard {
        return {
            entity: "entity_id" in this.entity ? this.entity.entity_id : undefined,
          ...this.settings,
        };
    }
}

export {AbstractCard};
