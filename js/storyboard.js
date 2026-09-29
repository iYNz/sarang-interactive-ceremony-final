/* storyboard.js — 나눔이벤트 퍼포먼스 상세 스토리보드 (도미노 · 최종안)

   지난 안(천지창조)은 진입 · 이탈 두 번을 판정했는데, 도미노는 한 번뿐이다 —
   「첫 도미노가 쓰러졌는가」. 그 뒤로는 판정 없이 흐른다. 현장에서 어긋날
   지점이 절반으로 줄었고, 그것이 이 컷 구성의 골격이다.

     대사 HUD — 사회자 멘트. 어디서 말이 나가고 어디서 화면이 받는지를 컷 위에 둔다.
     배지     — sensor 는 그 컷에서 일하는 센서, tag 는 퍼포먼스를 넘기는 트리거.
                판정이 일어나는 CUT 01 에만 붙는다.
     소리     — 컷마다 그 순간에 나는 소리를 한 줄로 적는다. 콘텐츠 음향은 우리가
                만들어 붙이므로 화면과 같은 자리에서 설계되어야 한다.
     동선     — CUT 01 에서 두 분이 걸어 들어와 가운데에 나란히 선다. 민 뒤에는
                양옆으로 조금 물러나 화면을 본다. 이동이 한 번뿐이라 동선도 단순하다.
     방향     — 좌 · 우 수렴이 아니라 앞 → 안쪽 → 다시 바깥이다. 무대 바닥에서 시작한
                쓰러짐이 화면으로 들어가 멀어지고, 오브제에서 빛이 되어 돌아 나온다.
     img 없음 — 비주얼이 아직 없는 컷은 번호와 이름만 든 판으로 그려진다(sb-led__ph).
                레이아웃이 먼저 서야 이미지가 들어올 자리를 알 수 있다. */
