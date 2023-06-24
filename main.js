/*메가커피 - 스크린 크기와 동일한 버튼을 누르면 
1. 광고 포스터 이미지 사라짐
2. 포스터와 같은 크기의 투명한 버튼 사라짐
3. 오더 창 나타남
4. 4x3의 메뉴창 뜸
5. 페이지 표시 버튼 뜸
6. 결제 관련 페이지 뜸
7. 담은 항복 가려짐
*/
function start_btn() {
    document.getElementById("mega_start_img").style.display = 'none';
    document.getElementById("mega_start_btn").style.display = 'none';
    document.getElementById("mega_order").style.display = 'block';
    document.getElementById("mega_menu_table").style.display = 'block';
    document.getElementById("nextpage").style.display = 'flex';
    document.getElementById("pay").style.display = 'flex';
    hide_order_list();

}

function hide_order_list() {
    var list = document.getElementsByClassName("cart");
    for (i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
}
function hide_order(num) {
    var list = document.getElementsByClassName("cart");
    var size = list.length;
    list[num].style.display = 'none';
    //list[size-1].style.display = 'none';
}

var menu_list = ["추천_음료"];
function open_menu_table(id) {
    all_menu_none();
    // document.getElementById(menu_list[0]).style.display = 'none';
    // menu_list.pop();
    // menu_list.push(id);
   
    document.getElementById(id).style.display = 'block';
}

function all_menu_none() {
    document.getElementById("추천_음료").style.display = 'none';
    document.getElementById("추천_디저트").style.display = 'none';
    document.getElementById("커피_HOT").style.display = 'none';
    document.getElementById("커피_ICE").style.display = 'none';
    document.getElementById("스무디_프라페").style.display = 'none';
    document.getElementById("에이드_주스").style.display = 'none';
    document.getElementById("Tea").style.display = 'none';
    document.getElementById("커피_콜드브루").style.display = 'none';
    document.getElementById("Beverage").style.display = 'none';
    document.getElementById("디저트").style.display = 'none';
}

var menu_bar_page = 1;

function turn_menu_page(btn) {
    var current_page_id = "mega_menu_";
    if (btn == "menu_bar_right") {
        if (menu_bar_page != 3) {
            var past = document.getElementsByClassName(current_page_id + menu_bar_page);
            past[0].style.display = 'none';
            past[1].style.display = 'none';
            past[2].style.display = 'none';
            past[3].style.display = 'none';
            menu_bar_page += 1;
            if(menu_bar_page == 3) {
                all_menu_none();
                document.getElementById("Beverage").style.display = 'block';
            }
            if(menu_bar_page == 2) {
                all_menu_none();
                document.getElementById("스무디_프라페").style.display = 'block';
            }

        }
        var now = document.getElementsByClassName(current_page_id + menu_bar_page);
        now[0].style.display = 'block';
        now[1].style.display = 'block';
        now[2].style.display = 'block';
        now[3].style.display = 'block';


    }

    if (btn == "menu_bar_left") {
        if (menu_bar_page != 1) {
            var past = document.getElementsByClassName(current_page_id + menu_bar_page);
            past[0].style.display = 'none';
            past[1].style.display = 'none';
            past[2].style.display = 'none';
            past[3].style.display = 'none';
            menu_bar_page -= 1;
            if(menu_bar_page == 2) {
                all_menu_none();
                document.getElementById("커피_콜드브루").style.display = 'block';
            }
            if(menu_bar_page == 1) {
                all_menu_none();
                document.getElementById("커피_ICE").style.display = 'block';
            }
        }
        var now = document.getElementsByClassName(current_page_id + menu_bar_page);
        now[0].style.display = 'block';
        now[1].style.display = 'block';
        now[2].style.display = 'block';
        now[3].style.display = 'block';
    }

}


function Item(name, price) {
    this.name = name;
    this.number = 0;
    this.price = parseInt(price);
}

var order_list = [];
function option(id, type, price) {
    var drink = document.getElementById(id);
    drink.style.borderStyle = 'solid';
    drink.style.borderColor = 'red';

    var order = new Item(id, price);
    order.number += 1;

    var cnt = 0;
    for (i = 0; i < order_list.length; i++) {
        if (order.name == order_list[i].name) {
            order_list[i].number += 1;
            cnt += 1;
        }
    }
    if (cnt == 0 || order_list.length == 0) {
        order_list.push(order);
    }
    
    open_order_list(order_list);

    if (type == "no_option") {
        /**/
    }
}

function delete_item(index, id) {
    document.getElementById(order_list[index].name).style.borderStyle = 'none';
    document.getElementById(order_list[index].name).style.borderColor = 'none';
    hide_order(order_list.length-1);
    order_list.splice(index, 1);
    hide_order(index);
    open_order_list(order_list);
}
/*order_list에 표시하기*/
var total_list= [0, 0];
function open_order_list(order_list) {
    var total_num = 0;
    var total_price = 0;
    //var num = 120;
    // var total_time = num;
    //var timerId = null;
    for (i = 0; i < order_list.length; i++) {
        var order_id = "order_" + (i + 1);
        document.getElementById(order_id).style.display = 'flex';

        document.getElementById("range_" + (i + 1)).innerText = (i + 1) + " " + (order_list[i].name);
        document.getElementById("amount_" + (i + 1)).innerText = (order_list[i].number) + "개";
        document.getElementById("item_price_" + (i + 1)).innerText = (order_list[i].price) * (order_list[i].number) + "원";
        
        total_num += order_list[i].number;
        total_price += (order_list[i].price)*(order_list[i].number);
    }

    //document.getElementById("rest_time").innerHTML = "남은시간<br>" + (total_time) +"초"
    document.getElementById("item_number").innerHTML = "_________________________<br>선택한 상품 " + (total_num) + "개";
    document.getElementById("total_price").innerHTML = (total_price)+"원<br>결제하기";
    total_list[0] = total_num;
    total_list[1] = total_price;

}
function 전체삭제() {
    for (i = 0; i < order_list.length; i++) {
    document.getElementById(order_list[i].name).style.borderStyle = 'none';
    document.getElementById(order_list[i].name).style.borderColor = 'none';
    }
    hide_order_list();
    order_list = [];
    open_order_list(order_list);
}
 

/*결제 창*/
function open_window_pay () {

    document.getElementById("window_pay").style.display = 'block';
    document.getElementById("screen_to_window_pay").style.display  = 'block';
    write_order_list_window_pay(order_list);
    
    document.getElementById("w_total_number").innerText = total_list[0];
    document.getElementById("w_total_price").innerText =total_list[1];
    
    document.getElementById("돌아가기").style.display = 'block';
    document.getElementById("먹고가기").style.display = 'block';
    document.getElementById("포장하기").style.display = 'block';

    document.getElementById("돌아가기_2").style.display = 'none';
    document.getElementById("쿠폰사용").style.display = 'none';
    document.getElementById("페이코").style.display = 'none';
    document.getElementById("카드결제").style.display = 'none';
    

}

function close_window_pay () {
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("screen_to_window_pay").style.display  = 'none';

}

function write_order_list_window_pay (order_list) {
    for (i=0; i<order_list.length; i++) {
        var window_id = "window_" + (i+1);
        document.getElementById(window_id).style.display = 'flex';
        document.getElementById("w_order_" + (i + 1)).innerText = (i + 1) + " " + (order_list[i].name);
        document.getElementById("w_number_" + (i + 1)).innerText = (order_list[i].number) + "개 " + (order_list[i].price) * (order_list[i].number) + "원";


    }

}
function change_window_btn() {
    document.getElementById("돌아가기").style.display = 'none';
    document.getElementById("먹고가기").style.display = 'none';
    document.getElementById("포장하기").style.display = 'none';

    document.getElementById("돌아가기_2").style.display = 'block';
    document.getElementById("쿠폰사용").style.display = 'block';
    document.getElementById("페이코").style.display = 'block';
    document.getElementById("카드결제").style.display = 'block';
    
}

function back_2_window_btn() {
    document.getElementById("돌아가기").style.display = 'block';
    document.getElementById("먹고가기").style.display = 'block';
    document.getElementById("포장하기").style.display = 'block';

    document.getElementById("돌아가기_2").style.display = 'none';
    document.getElementById("쿠폰사용").style.display = 'none';
    document.getElementById("페이코").style.display = 'none';
    document.getElementById("카드결제").style.display = 'none';
}

function open_w_카드결제() {
    document.getElementById("w_카드결제").style.display = 'block';
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("w_카드결제_total_price").innerText = total_list[1]+"원";
    document.getElementById("insert_card_moving").style.display='block';
    
}

function close_w_카드결제() {
    document.getElementById("w_카드결제").style.display = 'none';
    document.getElementById("screen_to_window_pay").style.display = 'none';
    document.getElementById("insert_card_moving").style.display = 'none';

}
function open_w_쿠폰사용() {
    document.getElementById("w_쿠폰사용").style.display = 'block';
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("w_쿠폰사용_total_price").innerText = total_list[1]+"원";
    document.getElementById("insert_barcode_moving").style.display = 'block';
}
function search_w_쿠폰사용() {
    alert("쿠폰 사용이 가능합니다.")
    open_w_쿠폰사용();
}
function close_w_쿠폰사용() {
    document.getElementById("w_쿠폰사용").style.display = 'none';
    document.getElementById("screen_to_window_pay").style.display = 'none';
    document.getElementById("insert_card_moving").style.display = 'none';
    document.getElementById("insert_barcode_moving").style.display = 'none';
}

function open_w_페이코() {
    document.getElementById("w_페이코").style.display = 'block';
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("w_페이코_total_price").innerText = total_list[1]+"원";
    document.getElementById("insert_barcode_moving").style.display = 'block';
}

function close_w_페이코() {
    document.getElementById("w_페이코").style.display = 'none';
    document.getElementById("screen_to_window_pay").style.display = 'none';
    document.getElementById("insert_barcode_moving").style.display = 'none';
}

function 결제완료() {
    alert("감사합니다. 카드와 영수증을 챙겨가세요.");
    location.href = "mega.html";
}

function herf_home() {
    location.href = "mega.html";
}

/*var SetTime = 5;		// 최초 설정 시간(기본 : 초)
function msg_time() {	// 1초씩 카운트
	m = Math.floor(SetTime / 60) + "분 " + (SetTime % 60) + "초";	// 남은 시간 계산
    var msg = "현재 남은 시간은 <font color='red'>" + m + "</font> 입니다.";
	document.all.ViewTimer.innerHTML = msg;		// div 영역에 보여줌 		
			SetTime--;					// 1초씩 감소
			if (SetTime < 0) {			// 시간이 종료 되었으면..
				clearInterval(tid);		// 타이머 해제
				alert("종료");
			}	
		}

	window.onload = function TimerStart(){ tid=setInterval('msg_time()',1000) 
}*/

/*var num = 30; 타이머
let timerId = null;
var lefttime = document.getElementById('.remaining-time').innerHTML = num;

window.onclick = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    num = 30;
  }

  timerId = setInterval(() => {
    num -= 1;
    leftTime.textContent = num;
    if (num === 0) {
      num = 30;
      window.location.reload();
    }
  }, 1000);
};*/