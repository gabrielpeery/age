class Game {
    constructor(width, height) {
        var self = this;
        this.gameObjects = [];
        this.drawLayers = {};
        this.colliders = [];
        this.second = 0;
        this.background = 0;
        this.width = width;
        this.height = height;
        this.ready = false;
        this._initialized = false;
        this._hasSetSize = false;
        this.keys           = {
            upArrow:    38,
            downArrow:  40,
            leftArrow:  37,
            rightArrow: 39,
            escape:     27,
            shift:      16,
            ctrl:       17,
            super:      91,
            space:      32,
            enter:      13,
            return:     13,
            backspace:  8,
            a:          65,
            b:          66,
            c:          67,
            d:          68,
            e:          69,
            f:          70,
            g:          71,
            h:          72,
            i:          73,
            j:          74,
            k:          75,
            l:          76,
            m:          77,
            n:          78,
            o:          79,
            p:          80,
            q:          81,
            r:          82,
            s:          83,
            t:          84,
            u:          85,
            v:          86,
            w:          87,
            x:          88,
            y:          89,
            z:          90,
            fromChar: function(char) {
                return char.charCodeAt(0);
            }
        };
        window._game = this;
        window.draw = this._update.bind(this);
    }

    moveCamera(x, y, z) {
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
    }

    lockCamera(object, lerp) {
        this.camera.locked = object;
        this.camera.lerp = lerp || 1;
    }

    draw() {
    }

    update() {
    }

    fixedUpdate() {
    }

    init() {
    }

    _init() {
        this.camera = new GameObject({
            label: "camera",
            position: createVector(0,0,100),
        })
    }

    _update() {
        //rectMode(RADIUS);
        translate(width/2, height/2)
        if (this.ready && !this._initialized) {
            this.init();
            this._init();
            this._initialized = true;
        }
        if (this.camera) {
            if (this.camera.locked) {
                this.camera.position.lerp(this.camera.locked.position, this.camera.lerp);
            }
            camera(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        }
        this.draw();
        if (!this._hasSetSize) {
            this._hasSetSize = true;
            resizeCanvas(this.width, this.height);
        }
        this._lastSecond = floor(frameCount/60);
        if (this._lastSecond > this.second) {
            this.second = this._lastSecond;
            this._fixedUpdate();
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
        this.update();
    }

    _fixedUpdate(object) {
        this.gameObjects.forEach( object => {
            object.fixedUpdate();
        });
    }
}


// Boiler Plate to use p5
function setup () {
    _game.ready = true;
    createCanvas(100,100);
    //ortho(-width/2, width/2, height/2, -height/2, 0, 0);
}
function draw () {
}
 test = 32;
