(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
require('./gameobject');
require('./collider');
class Game {
    constructor() {
        this.gameObjects = [];
        this.drawLayers = {};
        this.colliders = [];
        this.second = 0;
    }

    update() {
        var self = this;
        this._lastSecond = floor(frameCount/30);
        if (this._lastSecond > this.second) {
            this.second = this._lastSecond;
            this.fixedUpdate();
        }
        Object.keys(this.drawLayers).forEach( layer => {
            this.drawLayers[layer].forEach( object => {
                object._draw();
                object._update();
                if (object.collider) {
                    object.collider.detect();
                }
            });
        });
    }

    fixedUpdate(object) {
        this.gameObjects.forEach( object => {
            object.fixedUpdate();
        });
    }

    draw() {

    }
}

},{"./collider":1,"./gameobject":3}],3:[function(require,module,exports){
class GameObject {
    constructor(args) {
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

        Game.gameObjects.push(this);
        if (typeof Game.drawLayers[args.layer] !== 'undefined')
             Game.drawLayers[args.layer].push(this);
        else {
            Game.drawLayers[args.layer] = [this];
        }
    }

    collision (other) {
    }

    _update() {
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
}
//function GameObject (args) {
//    this.width          = args.width || 0;
//    this.height         = args.height || 0;
//    this.collider       = args.collider || null;
//    this.shape          = args.shape || 'ellipse';
//    this.color          = args.color || "rgb(0)";
//    this.stroke         = args.stroke || "rgb(0)";
//    this.position       = args.position || createVector(0,0);
//    this.velocity       = createVector(0,0);
//    this.acceleration   = createVector(0,0);
//    this.drawCallback   = args.draw || function () {};
//    this.updateCallback = args.update || function () {};
//
//    window._gameObjects.push(this);
//}

//GameObject.prototype.update = function() {
//    this.draw();
//    if (this.updateCallback) {
//        this.updateCallback();
//    }
//    if (this.drawCallback) {
//        this.drawCallback();
//    }
//}

//GameObject.prototype.draw = function() {
//    push();
//
//    fill(this.color);
//    stroke(this.stroke);
//    window[this.shape](this.position.x, this.position.y, this.width, this.height);
//
//    pop();
//}
//
//GameObject.prototype.serialize = function () {
//        return {
//            position:   this.position.array(),
//            width:      this.width,
//            height:     this.height,
//            shape:      this.shape,
//            color:      this.color,
//        }
//    }

},{}]},{},[2]);
