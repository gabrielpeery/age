class GameObject {
    constructor(args) {
        args = args || {};
        this.label          = args.label;
        this.width          = args.width ? args.width : 1;
        this.height         = args.height ? args.height :  1;
        this.shape          = args.shape || 'ellipse';
        this.color          = args.color || "rgb(0)";
        this.stroke         = args.stroke || "rgb(0)";
        this.position       = createVector(args.x, args.y);
        this.velocity       = createVector(0,0);
        this.acceleration   = createVector(0,0);
        this.collider       = args.collider;
        this.radius         = this.width/2;
        this.layer          = args.layer || 0;
        this.parent         = args.parent;

        _game.gameObjects.push(this);
        if (typeof _game.drawLayers[this.layer] !== 'undefined')
             _game.drawLayers[this.layer].push(this);
        else {
            _game.drawLayers[this.layer] = [this];
        }
        window.addEventListener("keyup", this.keyReleased);
        window.addEventListener("keydown", this.keyReleased);
    }

    collision (other) {
    }

    _update() {
        this.x = this.position.x;
        this.y = this.position.y;
        if (this.collider) {
            this.collider.position = this.position;
        }
        if (this.collidingObject) {
            this.collidingObject = this.collider.collision(this.collidingObject);
        }
        this.update();
    }

    _draw () {
        this.draw();
    }

    update() {
    }

    draw () {
    }

    fixedUpdate() {
    }

    serialize() {
        return {
            position:   this.position.array(),
            width:      this.width,
            height:     this.height,
            shape:      this.shape,
            color:      this.color,
        }
    }

    keyDown(key) {
        return keyIsDown(key);
    }

    addKeyAction(action, callback) {
        if (action === "release") {
            window.addEventListener('keyup', callback);
            return;
        }
        if (action === "press") {
            window.addEventListener('keydown', callback);
            return;
        }
    }
}
