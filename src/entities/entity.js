export default class Entity {
    constructor(x, y) {
        if (this.constructor === Entity) {
            console.log('hello')
            throw new TypeError('Abstract class Entity')
        }

        this.posX = x;
        this.posY = y;
    }

    draw(ctx) {
        console.warn('Abstract method draw')
    }

    containsPoint({x, y}) {
        console.warn('Abstract method containsPoint')
    }

    translate({dx, dy}) {
        posX += dx;
        posY += dy;
    }
}