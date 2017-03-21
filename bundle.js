(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./gameobject');
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

},{"./gameobject":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
