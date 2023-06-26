// 남은 시간 영역
var time = 200;
var x = setInterval(function() {
  document.getElementById("rest_time").innerHTML = "남은시간<br>" + time + "초";
  time--;

  if (time < -1) {
    document.getElementById("rest_time").innerHTML = "시간초과";
    clearInterval(x);
    location.href = "mega.html";
    alert("시간이 초과됐습니다.");
  }
}, 1000);

