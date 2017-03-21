class Player extends GameObject {
    constructor(args) {
        args = {
            label: 'Player',
            width: 10,
            height: 10,
            color: 255,
            layer: 0,
            position: createVector(50,50)
        }
        super(args);
    }

    update() {
        ellipse(30,30,30,30);
    }

    draw() {
        ellipse(30,30,30,30);
    }
}
