class PlatFormer extends Game {
    init() {
        this.ball = new Ball({
            label: 'ball',
            width: 20,
            height: 20,
            color: 255,
            layer: 0,
            x: 0,
            y: 0,
        });
        this.leftPaddle = new Player({
            label: "leftPaddle",
            shape: 'rect',
            x: -420,
            y: -30,
            width: 10,
            height: 60,
            color: 255,
        });
        this.rightPaddle = new Player({
            label: "rightPaddle",
            shape: 'rect',
            x: 420,
            y: -30,
            width: 10,
            height: 60,
            color: 255,
        })
    }


    update() {
        var left  = this.leftPaddle;
        var right = this.rightPaddle;
        if (keyIsDown(this.keys.w)) {
            left.position.y -= 3;
        }
        if (left.keyDown(this.keys.s)) {
            left.position.y += 3;
        }
        if (right.keyDown(this.keys.upArrow)) {
            right.position.y -= 3;
        }
        if (right.keyDown(this.keys.downArrow)) {
            right.position.y += 3;
        }
    }

    fixedUpdate() {
    }

    draw() {
        background(0);
        stroke("rgba(255,255,255,0.5)")
        line(0,height/2*-1 + 40,0,height*2);
        textSize(32);
        text(this.leftPaddle.score, -width/4,-height/2+32);
        text(this.rightPaddle.score, width/4,-height/2+32);
        text(this.ball.level-1, this.ball.level - 1 < 10 ? -32/4 : -32/2,-height/2+32);
    }
    
    keyPressed(keyCode) {
    }
}
