class Collider {
    constructor(parent) {
        this.parent = parent;
        this.position = parent.position;
        this.width = parent.width;
        this.height = parent.height;
        this.radius = parent.radius;
        this.history = [];
        Game.colliders.push(parent);
    }

    collisionStack (object) {
        if (this.history.length >= 5) {
            this.history.shift()
            this.history.push(object);
            return;
        }
        this.history.push(object);
    }

    detect() {
        var hit;
        var other;
        for (var i in Game.colliders) {
            other = Game.colliders[i];
            hit = this.collision(other);
        }
        if (hit) {
            this.collidingObject = hit;
        }
        else {
            this.collidingObject = null;
        }
    }

    pointDistance(x, y, x1, y1, x2, y2) {

        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;

        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = -1;
        if (len_sq != 0) //in case of 0 length line
            param = dot / len_sq;

        var xx, yy;

        if (param < 0) {
            xx = x1;
            yy = y1;
        }
        else if (param > 1) {
            xx = x2;
            yy = y2;
        }
        else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        var dx = x - xx;
        var dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    get type() {
        return this.type = this._type;
    }

    set type(type) {
        return this._type = type;
    }
}

class BoxCollider extends Collider {
    constructor(parent) {
        super(parent);
        this.type = 'box';
    }
}

class EllipseCollider extends Collider {
    constructor(parent) {
        super(parent);
        this.type = 'ellipse';
    }

    collision(other) {
        if (this.position.dist(other.collider.position) <= this.radius + other.collider.radius) {
            this.parent.collision(other);
            other.collision(this.parent);
            return other;
        }
    }

}

class LineCollider extends Collider {
    constructor(parent) {
        super(parent);
        this.type = 'Line';
    }

    collision(other) {
        var collided;
        if (other.collider.type === 'ellipse') {
            if (this.pointDistance(other.collider.position.x, other.collider.position.y, this.position.x, this.position.y,  this.position2.x, this.position2.y) <= other.radius && this.parent !== other) {
                this.parent.collision(other);
                other.collision(this.parent);
                return other;
            }
        }
    }

}
