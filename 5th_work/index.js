//-----------------------------------------------------------
//해야할 것
//로그인 버튼 활성화
//1. 이메일, 비밀번호 입력이 다 되어있을때
// - 로그인 활성화

//2. 로그인 버튼 클릭시
//-버튼에 이벤트 주기
//-이메일,비밀번호 값 가져오기
//-Ajax로 서버에 보내기
//=====================
//-Node.js서버로 이메일, 비밀번호 검증 하기
//-Node.js에서 맞는지 않맞는지 클라이언트로 보내주기
//-맞으면 다음 페이지, 맞지 않으면 유효성 확인 시켜주기

const confirm = {
  email: false,
  password: false,
};

$(document).ready(function () {
  addEvents();
});

function addEvents() {
  $(".ant-input").on("keyup", function (event) {
    //ant-input클래스를 클릭하면 기능이 동작한다.
    //console.log(event); ==> event는 해당 값이 대한 정보를 받는다?

    const target = $(event.target); //제이쿼리 문법을 사용하기 위해서는 $()로 감싸주어야 한다.
    //console.log(target); ==> target은 작성한 자기 자신을 카르킨다?
    const targetName = target.attr("name");
    //console.log(targetName); ==> 해당 태그의 name명을 가지고 온다
    const email = $("input[name = email]").val();
    //console.log(email); ==> input태그중 name이 email인 값을 찍는다
    const password = $("input[name=password]").val();

    const regExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
    //console.log(regExp.test(email)); ==> 이메링 형식이면 true를 아니면 false를 반환

    switch (targetName) {
      case "email":
        if (regExp.test(email) === false) {
          //방법1
          /* 
          target.next("i").remove();
          target.after('<i class="fa-solid fa-ban warning"></i>'); ==> 오류 아이콘을 target바로 뒤어 넣어 준다
          target.addClass("warning-input"); ==> target에 waring-input클래스를 만들어 준다.
          */
          //방법2
          target.next().remove();
          target.next().remove(); //오류 아이콘이 계속 생겨 쌓이지 않도록 지워주고 만들고 해서 결론적으로 하나만 생성 되로록 기존의 것을 지운다
          // console.log(target);
          // console.log(target.next());
          target.after('<i class="fa-solid fa-ban warning"></i>');
          target.after(
            '<span class="error-text">잘못된 이메일 양식 입니다.</span>'
          );
          target.addClass("warning-input");
          makeWarning(target, "잘못된 이메일 양식 입니다.");
          confirm.email = false;
        } else {
          target.next().remove();
          target.removeClass("warning-input");
          removeWarning(target);
          confirm.email = true;
          // console.log(confirm.email);
        }
        break;
      case "password":
        if (password.length < 5) {
          makeWarning(target, "비밀번호는 5글자 이상 입니다.");
          confirm.password = false;
        } else {
          removeWarning(target);
          confirm.password = true;
        }
        break;
    }
    //console.log(confirm);  ==> 이메일과 비밀번호 양식에 따라 true, false를 반환한다.

    //이메일과 비밀번호가 양식에 맞지 않으면 로그인, 회원가입 버튼 비활성화
    // if (confirm.email && confirm.password) {
    //   $(".ant-btn").attr("disabled", false);
    // } else {
    //   $(".ant-btn").attr("disabled", true);
    // }
  });
}
//자주 사용하는 기능 함수로 만들기
function makeWarning(target, text) {
  target.next().remove();
  target.next().remove(); //오류 아이콘이 계속 생겨 쌓이지 않도록 지워주고 만들고 해서 결론적으로 하나만 생성 되로록 기존의 것을 지운다
  // console.log(target);
  // console.log(target.next());
  target.after('<i class="fa-solid fa-ban warning"></i>');
  target.after(`<span class="error-text">${text}</span>`);
  target.addClass("warning-input");
}

function removeWarning(target) {
  target.next().remove();
  target.removeClass("warning-input");
}

//서버에 데이터를 보내야 하기때문에 가지고 온다?
//로그인 버튼을 누르면 서버로 정보 전달 하기
// $(".login-btn").on("click", function () {
//   // alert("확인"); ==> 이벤트가 정상 작동 하는자 확인을 위해 alert생성
//   const email = $("input[name=email]").val();
//   const password = $("input[name=password]").val();
//   console.log(email);
//   console.log(password);

//   const params = $("#login-form").serialize();
//   const paramArray = $("#login-form").serializeArray();
//   console.log(params);
//   console.log(paramArray);
// });

/*
  로그인 이벤트
  1. 이메일 값, 비밀번호 값 가져오기
  2. ajax를 이용해서 Node.js 서버에 데이터 보내기
  */
$(".login-btn").on("click", function () {
  const params = $("#login-form").serialize();

  $.ajax({
    url: `http://localhost:3000/login?${params}`,
    success: ({ code, msg }) => {
      alert(msg);
      if (code === "success") {
      }
    },
    error: () => {},
    finally: () => {},
  });
  const paramsArray = $("#login-form").serializeArray();
});

$(".move").on("click", function () {
  location.href = "/client/join/index.html";
});
