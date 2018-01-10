export default class Mouse {
    constructor(canvas) {
        canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
        canvas.addEventListener('mouseup', this._onMouseUp.bind(this));
        canvas.addEventListener('mousemove', this._onMouseMove.bind(this));

        this.position = {
            x: 0,
            y: 0
        };
        this.isDown = false;

        this.reset();
    }

    _onMouseDown(e) {
        this.isDown = true;
        this.wasPressed = true;
    }

    _onMouseUp(e) {
        this.isDown = false;
        this.wasReleased = true;
    }

    _onMouseMove(e) {
        this.delta = {
            dx: this.delta.dx + e.clientX - this.position.x,
            dy: this.delta.dy + e.clientY - this.position.y
        }
        this.position = {
            x: e.clientX,
            y: e.clientY
        }
    }

    reset() {
        this.delta = {
            dx: 0,
            dy: 0
        }

        this.wasPressed = false;
        this.wasReleased = false;
    }
}