(function () {
  'use strict';

  /* 열네 컷. 그림을 먼저 걸고 나서 멘트 · 소리 · 설명을 붙였다.
     열일곱 컷 다 그림이 들어와 있다.

     부르는 말이 정해져 있다. 도미노는 **도미노**다 — 「줄」이라고 부르면 물건이
     아니라 선이 되고, 「첫 장 · 두 장」처럼 세면 카드가 된다. 순번도 적지 않는다
     (「세 번째 구체」). 컷은 행렬의 한 토막을 잘라 보여 주는 것뿐이라 몇 번째인지가
     이야기가 아니다. 그리고 **09 · 10 에서는 아직 등대가 아니라 구조물**이다 —
     11 에서 전체가 드러나며 등대인 것이 밝혀지는데, 앞에서 이름을 불러 버리면
     그 컷이 할 일이 없어진다.

     l1 · l2 는 **화면에서 무슨 일이 일어나는지만** 적고, 둘을 이어 **한 문장으로**
     읽히게 쓴다. 한때는 「~한다 ~한다」 두 토막을 마침표 없이 붙여 뒀는데,
     앞 토막에서 문장이 끝난 것처럼 읽혀 뒤쪽 흐린 글씨가 눈에 안 들어왔다.
     앞은 쉼표로 열어 두고 뒤에서 닫는다. 한 줄을 넘기지는 않는다 — 카드 폭
     1090px 에 22px 글자라 마흔 자 남짓까지가 한 줄이다.
 스토리보드는 이야기를
     읽히게 하는 자료이지 연출 의도를 변론하는 자리가 아니다. 「1안의 성패가 여기
     있다」 「눈높이에서 보는 유일한 컷」 같은 제작 쪽 말은 쓰지 않는다 — 그런 것은
     이 주석과 assets/led/README.md 에 적는다.
     사람 · 바닥 유도와 센서 배지는 CUT 01 · 17 에만 남겼다. 무대에서 미는 컷과
     그 앞에서 찍는 컷이라 그 둘에서만 의미가 있고, 사이의 열다섯 장은 화면 안
     장면이라 얹으면 방해만 된다. */
  var CUTS = [
    { no: 'CUT 01', ph: '대기',
      img: 'assets/led/cut01.jpg',
      sensor: 'KINECT', tag: 'DOMINO DOWN',
      /* 실물 도미노 두 장 — 화면 속 줄이 무대 바닥으로 이어져 나온 부분이다.
         두 분은 그 줄을 사이에 두고 양옆에 선다. 걸어 들어오는 모션은 없다. */
      dominoes: [{ y: 806 }, { y: 719 }],
      people: [883, 1053],
      guideOn: true,
      say: ['두 분께서 가운데 도미노를 함께 밀어 주시겠습니다.', '○○기업의 나눔이 어떻게 퍼져 나가는지 함께 보시겠습니다.'],
      snd: '잔잔한 앰비언트 — 음악은 아직 들어오지 않는다',
      l1: '두 사람이 가운데 도미노 앞에 서고,', l2: '화면에는 포탈 너머 마을까지 도미노가 이어져 있다.' },

    { no: 'CUT 02', ph: '첫 장',
      img: 'assets/led/cut02.jpg',
      snd: '나무 부딪는 첫 소리 — 여기서 음악이 들어온다',
      l1: '마지막 실물 도미노가 쓰러지면,', l2: '그 자리에서 화면 속 도미노가 이어받아 쓰러진다.' },

    /* 03 — 02 와 03 사이에 포탈 확대 컷을 한 장 더 두려다 접었다. 컷을 늘리는
       대신 **자막이 그 전환을 맡는다** — 화면이 포탈 밖(들판)에서 포탈 안(골목)
       으로 넘어가는 것이 이 컷의 첫 일이고, 적어 두지 않으면 02 에서 03 으로
       장소가 갑자기 바뀐 것처럼 보인다. */
    { no: 'CUT 03', ph: '골목',
      img: 'assets/led/cut03.jpg',
      snd: '연쇄음이 리듬이 된다',
      l1: '시점이 포탈 안쪽으로 넘어가고,', l2: '도미노가 골목을 따라 줄지어 쓰러져 나간다.' },

    { no: 'CUT 04', ph: '모퉁이',
      img: 'assets/led/cut04.jpg',
      snd: '속도가 붙고 저음이 깔린다',
      l1: '도미노가 모퉁이 건물을 감아 돌면서,', l2: '길이 꺾이는 대로 따라 꺾여 나간다.' },

    /* 05 · 07 · 08 은 한 컷 안에서 두 단계다 — 지나가기 전과 지나간 뒤.
       구체가 켜지는 것이 이 세 컷의 전부인데, 켜진 그림만 걸면 원래 그랬던
       것으로 보이고 꺼진 그림만 걸면 아무 일도 안 일어난다. 같은 자리에서
       한 장 더 넘겨야 「지나갔더니 켜졌다」가 된다.
       컷 수는 늘지 않는다. ← → 가 컷 안에서 한 번 더 머물 뿐이고, 번호도
       도트도 그대로 하나다. */
    { no: 'CUT 05', ph: '광장',
      variants: [
        { k: '지나기 전', img: 'assets/led/cut05.jpg' },
        { k: '지나간 뒤', img: 'assets/led/cut05b.jpg' }
      ],
      snd: '조형을 지날 때 차임 한 번',
      l1: '도미노가 광장의 열매 구체를 지나가면,', l2: '지나간 자리에서 구체에 불이 들어온다.' },

    { no: 'CUT 06', ph: '전광판',
      img: 'assets/led/cut06.jpg',
      snd: '밝은 모티프가 올라온다',
      l1: '건물 외벽의 캐릭터가 도미노를 따라 깨어나고,', l2: '마을이 조금씩 생기를 되찾는다.' },

    /* 07 · 08 을 한 번 맞바꿨다. 화면에 보이는 열매 뭉치 폭을 재면
         05 12.3%  ·  랜드마크 20.2%  ·  물가 7.3%  ·  09 4.0%
       랜드마크가 뒤에 있으면 08 → 09 가 20.2 → 4.0 으로 다섯 배 줄어든다.
       도착하는 컷에서 구체가 제일 작아지는 셈이라 힘이 빠진다.
       앞으로 당기면 12.3 → 20.2 → 7.3 → 4.0 이 되어, 한 번 크게 보여 준 뒤
       09 까지 완만하게 작아진다. 08 → 09 도 1.8 배 차이로 붙는다. */

    { no: 'CUT 07', ph: '조형',
      variants: [
        { k: '지나기 전', img: 'assets/led/cut08.jpg' },
        { k: '지나간 뒤', img: 'assets/led/cut08b.jpg' }
      ],
      snd: '차임이 한 번 더 — 이번엔 더 가깝게',
      l1: '도미노가 커다란 열매 구체 앞을 지나면,', l2: '눈앞에서 구체가 환하게 켜진다.' },

    { no: 'CUT 08', ph: '물가',
      variants: [
        { k: '지나기 전', img: 'assets/led/cut07.jpg' },
        { k: '지나간 뒤', img: 'assets/led/cut07b.jpg' }
      ],
      snd: '물소리가 섞이고 현이 올라가기 시작한다',
      l1: '개천을 건너 물가의 구체까지 가면,', l2: '여기에도 어김없이 불이 들어온다.' },

    /* 09 — 줄이 광장 한가운데 등대에 닿기 직전. 구체는 발치 아치 안에 있고 랜턴은
       아직 죽어 있다. 마지막 도미노가 건드리면 구체가 샤프트를 타고 꼭대기로
       올라가 마을을 밝힌다 — 05 · 07 · 08 에서 하나씩 켜 온 것이 여기서 한꺼번에
       켜지는 구조다. 그 상승을 세 박자로 쪼개는 것이 10~12 이고, 그러면 로고 컷과
       기념촬영 컷 번호가 밀린다 — assets/led/README.md 참고. */
    { no: 'CUT 09', ph: '도착',
      img: 'assets/led/cut09.jpg',
      snd: '모든 소리가 한 점으로 — 그리고 짧은 정적',
      l1: '도미노가 광장 한가운데 구조물에 닿고,', l2: '그 입구에서 구체가 기다리고 있다.' },

    /* 10~12 — 상승을 세 박자로 쪼갠 구간이다. 발치에서 꼭대기로 한 번에 건너뛰면
       올라간 게 아니라 바뀐 것으로 읽힌다. 같은 등대를 세 번 보여 주고 구체 높이만
       올리면 상승이 그림으로 보이고, 그래야 마지막에 카메라가 물러나는 것도
       줌아웃이 아니라 「빛이 어디까지 갔는지 보려고 물러나는 것」이 된다. */

    /* 10 — 샤프트 안을 바짝 붙어 본다. 09 도 클로즈업으로 바뀔 예정이라
       09 · 10 이 연달아 가까운 컷이 된다 — 11 의 전체 등장을 아끼기 위해서다.
       대신 그 사이에 「여기가 어디인지」가 비니, 09 는 등대 발치인 것까지는
       보이게 잡는다(전체 실루엣만 감춘다). README 참고. */
    { no: 'CUT 10', ph: '상승',
      img: 'assets/led/cut10.jpg',
      snd: '한 음이 길게 올라간다',
      l1: '구체가 구조물 안을 타고 오르고,', l2: '유리 너머로 마을이 흘러 내려간다.' },

    /* 11 — 등대가 처음으로 통째로 보이는 컷이다. 09 · 10 에서 조각으로만 보여
       주다가 여기서 전체를 펴 놓고, 동시에 랜턴이 켜진다. 「무엇이었는지」와
       「켜졌다」가 한 프레임에서 같이 와야 가장 크게 읽힌다.
       05 · 07 · 08 에서 하나씩 켜 온 것이 한꺼번에 켜지는 자리이기도 하다. */
    { no: 'CUT 11', ph: '점등',
      img: 'assets/led/cut11.jpg',
      snd: '가장 큰 한 방 — 여기가 「와아」다',
      l1: '구체가 꼭대기에 닿는 순간 불이 들어오고,', l2: '그제야 그것이 등대였음이 드러난다.' },

    /* 12 — 드론이 떠올라 아이소메트릭으로 마을을 내려다본다. 11 과 크기가 아니라
       상태가 다르다 — 11 은 등대 한 점이 켜진 순간이고 12 는 그 빛이 마을로
       번져 가는 중이다. **아직 다 켜지지 않아야 한다.** 여기서 다 켜 버리면
       13 이 크기만 다른 같은 그림이 된다.
       첫 박자에 2D 임팩트 프레임을 끼우는 안을 검토 중이다. 섬광은 프레임이
       아니라 전환이므로 여기 거는 그림은 **빛이 퍼진 상태**다 — README 참고. */
    { no: 'CUT 12', ph: '마을',
      img: 'assets/led/cut12.jpg',
      snd: '음이 넓어진다',
      l1: '등대에서 빛줄기가 뻗어 나가고,', l2: '따뜻한 빛이 마을 곳곳을 환하게 채운다.' },

    /* 13 — 빛이 마을 속으로 퍼져 나가는 장면. 로고는 여기 얹지 않는다 — 14 로
       넘겼다. 그래야 13 이 「빛이 어디까지 갔나」만 보여 주고, 14 가 「이름이
       붙는다」만 한다. 한 장에 두 가지를 겹치면 둘 다 약해진다.
       한 장에 두 가지를 겹치면 둘 다 약해진다. */
    { no: 'CUT 13', ph: '바깥',
      img: 'assets/led/cut13.jpg',
      snd: '여운 — 넓게 퍼지는 음',
      l1: '빛이 마을 골목 구석까지 번져 나가고,', l2: '가게 창과 길목마다 온기가 내려앉는다.' },

    /* 14 — 골목을 지나 광장까지. 로고는 얹지 않는다 — 01 과 16 에만 나오고 그 둘은
       그림에 구워져 나온다. 이제 `logos` 레이어를 쓰는 컷은 하나도 없다. */
    { no: 'CUT 14', ph: '분수',
      img: 'assets/led/cut14.jpg',
      say: '○○기업의 나눔이 이렇게 곳곳으로 퍼져 나갑니다.',
      snd: '음이 넓게 퍼진 채로 머문다',
      l1: '골목을 지나 광장까지 번져 나가고,', l2: '분수에도 창에도 빛이 앉는다.' },

    /* 15 — 마을 끝에서 들판으로 넘어가는 자리. 14 와 16 사이가 한 번에 뛰던 것을
       메운다. 세 지표를 재면 14 → 16 이 따뜻함 1.98 → 1.28, 하늘 0.1% → 77% 로
       전부 최대폭으로 튀었다. 이 컷이 1.72 · 20.4% 를 맡아 층계가 생긴다.
       그림도 그 몫이다 — 왼쪽에 마을의 마지막 건물들, 오른쪽으로 열리는 들판,
       그 끝 지평선에 16 의 포탈이 작게 서 있다. */
    { no: 'CUT 15', ph: '외곽',
      img: 'assets/led/cut15.jpg',
      snd: '음이 트이며 공간이 넓어진다',
      l1: '마을 끝을 지나 들판으로 나가면,', l2: '처음에 보았던 들판 풍경이 다시 펼쳐진다.' },

    /* 16 — 촬영 배경으로 쓸 프레임이자 **수미상관**의 자리다. 01 · 02 의 들판과
       포탈이 그대로 돌아오는데, 이번에는 포탈 안에 불 켜진 등대가 서 있고 줄은
       그 포탈에서 이쪽으로 나와 있다. 나갔다가 돌아온 것이 한 프레임에 보인다.
       원경(13 · 14)은 촬영 배경으로 쓰기 어렵다 — 멀리 뺄수록 화면이 디테일로
       가득 차 두 분이 설 자리(화면 폭 36~64%, 아래쪽 절반)에 볼거리가 깔린다.
       이 구도는 반대다. 들판과 물이 좌우를 비우고 포탈이 가운데 위쪽에 서므로,
       로고 좌우 끝과 사람 설 자리가 동시에 산다.
       자리는 04p 세이프박스와 같은 규격(30% × 26%, 안쪽으로 6%)이고, 기업이
       바뀌면 왼쪽 파일만 갈아 끼운다. */
    { no: 'CUT 16', ph: '돌아옴',
      img: 'assets/led/cut16.jpg',
      /* `logos` 를 켜지 않는다. 로고는 **촬영하는 순간(17)에 그림에 구워져 있다** —
         이 컷의 몫은 「처음 자리로 돌아왔다」 하나다. 로고까지 얹으면 돌아온 것이
         아니라 끝난 화면으로 읽힌다. */
      snd: '여운이 남은 채 화면이 멈춘다',
      l1: '도미노는 처음 자리로 돌아오고,', l2: '그 너머에는 오늘 밝힌 마을이 서 있다.' },

    /* 17 — 같은 마지막 화면을 현장 목업 안에 되돌려 놓은 컷이다.
       화면에는 16 과 같은 들판 · 포탈을 건다 — 두 분 뒤에 실제로 서 있을 그림이다.
       앞의 열네 컷은 화면만 꽉 채워 보여 줬는데, 그러면 「예쁜 그림」으로만 남고
       저것이 촬영할 때 뒤에 서 있을 화면이라는 것이 안 읽힌다. 마지막에 한 번
       공간으로 물러나 두 분과 전달판을 함께 세워, 이 그림의 쓰임을 못 박는다.
       그래서 이 컷만 목업을 쓰고(stage) 사람 · 전달판이 처음부터 켜져 있다. */
    { no: 'CUT 17', ph: '기념촬영',
      img: 'assets/led/cut17.jpg',
      /* 두 분은 **CUT 01 과 같은 자리**(883 · 1053, 바닥 890)에 선다.
         한때 화면 가까이(770) 물려 세웠다 — 앞으로 당기면 사람이 커져서 화면
         가운데 높이의 로고 세이프박스를 가릴까 봐였다. 이제 그 걱정이 없다.
         로고는 그림 아래 양쪽 구석에 구워져 있어 사람 뒤로 안 들어간다 —
         그것이 이 컷으로 보여 줄 것 중 하나다.
         그리고 이 컷에서 실물 도미노는 이미 다 쓰러진 뒤라 두 분이 벽 쪽으로
         물러나 있을 이유가 없다 — 민 자리에 그대로 서 있는 것이 맞다.
         01 과 같은 자리에 서면 처음과 끝이 같은 그림이 되기도 한다.

         전달판은 그 깊이에 맞춰 키웠다. 바닥 770 → 890 이면 사람이 1.36 배
         커지므로 폭 · 높이 · 높이차를 같은 비율로 올리고, 「조금 더 크게」를
         얹어 폭 286(pad 58) · 높이 104 로 둔다.
         가로 43~58%, 세로 55~65% 에 들어가므로 구워진 로고(아래 양쪽 구석,
         세로 79% 아래)와 겹치지 않는다. */
      /* `logos` 를 켜지 않는다 — iv15_6 은 로고가 그림 아래 양쪽 구석에 구워져
         나온 판이다. 레이어까지 켜면 로고가 네 개가 된다.
         구워진 자리가 아래 어두운 풀밭이라 대비도 좋고, 두 분이 서는 가운데
         (가로 43~58%)와도 겹치지 않는다. */
      stage: true,
      people: [883, 1053],
      banner: { pad: 58, cy: 645, h: 104 },
      guideOn: true,
      say: '두 분께서는 이 화면 앞에서 기념촬영을 진행하겠습니다.',
      snd: '음악이 잦아들고 박수',
      l1: '두 사람이 최종 화면 앞에서,', l2: '전달판을 들고 기념촬영을 한다.' }
  ];

  /* CUT 03 부터는 목업을 걷고 화면만 꽉 채운다.
     앞의 두 컷은 무대에서 벌어지는 일이라 행사장이 같이 보여야 한다 — 실물
     도미노가 어디 서 있고 두 분이 어디서 미는지가 그 두 장의 내용이다.
     그 뒤는 전부 화면 안 장면이라 목업 테두리가 남아 있으면 그림만 작아지고
     흐름이 끊긴다. 컷마다 플래그를 붙이지 않고 경계 하나로 둔다.
     `stage` 를 든 컷은 예외다 — 공간이 같이 보여야 하는 컷이라 목업을 남긴다. */
  var FULL_FROM = 2;                     /* 0-기준 인덱스 — CUT 03 */
  CUTS.forEach(function (c, i) { if (i >= FULL_FROM && !c.stage) c.full = true; });

  /* 동선 가이드는 컷별로 켠다(`guideOn`). 모든 컷에 사람이 서 있으면 어느 컷이
     무대이고 어느 컷이 화면 안 장면인지 헷갈리므로 기본은 꺼짐이고, 무대에서
     미는 CUT 01 에만 켜 둔다. 나머지는 「사람 위치」 버튼으로 켠다. */
  function guideDefault(i) { return !!CUTS[i].guideOn; }

  var strip = document.getElementById('sbStrip');
  var dotsWrap = document.getElementById('sbDots');
  var curEl = document.getElementById('sbCur');
  var totEl = document.getElementById('sbTot');
  if (!strip) return;

  var STAGE_W = 1920, CARD_W = 1180, GAP = 20;
  var OFFSET = (STAGE_W - CARD_W) / 2;   /* 활성 카드를 무대 중앙에 */
  var idx = 0;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* 센서 배지(조용함) + 트리거 배지(흰 알약) + CI 선택 토글을 같은 줄에 늘어놓는다 */
  function tagsHtml(c) {
    if (!c.sensor && !c.tag && !(c.pick && c.variants)) return '';
    var out = '';
    if (c.sensor) {
      (Array.isArray(c.sensor) ? c.sensor : [c.sensor]).forEach(function (s) {
        out += '<span class="sb-tag sb-tag--sensor">' + esc(s) + '</span>';
      });
    }
    if (c.tag) {
      (Array.isArray(c.tag) ? c.tag : [c.tag]).forEach(function (t) {
        out += '<span class="sb-tag sb-tag--trigger">' + esc(t) + '</span>';
      });
    }
    if (c.pick && c.variants) {
      out += '<span class="sb-pick">' + c.variants.map(function (v, n) {
        return '<button class="sb-pick__b' + (n === 0 ? ' is-on' : '') + '" type="button" data-no-advance data-v="' + n + '">' + esc(v.k) + '</button>';
      }).join('') + '</span>';
    }
    return '<span class="sb-tags">' + out + '</span>';
  }

  function sayHtml(c) {
    if (!c.say) return '';
    var lines = Array.isArray(c.say) ? c.say : [c.say];
    return '<div class="sb-say' + (c.sayWide ? ' sb-say--wide' : '') + '"><span class="sb-say__who">사회자</span>' +
             '<p class="sb-say__t">' + lines.map(esc).join('<br />') + '</p>' +
           '</div>';
  }

  /* 바닥 유도 그래픽 — 지정 자리를 표시하는 글로우 마크(/ \).
     목업 16:9 기준 백분율이라 프레임 위에 얹으면 바닥에 놓인 것처럼 보인다.
     이동 방향 화살표는 여기 없다 — 픽토그램 몸통 옆에 함께 그린다(personSvg). */
  function guideHtml(g) {
    /* 기울기는 목업 바닥 타일의 소실선 각도다 — 자리마다 달라서 인라인으로 준다 */
    return '<span class="sb-g sb-g--mark" style="left:' + g.x + '%;top:' + g.y + '%">' +
             '<span class="sb-g__mark" style="transform:rotate(' + (g.rot || -70) + 'deg)"></span>' +
           '</span>';
  }
  /* 프레임(z 1) 위에 놓여야 바닥에 보인다.
     사람보다 먼저 그린다 — 바닥에 놓인 마크를 밟고 선 것이므로 사람이 위에 와야 한다.
     몸통이 반투명이라 가려진 부분도 비쳐 보이고, 발 아래로 삐져나온 쪽만 또렷하다. */
  function floorHtml(c) { return (c.floor || []).map(guideHtml).join(''); }

  /* ---- 사람 픽토그램 ----
     06p 센서 도식과 같은 도형을 이 장 모든 컷에도 세운다. 화면 앞에 사람이 서 있다는 게
     컷마다 보여야 클라이언트가 동선을 읽을 수 있다.
     상반신이 LED를 가리는 자리라 화면 위에서는 어둡게 빠지고 테두리만 밝게 남긴다.
     가로 0.5 · 세로 1.02 를 기준으로, 몸통에만 가로 1.21 을 더 준다.
     다만 비균등 스케일을 도형에
     그대로 먹이면 머리가 찌그러지고 몸통 라운드도 타원이 되어 뭉개진다. 그래서
       머리 — 가로 스케일에 맞춘 지름의 '정원'
       몸통 — 가로만 1.1배 더 준 뒤, 좌우 라운드는 rx=ry 인 정상 원호
     로 따로 잡는다. 좌표는 목업 16:9(1920×1080) 기준이라 06p 와 그대로 공유한다.
     wx 를 주면 그 자리로 걸어오는 루프가 붙는다 — cx 는 도착 지점이고 wx 는
     출발 지점까지의 오프셋이다. 방향 표시도 같은 <g> 안에 그려 함께 움직인다. */
  var P = { h: 345, sx: 0.5, sy: 1.02, bx: 1.21 };
  function personSvg(cx, footY, wx, k) {
    k = k || 1;
    var H = P.h * P.sy * k;
    var hr = P.h * 0.13 * P.sx * k;                 /* 정원 반지름 */
    var headY = footY - H + hr;
    var hw = P.h * 0.21 * P.sx * P.bx * k;          /* 몸통 반폭 */
    var shY = headY + hr * 1.7;                     /* 목 간격 */
    var r = hw * 0.62;                              /* 좌우 동일한 라운드 */
    var body = 'M' + (cx - hw) + ' ' + footY + 'V' + (shY + r) +
               'Q' + (cx - hw) + ' ' + shY + ' ' + (cx - hw + r) + ' ' + shY +
               'H' + (cx + hw - r) +
               'Q' + (cx + hw) + ' ' + shY + ' ' + (cx + hw) + ' ' + (shY + r) +
               'V' + footY + 'Z';
    var moving = typeof wx === 'number' && wx !== 0;
    var attr = moving
      ? ' class="sb-person sb-person--walk" style="--wx:' + wx + 'px"'
      : ' class="sb-person"';
    return '<g' + attr + '>' +
      '<circle cx="' + cx + '" cy="' + headY + '" r="' + hr + '"' +
        ' fill="#0a0a0c" fill-opacity=".6" stroke="#f5f5f7" stroke-width="3.5"/>' +
      '<path d="' + body + '" fill="#0a0a0c" fill-opacity=".6" stroke="#f5f5f7" stroke-width="3.5" stroke-linejoin="round"/>' +
      (moving ? goSvg(cx, (footY + shY) / 2, hw, wx) : '') +
    '</g>';
  }

  /* 이동 방향 표시 — 바닥이 아니라 몸통 옆, 가슴께 높이에 붙인다.
     바닥에 두면 마크 · 목업 타일과 섞여 잘 안 보이는데, 몸통 옆은 배경이 비어 있다.
     사람과 같은 <g> 안이라 걸음 트랜스폼을 그대로 타고 함께 움직인다.
     대(帶)가 있는 화살표(→) 대신 홑화살표(›) 하나만 쓴다 — 획이 최소라 이 크기에서
     가장 또렷하고, 픽토그램 옆에서 형태가 경쟁하지 않는다.
     진행 방향은 -sign(wx) 이고(wx 는 출발 오프셋), 표시는 그 반대편 —
     뒤에서 미는 자리에 둔다. */
  function goSvg(cx, cy, hw, wx) {
    var d = wx > 0 ? -1 : 1;                 /* 진행 방향 */
    var ax = cx - d * (hw + 24);             /* 몸통 옆으로 살짝 떨어뜨린다 */
    return '<g class="sb-person__go" transform="translate(' + ax + ' ' + cy + ')' +
             (d < 0 ? ' scale(-1 1)' : '') + '">' +
      '<path d="M-5 -11L6 0-5 11" fill="none" stroke="#fff" stroke-width="4"' +
        ' stroke-linecap="round" stroke-linejoin="round"/>' +
    '</g>';
  }
  window.SB_PERSON = personSvg;   /* 06p(tech.js) 가 같은 도형을 쓴다 */

  /* 기념촬영 컷 — 두 사람이 가로로 긴 전달판을 함께 든다.
     몸 앞에서 드는 것이므로 사람보다 나중에(위에) 그린다.
     안쪽 가로줄 세 개는 판에 글자가 들어간다는 표시다. */
  function bannerSvg(x1, x2, cy, h) {
    var w = x2 - x1, cx = (x1 + x2) / 2, gap = h * 0.26;
    var lines = [0.56, 0.78, 0.42].map(function (k, n) {
      var lw = (w - 56) * k;
      return '<path d="M' + (cx - lw / 2) + ' ' + (cy + (n - 1) * gap) + 'h' + lw + '"' +
        ' stroke="#f5f5f7" stroke-opacity=".85" stroke-width="7" stroke-linecap="round"/>';
    }).join('');
    return '<g class="sb-person">' +
      '<rect x="' + x1 + '" y="' + (cy - h / 2) + '" width="' + w + '" height="' + h + '" rx="8"' +
        ' fill="#0a0a0c" fill-opacity=".72" stroke="#f5f5f7" stroke-width="3.5"/>' +
      lines +
    '</g>';
  }

  /* ---- 무대 원근 ----
     소실점을 좌 · 우 벽 밑선에서 실측했다. 두 벽이 각각 독립으로 x 967.6 을
     가리켜(화면 정중앙) 맞은 값이라고 본다.

       왼쪽 벽 밑선   y = -0.5250x + 945.3
       오른쪽 벽 밑선 y =  0.5310x -  76.4
       만나는 점      (967.6, 437.4)

     한때 여기에 490 을 썼다. 그래서 무대 위 물체가 죄다 실제보다 덜 커지고,
     화면 속 줄과 이어지는 자리에서 각도가 꺾여 보였다. */
  var VP = { x: 968, y: 437 };

  /* ---- 실물 도미노 ----
     LED 앞 무대 바닥에 서는 장들이다. 화면 속 줄이 그대로 이어져 나온 부분이라
     크기를 임의로 정할 수 없다 — 이음매에서 화면 속 맨 앞 장과 굵기가 맞아야
     하고, 거기서 기울기가 결정된다.

       LED 창 : x 606..1332 / y 285..692 (1920×1080 을 0.378 로 줄여 넣는다)
       화면 맨 앞 장 : 원본 y 1010 · 폭 149  →  창 안에서 y 665.6 · 폭 56.3
       기울기 k = 56.3 / (665.6 - 437) = 0.2468

     높이는 화면 속 장들의 비율(높이/폭 = 2.11)을 그대로 쓴다. 이래야 같은
     물건이 계속 오는 것으로 보인다. 결과적으로 도미노 높이는 같은 깊이에 선
     사람 키의 62% — 가슴과 배꼽 사이라는 합의와도 맞는다.

     자리는 화면 속 줄의 간격을 그대로 이어 잡는다. 같은 간격으로 늘어선 줄은
     1/(y - 소실선) 이 일정하게 줄어든다 — 화면 속 두 장에서 그 값을 재어
     같은 폭만큼 두 번 더 빼면 806 과 719 가 나온다.

     윗면을 함께 그린다. 평평한 사각형만으로는 두 장이 안 갈린다 — 뒷장이 앞장
     안에 거의 포개져서 계단 하나처럼 보인다. */
  var D = { kw: 0.2468, kh: 0.5203, kdep: 0.0978 };
  function dominoSvg(d) {
    var cx = d.x || VP.x;
    var s = d.y - VP.y;                              /* 앞면 깊이 */
    var yb = d.y - D.kdep * s;                       /* 뒷면이 닿는 바닥 */
    var sb = yb - VP.y;
    var w = D.kw * s,  x0 = cx - w / 2,  x1 = cx + w / 2,  yT = d.y - D.kh * s;
    var wb = D.kw * sb, b0 = cx - wb / 2, b1 = cx + wb / 2, yB = yb - D.kh * sb;
    return '<polygon points="' + [x0, yT, x1, yT, b1, yB, b0, yB].join(' ') + '"' +
             ' fill="#23232a" stroke="#f5f5f7" stroke-width="3.5" stroke-linejoin="round"/>' +
           '<rect x="' + x0 + '" y="' + yT + '" width="' + w + '" height="' + (d.y - yT) + '"' +
             ' fill="#0a0a0c" stroke="#f5f5f7" stroke-width="3.5" stroke-linejoin="round"/>';
  }
  /* 한 <g> 에 묶어 투명도를 그룹째 먹인다. 장마다 반투명을 주면 겹친 자리만
     짙어져 앞장 안에 뒷장 그림자가 박힌 것처럼 보인다. 그룹으로 묶으면 먼저
     불투명하게 합쳐진 뒤 한 번만 투과되므로, 앞장이 뒷장을 제대로 가린다.
     뒤 장부터 그린다. */
  function dominoesHtml(list) {
    if (!list || !list.length) return '';
    return '<g class="sb-domino" opacity=".7">' +
             list.slice().sort(function (a, b) { return a.y - b.y; }).map(dominoSvg).join('') +
           '</g>';
  }
  /* 06p(tech.js) 가 같은 도미노를 같은 자리에 그린다 — 판정 영역이 무엇을
     감싸는지 보이려면 03p 와 픽셀 단위로 같은 물건이어야 한다. */
  window.SB_DOMINOES = dominoesHtml;
  window.SB_BANNER = bannerSvg;   /* 08p(cue.js) 가 같은 전달판을 그린다 */

  /* 사람은 맨 앞 도미노보다 **앞에** 선다. 나란히 세우면 옆에 서 있는 것이지
     미는 것으로 안 보인다. 바닥선을 890 으로 내려 맨 앞 장(806)보다 84 앞에
     두고, 좌우로는 그 장과 조금 겹치게 좁혀 세운다 — 밀 수 있는 거리다.

     사람도 깊이에 따라 커진다. 픽토그램만 고정 크기로 두면 도미노는 원근을
     타는데 사람만 안 타서, 앞으로 나올수록 작아 보인다.
     기준은 「같은 깊이에서 도미노가 사람 키의 62%」다. 도미노 기울기가
     0.5203 이므로 사람 키의 기울기는 0.5203/0.62 = 0.839 이고, 지금 픽토그램
     크기(352)가 그 기울기와 맞는 깊이는 419 다. */
  var FOOT = 890, PERSON_REF = 419;
  function peopleHtml(c) {
    if (!c.people && !c.dominoes) return '';
    var b = c.banner;
    var foot = c.foot || FOOT;
    var k = (foot - VP.y) / PERSON_REF;
    var inner = dominoesHtml(c.dominoes);
    inner += (c.people || []).map(function (x, n) {
      return personSvg(x, foot, c.walk && c.walk[n], k);
    }).join('');
    if (b && c.people && c.people.length === 2) {
      inner += bannerSvg(c.people[0] - b.pad, c.people[1] + b.pad, b.cy, b.h);
    }
    return '<svg class="sb-people" viewBox="0 0 1920 1080" preserveAspectRatio="none">' +
             inner +
           '</svg>';
  }

  /* 현장 목업 위에 LED 화면만 얹는다.
     mockup10 은 LED 자리가 투명으로 빠진 파일이라, 화면 레이어를 뒤에 깔고
     목업을 위에 덮으면 창 안에만 그림이 들어간다.
     창 좌표는 mockup10 의 알파 bbox 를 실측해 CSS 에 박아뒀다. */
  function mediaHtml(c, i) {
    var screen = c.variants
      /* 단계가 있는 컷 — 모든 상태를 겹쳐 두고 불투명도로 넘긴다.
         ← → 로 한 단계씩 밟으며, 전환은 CSS 트랜지션이 받는다 */
      ? c.variants.map(function (v, n) {
          var on = (n === 0 ? ' is-on' : '');
          return v.img
            ? '<img class="sb-var' + on + '" src="' + v.img + '" alt="' + esc(c.no) + '" draggable="false" />'
            : '<span class="sb-var' + on + ' sb-led__ph">' +
                '<span class="sb-led__no">' + String(i + 1).padStart(2, '0') + '</span>' +
                '<span class="sb-led__t">' + esc(v.k) + '</span>' +
              '</span>';
        }).join('')
      : c.img
      ? '<img src="' + c.img + '" alt="' + esc(c.no) + '" draggable="false" />'
      /* 로고 컷은 번호 · 이름을 띄우지 않는다. 두 로고 사이에 커다란 숫자가 끼면
         그것도 화면에 들어가는 요소처럼 읽힌다. 배경이 비었다는 건 카드 아래
         「CUT 10」과 assets/led/README.md 가 이미 말하고 있다. */
      : c.logos
      ? ''
      : '<span class="sb-led__ph">' +
          '<span class="sb-led__no">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="sb-led__t">' + esc(c.ph) + '</span>' +
        '</span>';
    /* 로고는 화면 위에 얹히는 별개 레이어다 — 생성물에 굽지 않는다.
       기업마다 종횡비가 달라(KB 국문 lockup 은 가로로 매우 길다) 고정 상자 안에
       contain 으로 넣는다. 자리 · 크기는 04p 세이프박스와 같은 값이다. */
    if (c.logos) {
      screen += '<img class="sb-logo sb-logo--l" src="assets/logo/kb.webp" alt="후원사 로고" draggable="false" />' +
                '<img class="sb-logo sb-logo--r" src="assets/logo/sarang.png" alt="사랑의열매" draggable="false" />';
    }
    /* full — 그림 자체가 이미 행사장 전경인 컷. 목업 창 안에 넣으면 방 안에 방이
              들어가므로 프레임을 걷고 화면 레이어를 카드 전체로 편다. 동선 가이드는
              같은 16:9 좌표계를 쓰므로 그대로 얹힌다.
       한때 lit 플래그로 「이 컷만 목업을 밝게」를 골랐다. 이제 모든 컷이 밝으므로
       뺐다(css/storyboard.css 의 .sb-shot__frame 참고). */
    return '<span class="sb-shot' + (c.full ? ' sb-shot--full' : '') + '">' +
             '<span class="sb-shot__screen">' + screen + '</span>' +
             (c.full ? '' :
               '<img class="sb-shot__frame" src="assets/mockup/mockup10.png" alt="행사장 LED 월 설치 뷰" draggable="false" />') +
             /* 동선 가이드는 비워 두고 필요할 때 채워 넣는다 — DOM 에 들어오는
                순간이 곧 걸음 애니메이션의 시작점이라, 마크업에 미리 깔아 두면
                그 컷을 펼치기도 전에 이미 다 끝나 있다. */
             '<span class="sb-guide"></span>' +
           '</span>';
  }

  /* ---- 렌더 ---- */
  var html = '';
  CUTS.forEach(function (c, i) {
    html +=
      '<div class="sb-card" data-i="' + i + '">' +
        '<div class="sb-card__inner">' +
          mediaHtml(c, i) +
          tagsHtml(c) +
          sayHtml(c) +
          '<span class="sb-card__grad"></span>' +
          '<div class="sb-card__text">' +
            '<span class="sb-card__no">' + c.no + '</span>' +
            '<p class="sb-card__cap"><span class="l1">' + esc(c.l1) + '</span> <span class="l2">' + esc(c.l2) + '</span></p>' +
            (c.snd ? '<span class="sb-snd"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z"/><path d="M16 8.6a5 5 0 0 1 0 6.8M18.7 6a8.6 8.6 0 0 1 0 12"/></svg>' + esc(c.snd) + '</span>' : '') +
          '</div>' +
        '</div>' +
      '</div>';
  });
  strip.innerHTML = html;

  var dotsHtml = '';
  CUTS.forEach(function (c, i) {
    dotsHtml += '<button class="sb-dot" type="button" data-no-advance data-i="' + i + '" aria-label="' + c.no + '"></button>';
  });
  dotsWrap.innerHTML = dotsHtml;

  /* 「사람 위치」 토글이 도트 오른쪽에 붙어 있었다. 사람이 그려지는 컷이 01 과
     17 둘뿐이라 나머지 열다섯 장에서는 눌러도 바뀌는 것이 없었다. 걷는다.
     goff[] 는 남겨 둔다 — 가이드를 끄는 경로가 없어졌을 뿐 구조는 그대로다. */

  /* 라이트박스는 걸지 않는다 — 발표 중 목업을 잘못 눌러 확대가 열리면 흐름이 끊긴다.
     같은 화면들은 04p CMS 목업의 미리보기에서 크게 볼 수 있으므로 잃는 것이 없다. */

  var cards = Array.prototype.slice.call(strip.querySelectorAll('.sb-card'));
  var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('.sb-dot'));
  if (totEl) totEl.textContent = '/ ' + String(CUTS.length).padStart(2, '0');

  function render() {
    strip.style.transform = 'translateX(' + (OFFSET - idx * (CARD_W + GAP)) + 'px)';
    cards.forEach(function (el, i) { el.classList.toggle('is-active', i === idx); });
    dots.forEach(function (el, i) { el.classList.toggle('is-on', i === idx); });
    if (curEl) curEl.textContent = String(idx + 1).padStart(2, '0');
    syncDot();
  }

  /* 두 단계짜리 컷(05 · 07 · 08)에서 활성 도트를 절반만 채웠다가 마저 채운다.
     도트를 하나 더 만들지는 않는다 — 컷은 하나이기 때문이다. 늘려야 하는 것은
     개수가 아니라 「여기서 한 번 더 누른다」는 신호뿐이다. */
  function syncDot() {
    var el = dots[idx];
    if (!el) return;
    var st = stepsOf(idx);
    el.style.setProperty('--p', st > 1 ? (ssel[idx] + 1) / st : 1);
  }

  /* ---- 단계 상태 ----
     컷 하나는 여러 단계로 나뉜다. 가이드가 켜지는 단계(guideAt)가 컷마다 다르다.

       변형이 있는 컷(05 · 07 · 08)  0 지나기 전 · 1 지나간 뒤
       guideFirst 인 컷             0 화면만 · 1 가이드+변형0 · 2 가이드+변형1
       나머지 컷                    0 하나뿐이고 가이드는 처음부터 켜져 있다

     한때는 모든 컷이 0단계에서 가이드를 껐다. 화면을 먼저 보여주고 동선을 얹는
     순서가 컷 하나만 놓고 보면 옳지만, 다섯 장을 이어서 넘기면 컷마다 사람이
     사라졌다 다시 걸어 들어와 한 장면으로 이어지지 않는다.
     그래서 그 순서가 실제로 의미를 갖는 CUT 01 — 빈 화면의 파티클이 사람을
     불러들이는 컷 — 에만 남기고, 나머지는 처음부터 세워 둔다.
     변형이 가이드보다 뒤인 이유는 CUT 01 의 「파티클 → (걸어 들어옴) → 형상 완성」이
     실제 순서이기 때문이다. */
  var vsel = CUTS.map(function () { return 0; });   /* 카드 → 현재 변형 */
  var ssel = CUTS.map(function () { return 0; });   /* 카드 → 현재 단계 */
  var goff = CUTS.map(function (c, i) { return !guideDefault(i); }); /* 카드 → 가이드를 끈 상태 */
  var setVariant = [];          /* 카드 인덱스 → 이미지·버튼을 바꾸는 함수 */
  var setGuide = [];            /* 카드 인덱스 → 가이드를 넣고 빼는 함수 */

  function guideAt(i) { return CUTS[i].guideFirst ? 1 : 0; }   /* 가이드가 켜지는 단계 */
  function stepsOf(i) {
    var c = CUTS[i];
    return (c.variants ? c.variants.length : 1) + guideAt(i);
  }
  function guideOn(i) { return !goff[i] && ssel[i] >= guideAt(i); }

  /* 단계를 실제 화면에 반영한다. rebuild 가 참이면 가이드를 새로 만들어 넣어
     걸음이 처음부터 다시 재생된다 — 가이드를 방금 켰거나 그 컷에 막 도착했을 때다.
     변형만 바뀔 때는 다시 만들지 않는다. */
  function applyStep(i, sN, rebuild) {
    var g = guideAt(i);
    sN = Math.max(0, Math.min(stepsOf(i) - 1, sN));
    var was = ssel[i];
    ssel[i] = sN;
    if (setVariant[i]) setVariant[i](Math.max(0, sN - g));
    if (setGuide[i]) setGuide[i](guideOn(i), !!rebuild || (was < g && sN >= g));
    /* 카드 안에서 단계만 밟을 때는 render() 를 거치지 않으므로 여기서 버튼을 맞춘다 —
       CUT 01 의 0단계로 되돌아왔는데 버튼만 켜진 채로 남던 것을 막는다. */
    if (i === idx) syncDot();
  }

  /* ---- 이동 ---- */
  function goTo(i, dir) {
    var nx = Math.max(0, Math.min(CUTS.length - 1, i));
    if (nx === idx) return false;
    idx = nx;
    /* 앞에서 오면 첫 단계, 뒤에서 오면 마지막 단계부터.
       도착할 때마다 가이드를 새로 만들어 넣는다 — 걸음이 있는 컷(CUT 03 의 물러남)은
       그 컷을 펼친 순간부터 재생되어야 한다. 이미 다 끝난 자세로 서 있으면
       무엇이 트리거인지 보이지 않는다. */
    applyStep(idx, dir < 0 ? stepsOf(idx) - 1 : 0, true);
    render();
    return true;
  }
  window.SB = {
    next: function () {
      if (ssel[idx] < stepsOf(idx) - 1) { applyStep(idx, ssel[idx] + 1); return true; }
      return goTo(idx + 1, 1);
    },
    prev: function () {
      if (ssel[idx] > 0) { applyStep(idx, ssel[idx] - 1); return true; }
      return goTo(idx - 1, -1);
    },
    reset: function (fromEnd) {
      idx = fromEnd ? CUTS.length - 1 : 0;
      CUTS.forEach(function (c, i) {
        goff[i] = !guideDefault(i);  /* 손으로 바꾼 상태는 슬라이드를 다시 열면 풀린다 */
        applyStep(i, i === idx && fromEnd ? stepsOf(i) - 1 : 0, i === idx);
      });
      render();
    }
  };

  /* ---- 클릭 ---- */
  cards.forEach(function (el) {
    el.addEventListener('click', function () {
      if (dragged) return;
      /* 활성 카드는 deck.js 의 라이트박스가 받는다 */
      var i = parseInt(el.getAttribute('data-i'), 10);
      if (i !== idx) goTo(i);
    });
  });
  dots.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      goTo(parseInt(el.getAttribute('data-i'), 10));
    });
  });

  /* 단계 전환 — 카드 안 LED 이미지와 버튼 상태를 함께 바꾼다.
     좌우 이동(window.SB)도 이 함수를 그대로 쓰므로 조작 경로가 하나로 모인다.
     버튼 클릭은 전파를 끊어야 카드 이동이나 라이트박스가 같이 열리지 않는다. */
  cards.forEach(function (card) {
    var i = parseInt(card.getAttribute('data-i'), 10);
    var c = CUTS[i];

    /* 변형 전환 — 이미지 레이어와 CI 버튼 상태를 함께 바꾼다 */
    var vs = c && c.variants;
    if (vs) {
      var layers = Array.prototype.slice.call(card.querySelectorAll('.sb-shot__screen .sb-var'));
      var btns = Array.prototype.slice.call(card.querySelectorAll('.sb-pick__b'));
      setVariant[i] = function (n) {
        n = Math.max(0, Math.min(vs.length - 1, n));
        vsel[i] = n;
        layers.forEach(function (im, m) { im.classList.toggle('is-on', m === n); });
        btns.forEach(function (o, m) { o.classList.toggle('is-on', m === n); });
        /* 도착 단계에서는 걸음을 멈추고 방향 표시도 걷는다 — 이미 자리에 섰으므로 */
        if (c.arrive) card.classList.toggle('is-arrived', n > 0);
      };
      btns.forEach(function (b) {
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          /* CI 버튼은 변형만 고른다 — 가이드가 단계에 묶인 컷이면 그만큼 밀어 준다 */
          applyStep(i, parseInt(b.getAttribute('data-v'), 10) + guideAt(i));
        });
      });
    }

    /* 동선 가이드 — 켤 때 만들어 넣고 끌 때 걷어낸다.
       DOM 에 들어오는 순간이 걸음 애니메이션의 시작점이라, 이렇게 해야 「누르면
       그때부터 걸어 들어온다」가 된다. 변형만 바뀔 때는 다시 만들지 않는다. */
    var slot = card.querySelector('.sb-guide');
    setGuide[i] = function (on, rebuild) {
      if (!slot) return;
      if (!on) { slot.innerHTML = ''; card.classList.remove('is-guide'); return; }
      if (rebuild || !slot.innerHTML) slot.innerHTML = floorHtml(c) + peopleHtml(c);
      card.classList.add('is-guide');
    };
  });

  /* ---- 드래그 · 스와이프 ---- */
  var down = false, startX = 0, dragged = false;
  strip.addEventListener('mousedown', function (e) {
    down = true; dragged = false; startX = e.clientX;
    strip.classList.add('is-drag');
  });
  window.addEventListener('mousemove', function (e) {
    if (!down) return;
    if (Math.abs(e.clientX - startX) > 10) dragged = true;
  });
  window.addEventListener('mouseup', function (e) {
    if (!down) return;
    down = false; strip.classList.remove('is-drag');
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 60) goTo(idx + (dx < 0 ? 1 : -1));
    setTimeout(function () { dragged = false; }, 0);
  });

  var touchX = 0;
  strip.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  strip.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchX;
    if (dx < -50) goTo(idx + 1);
    else if (dx > 50) goTo(idx - 1);
  }, { passive: true });

  render();
})();
