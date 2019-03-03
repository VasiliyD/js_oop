var AttackTypes = {
    CLOSE_RANGE : 1,
    MID_RANGE: 2,
    WIDE_RANGE: 3,
    failureProbability: {
        CLOSE_RANGE: 0.1,
        MID_RANGE: 0.3,
        WIDE_RANGE: 0.5
    }
}


class Warrior {
    constructor(name, attackType, hp) {
        this._name = name
        this._attackType = attackType
        this.hp = hp
    }

    get name() {
        return this._name
    }

    get attackType() {
        return this._attackType
    }

    attack(warrior) {
        console.error("Warrior's attack was not implemented.")
    }
}


class Gladiator extends Warrior {
    constructor(name, attackType, hp) {
        super(name, attackType, hp)
        this._fear = Math.random()
    }

    attack(warrior) {
        let damage = 0
        let attackFailed
            =  (Math.random() < AttackTypes.failureProbability[this.attackType])
            || (Math.random() < this._fear)
        if (!attackFailed)
            damage = Math.floor((Math.random() * 10) + 1)
        warrior.hp -= damage
    }
}


class Monster extends Warrior {
    constructor(name, attackType, hp) {
        super(name, attackType, hp)
        this._blindness = Math.random()
    }

    attack(warrior) {
        let damage = 0
        let attackFailed
            =  (Math.random() < AttackTypes.failureProbability[super.attackType])
            || (Math.random() < this._blindness)
        if (!attackFailed)
            damage = Math.floor((Math.random() * 10) + 1)
        warrior.hp -= damage
    }
}


class Game {
    constructor(...warriors) {
        this._warriors = warriors
        this.winner = null
    }

    start() {
        while (this._warriors.length > 1) {
            for (let warrior of this._warriors) {
                for (let rival of this._warriors) {
                    if (warrior === rival) continue
                    warrior.attack(rival)
                }
            }
            this._warriors = this._warriors.filter(function (warrior) {
                return warrior.hp > 0
            });
        }

        this.winner = (this._warriors.length == 1)
            ? this._warriors[0].name
            : null
    }
}


const gladiator = new Gladiator("Glad", AttackTypes.CLOSE_RANGE, 100)
const monster = new Monster("Monst", AttackTypes.MID_RANGE, 150)
const game = new Game(gladiator, monster)

game.start()
console.log(game.winner)
game.winner