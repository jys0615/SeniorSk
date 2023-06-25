const $steps = document.getElementById('steps');
const $display = document.getElementById('display');
const $area_btn = document.getElementById('area-btn');
 
const data = {
    prev : '',
    curr : '',
    operator:undefined,
    pressedResult : false
}
 
$area_btn.addEventListener('click',(e)=>{
    const target = e.target;
    if(target.tagName !== 'BUTTON'){return;}
 
    //리셋인 경우
    if(target.id == "reset"){
        reset_data();
        return;}
 
    //숫자인경우
    if(target.classList.contains('num')){
        on_num(data.operator, target);}
 
    //연산자인 경우
    if(target.classList.contains('op')){
        on_ops(target);}
 
    // = 인 경우
    if(target.id == 'btn_result'){
        show_result();}
 
    //-- 최종 : blur
    target.blur();
});
 
/* 숫자버튼을 눌렀을 경우 */
function on_num(bool,target){
    const val = target.dataset.val;
    const prevOrcurr = bool ? 'curr' : 'prev';
    if(val == "-1"){
        data[prevOrcurr] = Number(data[prevOrcurr]) * -1;
    }else{
        data[prevOrcurr] += val;
    }
    $display.textContent = data[prevOrcurr];
}//on_num
 
/* 연산자를 눌렀을 경우 */
function on_ops(target){
    $steps.classList.remove('off');
    const val_op = target.dataset.val;
    data.operator = val_op;
 
    if(data.prev == undefined){return;}
 
    if(!data.pressedResult && data.curr){show_result();}
 
    show_middleStep();
    data.curr = '';
    data.pressedResult = false;
}//on_ops
 
/* 결과 = 버튼인 경우 */
function show_result(){
    if(data.prev == undefined || data.curr == undefined || !data.operator){return;}
    data.pressedResult = true;
    
    show_finalStep();
 
    data.prev = caculSwitch();
    $display.textContent = data.prev;
}//show_result
 
/* switch로 계산 */
function caculSwitch(){
    const {prev,curr,operator} = data;
    switch(operator){
        case "+" :
            return Number(prev) + Number(curr);
        case "-" :
            return Number(prev) - Number(curr);
        case "*" :
            return Number(prev) * Number(curr);
        case "/" :
            return Number(prev) / Number(curr);
    }
}//caculSwitch
 
function operator_to_string(){
    const {operator} = data;
    switch(operator){
        case "+" :
            return "+";
        case "-" :
            return "-";
        case "*" :
            return "×";
        case "/" :
            return "÷";
    }
}//operator_to_string
 
function show_middleStep(){
    const step_str = `${data.prev} ${operator_to_string()}`;
    $steps.textContent = step_str;
}//show_middleStep
 
function show_finalStep(){
    const cacul_str = `${data.prev} ${operator_to_string()} ${data.curr}`;
    $steps.textContent = `${cacul_str} =`;
}//show_finalStep
 
/* 리셋 */
function reset_data(){
    data.prev = '';
    data.curr = '';
    $steps.textContent = '&nbsp';
    $steps.classList.add('off');
    $display.textContent = '0';
    data.operator = undefined;
    data.pressedResult = true;
}//reset_data
