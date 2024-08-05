// 모듈 가져오기
const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

// 엔진과 월드 생성
const 엔진 = Engine.create();
const { world: 세계 } = 엔진;

// 렌더러 생성
const 렌더러 = Render.create({
    element: document.body,
    engine: 엔진,
    canvas: document.getElementById('세계'),
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

Render.run(렌더러);
Runner.run(Runner.create(), 엔진);

// 경계 생성
const 경계 = [
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true, render: { fillStyle: 'white' } }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true, render: { fillStyle: 'white' } }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true, render: { fillStyle: 'white' } }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true, render: { fillStyle: 'white' } })
];
World.add(세계, 경계);

// 조종할 사각형 생성
const 플레이어 = Bodies.rectangle(400, 200, 50, 50, {
    render: {
        fillStyle: 'blue'
    }
});
World.add(세계, 플레이어);

// 랜덤 사각형 및 원 생성 함수
function 랜덤_모양() {
    const x = Math.random() * 750 + 25;
    const y = Math.random() * 550 + 25;
    const 크기 = Math.random() * 40 + 10;
    const 옵션 = {
        render: {
            fillStyle: 'white'
        }
    };
    if (Math.random() < 0.5) {
        return Bodies.rectangle(x, y, 크기, 크기, 옵션);
    } else {
        return Bodies.circle(x, y, 크기 / 2, 옵션);
    }
}

// 랜덤 사각형 및 원 추가
for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
    World.add(세계, 랜덤_모양());
}

// 키보드 이벤트 처리
document.addEventListener('keydown', (이벤트) => {
    const { key: 키 } = 이벤트;
    const 힘_크기 = 0.05;
    switch (키) {
        case 'w':
            Body.applyForce(플레이어, 플레이어.position, { x: 0, y: -힘_크기 });
            break;
        case 'a':
            Body.applyForce(플레이어, 플레이어.position, { x: -힘_크기, y: 0 });
            break;
        case 's':
            Body.applyForce(플레이어, 플레이어.position, { x: 0, y: 힘_크기 });
            break;
        case 'd':
            Body.applyForce(플레이어, 플레이어.position, { x: 힘_크기, y: 0 });
            break;
    }
});
