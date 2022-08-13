const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

//DB를 흉내 배열에 객체를 넣어 준다 (유저가 2명 있다고 가정)
const DB = {
  user: [
    {
      id: 1,
      email: "asd@naver.com",
      password: "123123123",
    },
    {
      id: 2,
      email: "qwer@gmail.com",
      password: "123456",
    },
  ],
  chat: [],
};

app.get("/", function (req, res) {
  res.send("hello Node.js!");
});

app.get("/login", function (req, res) {
  const { email, password } = req.query;

  const result = {
    code: "fail",
    msg: "입력한 값이 일치 하지 않습니다.",
  };

  const userList = DB.user;
  userList.forEach((value, index) => {
    //value에는 email, password가 있다
    if (email === value.email && password === value.password) {
      result.code = "success";
      result.msg = "로그인 되었습니다.";
    }
  });

  res.send(result);
});

app.get("/join", function (req, res) {
  // const params = req.query;

  // const email = params.email;
  // const password = params.password;
  // const passwordConfirm = params["password-confirm"]; //위와 다르게 선언한 이유 : -기호 같은게 있으면 위 처럼 불러올 수가 없다(기호가 있을경우 이렇게 선언 해준다)
  //구조분해 하당으로 바꾸면 기호가 들어가면 구조분해 할당이 안되므로 이름을 바꾸어 준다 (위의 코드와 같다.)
  const { email, password, passwordConfirm } = req.query;
  // console.log(email, password, passwordConfirm);
  const userList = DB.user;
  // console.log(userList);

  const result = {
    code: "success",
    msg: "회원가입 되었습니다",
    data: {},
  }; //응답 보낼것을 객체로 만든다

  userList.forEach((value, index) => {
    if (value.email === email) {
      result.code = "fail";
      result.msg = "중복 이메일 입니다.";
    }
  });

  if (result.code == "fail") {
    //ajax한테 응답을 해준다
    res.send(result);
    return; //밑에서 회원가입 시키지 않게 함수를 종료 시킨다.
  }

  // //forEach는 배열을 반복문 돌릴때 사용, value index를 갖는다?
  // userList.forEach((value, index) => {
  //   console.log(value, index);
  // });

  const maxArray = [];
  //구조분해 할당으로 맥스 아이디를 가지고 오기 위해 반복문을 돌린다
  userList.forEach(({ id }, index) => {
    maxArray.push(id); //id를 배열에 넣어 준다
  });
  //const는 바뀌지 않는 값이기 때문에 let을 사용
  let max = Math.max(...maxArray); //위에서 push 해서 배열에 넣은 것을 스프레드 문법...을 통해 버껴서 Math.max함수를 통해 가장 큰 값을 찾는다
  const newId = max + 1;
  console.log(max);

  //회원가입 시킴
  DB.user.push({
    id: newId,
    email: email, //위에서 받은
    password: password,
  }); //배열에 어떤 요소를 추가할때 push

  //data라는 이름으로 보내준다 처음에 result는 code,msg만 있었자만 data라는 것을 추가 했다
  result.data = {
    id: newId,
    email: email,
  };

  // res.send(result); //여기에 보내는 값이 index.js에 resposnse로 간다
  // res.send({
  //   code: "zzz",
  // });

  res.send(result);

  console.log(DB.user);

  //값이 잘 받았는지 확인
  //데이터베이스 영구적으로 데이터를 저장하는 곳(DB를 배우지 않기 때문에 수업에서는 흉내만 낼 예정이다)

  //이메일 중복되면 회원가입 안됨
  //가입 DB.user 배열에 쌓아주면 됨
  //자바스크립트 반복문,

  // console.log(email, password, passwordConfirm);
  // res.send();
});

app.listen(3000, function () {
  console.log("hello Node.js Start.");
});

app.get("/addMessage", function (req, res) {
  const { message, email, id } = req.query;

  const data = {
    message: message,
    email: email,
    id: id,
  };

  DB.chat.push(data);

  res.send({
    code: "success",
    msg: "메시지 전송 완료",
    data: data,
  });
});

app.get("/getMessage", function (req, res) {
  res.send({
    code: "success",
    data: DB.chat,
  });
});
