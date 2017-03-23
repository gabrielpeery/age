class Player extends GameObject {
    constructor(args) {
        super(args);
        this.collider = new BoxCollider(this);
        this.score = 0;
    }

    update() {
        rect(this.position.x, this.position.y, this.width, this.height);
    }

    move() {

    }

    collision(other) {
    }

    draw() {
        fill(255);
        rect(this.position.x, this.position.y, this.width, this.height);
    }
}
