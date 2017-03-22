class Player extends GameObject {
    constructor(args) {
        args = {
            label: 'Player',
            width: 10,
            height: 10,
            color: 255,
            layer: 0,
            x: 0,
            y: 0,
        }
        super(args);
        this.collider = new BoxCollider(this);
        this.dir = createVector(-1,0);
        this.level = 2;
    }

    applyGravity() {
        this.acceleration = createVector(0,1);
    }

    move() {

    }

    update() {
        this.velocity.limit(this.level);
        this.velocity.add(this.dir);
        this.position.add(this.velocity)
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    collision(other) {
        console.log(this.dir);
        if (other.label) {
            this.level += 0.2;
            this.dir.mult(-1);
            this.velocity.mult(-1);
        }
    }

    draw() {
        fill(255);
        ellipse( this.position.x, this.position.y, this.width, this.height);
        push();
        stroke(255);
        rect(this.collider.position.x,this.collider.position.y,this.collider.width, this.collider.height);
        pop();
    }
}
