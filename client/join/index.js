// //1 . 이메일 검증
// //2. 비밀번호 5긓자 이상인지 검증
// //3. 비밀번호랑 재입력이랑 같은지 확인

// const { on } = require("events");

// // const { json } = require("body-parser");

// //검증 끝나면 ==> 가입하기 활성화

// const confirm = {
//   email: false,
//   password: false,
//   passwordConfirm: false,
// };

// $(document).ready(function () {
//   addEvents();
// });

// function makeWarning(target, text) {
//   target.next().remove();
//   target.next().remove();

//   target.after('<i class="fa-solid fa-ban warning"></i>');
//   target.after(`<span class="error-text">${text}</span>`);

//   target.addClass("warning-input");
// }

// function removeWarning(target) {
//   target.next().remove();
//   target.next().remove();
//   target.removeClass("warning-input");
// }

// //새로 고침 하면 데이터가 초기화
// //[브라우저가 다르면 공유가 안된다]
// //쿠기, localStorage는 : 웹 안에다 저장하는 데이터 같은 개념(웹을 껐다 켜도 데이터가 사라지지 않고 남는다)
// //쿠키 : 시간이 유한하다, 유효기가능ㄹ 설정할수 있지만 무한하게는 불가능 하다
// //localStorage :무한하게 데이터를 저장이 가능하다, 용량이 쿠키보다 높다
// //공통점
// //브라우저가 바뀌면 값이 초기 화된다. 브라우저 별로 값이 연동이 안된다
// //문자열 밖에 안들어 간다

// //json형식이여야 반환해준다(json형식 {}안에 값이 있는 것들)
// //JSON.parse : 문자열을 객체나 배열로 반환
// //JSON.stringify : 객체나 배열을 문자열로 변환
// function autoLogin({ params }) {
//   // const jsonStr = JSON.stringify(params); //객체나 배열을 문자열로 변환
//   // console.log(jsonStr);
//   localStorage.setItem("user", JSON.stringify(params)); //객체의 키값과 비슷한 개념(값을 세팅)
//   // localStorage.getItem('user'); //user로 설정한 값을 가지고 오는 방법
// }

// function addEvents() {
//   $(".ant-input").on("keyup", function (event) {
//     const target = $(event.target);
//     const targetName = target.attr("name");
//     const regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;

//     const email = $("input[name=email]").val();
//     const password = $("input[name=password]").val();
//     const passwordConfirm = $("input[name=passwordConfirm]").val();

//     switch (targetName) {
//       case "email":
//         if (regExp.test(email) === false) {
//           makeWarning(target, "이메일 양식이 잘못 되었 습니다.");
//           confirm.email = false;
//         } else {
//           removeWarning(target);
//           confirm.email = true;
//         }

//         break;

//       case "password":
//         if (password.length < 5) {
//           makeWarning(target, "잘못된 비밀번호 형식 입니다.");

//           confirm.password = false;
//         } else {
//           removeWarning(target);
//           confirm.password = true;
//         }
//         break;

//       case "passwordConfirm":
//         if (password === passwordConfirm) {
//           removeWarning(target);
//           confirm.passwordConfirm = true;
//         } else {
//           makeWarning(target, "비밀번호랑 비밀번호 재입력이 다릅니다.");
//           confirm.passwordConfirm = false;
//         }
//         break;
//     }
//     if (confirm.email && confirm.password) {
//       $(".join-success-btn").attr("disabled", false);
//     } else {
//       $(".join-success-btn").attr("disabled", true); //.join-success-btn을 제이쿼리로 가지고 온다음에 disabled속성을 다룬다
//     }
//   });

//   $(".join-success-btn").on("click", function () {
//     //이렇게 가지고 오는 것은 좋지 않은 방법
//     // const email = $("input[name=email]").val();
//     // const password = $("input[name=password]").val();
//     // const passwordConfirm = $("input[name=password-confirm]").val();

//     // console.log(email, password, passwordConfirm);

//     //방법2 - serialize(쿼리 스트링을 만들어 주는 역할)를 콘솔로그에 찍으면 쿼리스트링으로 나온다)(워리스트링 : 주소 ?값 하는 형식) - 서버로 입력한 값이 온다
//     //위의 방법으로 값을 받아오면  직접 쿼리 스트링 형태로 바꾸어 주어 길게 작성해 주어야 하므로 코드가 길어 준다.
//     const params = $("#join-form").serialize();
//     // console.log(params);

//     //ajax사용 하는 방법
//     $.ajax({
//       url: `http://localhost:3000/join?${params}`, //서버 주소를 적어 준다 (템플릿 리터럴 문법을 사용한다) , 작업자 도구 - 네트워크 = 패치 에서 보낸 데이터를 볼 수 있다.payload에 값이 있으면 성공
//       method: "get",
//       dataType: "json", //get,json은 기본값이므로 없어도 상관 없다
//       // success: function () {
//       //   //성공 했을때 실행
//       // },
//       // error: function () {
//       //   //실패했을때 실행
//       // },
//       // finally() {
//       //   //성공을 하든 못 하든 무조건 함수가 실행 된다
//       // },

