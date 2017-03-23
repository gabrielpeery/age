class Collider {
    constructor(parent) {
        this.parent = parent;
        this.position = parent.position;
        this.width = parent.width;
        this.height = parent.height;
        this.radius = parent.radius;
        this.history = [];
        _game.colliders.push(parent);
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
        for (var i in _game.colliders) {
            other = _game.colliders[i];
            this._collision(other);
        }
    }

    _notifyCollision(other) {
        this.parent.collision(other);
        other.collision(this.parent);
        this.collidingObject = other;
        other.collider.collidingObject = other;
    }

    _collision(other) {
        if (this.parent === other) return;
        //collidePointPoint()
        //collidePointCircle()
        //collidePointRect()
        //collidePointLine()
        //collidePointPoly()
        //collideCirclePoly()
        //collideRectPoly()
        //collideLinePoly()
        //collidePolyPoly()
        //collidePointTriangle()
        if (this.type === 'box' && other.collider.type === "box") {
            if (collideRectRect(this.position.x, this.position.y, this.width, this.height, other.collider.position.x, other.collider.position.y, other.collider.width, other.collider.height)) {
                this._notifyCollision(other);
                return;
            }
        }
        if (this.type === "circle" && other.collider.type === "circle") {
            if (collideCircleCircle(this.position.x, this.position.y, this.width, other.collider.position.x, other.collider.position.y, other.collider.width)) {
                this._notifyCollision(other);
                return; 
            }
        }
        if (other.collider.type === "circle" && this.type === "box") {
            if (collideRectCircle(this.position.x, this.position.y, this.width, this.height, other.collider.position.x, other.collider.position.y, other.collider.width)) {
                this._notifyCollision(other);
                return;
            }
        }
        if (other.collider.type === "line" && this.type === "box") {
            if (collideLineRect(other.collider.position.x, other.collider.position.y, other.collider.position2.x, other.collider.position2.y, this.position.x, this.position.y, this.width, this.height)) {
                this._notifyCollision(other);
                return;
            }
        }
        if (this.type === "line" && other.collider.type === "line") {
            if (collideLineLine(this.position.x, this.position.y, this.position2.x, this.position2.y, other.collider.position.x, other.collider.position.y, other.collider.position2.x, other.collider.position2.y) ){
                this._notifyCollision(other);
                return;
            }
        }
        if (other.collider.type === "circle" && this.type === "line") {
            if (collideLineCircle(this.position.x, this.position.y, this.position2.x, this.position2.y, other.collider.position.x, other.collider.position.y, other.collider.width)) {
                this._notifyCollision(other);
                return;
            }
        }
        return;
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
        this.width = parent.width;
        this.height = parent.height;
        this.position = parent.position;
    }
}

class EllipseCollider extends Collider {
    constructor(parent) {
        super(parent);
        this.type = 'circle';
    }
}

class LineCollider extends Collider {
    constructor(parent) {
        super(parent);
        this.type = 'line';
    }
}
