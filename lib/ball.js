class Ball extends GameObject {
    constructor(args) {
        super(args);
        this.collider = new EllipseCollider(this);
        this.acceleration = createVector(-1,0);
        this.level = 1;
        this.xDir = -1;
        this.yDir = 0;
    }

    applyGravity() {
        this.acceleration = createVector(0,1);
    }

    move() {

    }

    update() {
        //this.collider.position = createVector(this.position.x + (this.radius * -1), this.position.y + (this.radius * -1));
        //this.velocity.limit(this.level);
        //this.velocity.add(this.acceleration);
        //this.position.add(this.velocity)
        this.position.x += this.xDir * this.level;
        this.position.y += this.yDir;
        if (this.position.y - this.width < (height/2) *-1 || this.position.y + this.width > (height/2)) {
            this.yDir *= -1;
        }
        if (this.position.x < (width/2) * -1) {
            game.rightPaddle.score += 1;
            this.position = createVector(0,0);
            this.yDir = 0;
            this.xDir *= -1;
            this.level = 1;
        }
        if (this.position.x > (width/2))  {
            game.leftPaddle.score += 1;
            this.position = createVector(0,0);
            this.yDir = 0;
            this.xDir *= -1;
            this.level = 1;
        }
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    collision(other) {
        if (other.collider.type === "box") {
            var angle = (((other.position.y + other.height/2) - this.position.y)/10);
            console.log(p5.Vector.fromAngle(p5.Vector.angleBetween(this.position, other.position)));
            this.level += 1;
            //this.acceleration.y = angle;
            this.yDir = -1 * angle;
            this.xDir *= -1;
            //this.acceleration.mult(-1);
            //this.velocity.mult(-1);
        }
    }

    draw() {
        fill(255);
        ellipse( this.position.x, this.position.y, this.width, this.height);
    }
}
