class PlatFormer extends Game {
    constructor(width, height) {
        super(width, height);
    }

    init() {
        this.player = new Player();
        this.leftPaddle = new GameObject({
            label: "leftPaddle",
            shape: 'rect',
            x: -420,
            y: 0,
            width: 10,
            height: 45,
            color: 255,
        });
        this.leftPaddle.collider = new BoxCollider(this.leftPaddle),
        this.leftPaddle.update = function() {
            rect(this.position.x, this.position.y, this.width, this.height);
        }.bind(this.leftPaddle)
        this.rightPaddle = new GameObject({
            label: "rightPaddle",
            shape: 'rect',
            x: 420,
            y: 0,
            width: 10,
            height: 45,
            color: 255,
        });
        this.rightPaddle.collider = new BoxCollider(this.rightPaddle),
        this.rightPaddle.update = function() {
            rect(this.position.x, this.position.y, this.width, this.height);
        }.bind(this.rightPaddle);
    }


    update() {
    }

    fixedUpdate() {
    }

    draw() {
        background(0);
        fill("rgba(0,0,0,0.5)")
        rect(0,0,1,height*2);
    }
}