//       //위의 함수를 화살표 함수로 바꾸면
//       success: ({ code, msg, data }) => {
//         //result대신 구조분해 할당을 해서 받는다
//         // console.log(result);
//         alert(msg);

//         if (code === "success") {
//           // location.href = "/5th_work/index.html"; //로그인 페이지로 이동
//           autoLogin(data);
//         }
//       }, //server.js에서 보낸 result를 받아 사용 가능 , 객체로 온다
//       error: () => {},
//       finally: () => {},
//     });
//   });

//   $(".login-btn").on("click", function () {
//     const params = $("#login-form").serialize();

//     $.ajax({
//       url: `http://localhost:3000/login?${params}`,
//       success: ({ code, msg }) => {
//         alert(msg);
//         if (code === "success") {
//         }
//       },
//       error: () => {},
//       finally: () => {},
//     });
//   });
// }

//----------------------------------------------------------

/*
1. 이메일 검증
2. 비밀번호 5글자 이상인지 검증
3. 비밀번호랑 재입력이랑 같은지 확인 
검증 끝나면 => 가입하기 활성화
*/

/*
1. 이메일 검증
2. 비밀번호 5글자 이상인지 검증
3. 비밀번호랑 재입력이랑 같은지 확인 
검증 끝나면 => 가입하기 활성화
*/

const confirm = {
  email: false,
  password: false,
  passwordConfirm: false,
};

$(document).ready(function () {
  addEvents();
});

function makeWarning(target, text) {
  target.next().remove();
  target.next().remove();

  target.after('<i class="fa-solid fa-ban warning"></i>');
  target.after(`<span class = "error-text">${text}</span>`);

  target.addClass("warning-input");
}

function removeWarning(target) {
  target.next().remove();
  target.next().remove();
  target.removeClass("warning-input");
}

/*
기존 자바스립트에 있는 함수 불러오기
1. import, export => 자바스크립트할때 배울 거임
2. script 불러오기(common의 함수 정의) => html에서 스크립트 src로 불러오기
*/

/**
 * 구조분해할당
 *
 * ==== [브라우저가 다르면 공유가 안됨] ====
 * 문자열 밖에 안들어감. [배열,객체,함수]
 * 쿠키,localStorage : 웹안에 저장하는 데이터 개념 (브라우저 바뀌면 초기화)
 * 쿠키 : 시간이 유한해요 값 유효기간을 설정할수 있지만 무제한은 안된다
 * localStorage : 사라지지않음 (용량이 좀 더 높음)
 */
function autoLogin(params) {
  /**
   * JSON.stringify : 객체나 배열을 문자열로 변환
   * JSON.parse : 문자열을 객체나 배열로 반환
   */
  localStorage.setItem("user", JSON.stringify(params));
}

// 이벤트 연결 함수
function addEvents() {
  $(".form-box").on("keyup", function (event) {
    const target = $(event.target);
    const targetName = target.attr("name");

    const email = $("input[name=email]").val();
    const password = $("input[name=password]").val();
    const passwordconfirm = $("input[name=passwordConfirm]").val();

    // 이메일 정규 표현식
    const regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;

    switch (targetName) {
      // 이메일 검증
      case "email":
        if (regExp.test(email) === false) {
          makeWarning(target, "잘못된 이메일 양식입니다.");
          confirm.email = false;
        } else {
          removeWarning(target);
          confirm.email = true;
        }

        break;

      // 비밀번호 5글자 이상인지 검증
      case "password":
        if (password.length < 5) {
          makeWarning(target, "잘못된 비밀번호 양식입니다.");
          confirm.password = false;
        } else {
          removeWarning(target);
          confirm.password = true;
        }

        break;

      // 비밀번호랑 재입력이랑 같은지 확인
      case "passwordConfirm":
        if (password === passwordconfirm) {
          removeWarning(target);
          confirm.passwordConfirm = true;
        } else {
          makeWarning(target, "비밀번호와 일치 하지 않습니다.");
          confirm.passwordConfirm = false;
        }

        break;
    }

    // 검증 끝나면 => 가입하기 활성화
    if (confirm.email && confirm.password && confirm.passwordConfirm) {
      $(".join-success-btn").attr("disabled", false);
    } else {
      $(".join-success-btn").attr("disabled", true);
    }
    console.log(confirm);
    console.log(password);
    console.log(passwordconfirm);
  });

  // 가입 하기 기능 활성화(서버)
  $(".join-success-btn").on("click", function () {
    // const email = $('input[name=email]').val();
    // const password = $('input[name=password]').val();
    // const passwordconfirm = $('input[name=password-confirm]').val();

    // 위에 것이 비 효율적이라 한번에 가져오는 방법
    const params = $("#join-form").serialize();

    $.ajax({
      url: `http://localhost:3000/join?${params}`,
      // 아래 두개는 기본 값이라 입력 안해도 됨
      method: "get",
      dataType: "json",
      success: ({ code, msg, data }) => {
        /**
         * resposne
         * : code
         * : msg
         * : data
         */
        alert(msg);
        if (code === "success") {
          location.href = "/5th_work/index.html"; //로그인 페이지로 이동
          autoLogin(data);
        }
      },
      error: () => {},
      finally: () => {},
    });
  });
}
