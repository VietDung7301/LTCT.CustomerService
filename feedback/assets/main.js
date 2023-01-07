document.addEventListener('DOMContentLoaded', function(){
    startDone();
    startShipping();
    hiddenIdDiv();
    openModal();
    closeModal();
    doneClick();
    shippingClick();
    // fillInputIdOrder();
    submitForm();
});
let orderAPI = "http://localhost:3000/order";
let modalElement;
let doneListElement;
let shipListElement;
let doneLabelElement;
let shippingLabelElement;
var orderBtnElement;
let allOrders;

function startDone() {
    getOrder(renderOrderDone);

}

function startShipping() {
    getOrder(renderOrderShipping);
}

function getOrder(callback) {
    // debugger;
    // console.log("haha")
    fetch(orderAPI)
        .then(function(respone) {
            return respone.json();
        })
        .then(callback)
}

function renderOrderDone(orders) {
    // debugger;
    doneListElement = document.getElementById("done-list");
    let html = orders.map(function(order) {
        if (order.status == "done") {
            return `<li class="order"> 
          <p class="order-name">Tên sản phẩm: ${order.productList[0].productName}</p>
          <p class ="order-description">Mô tả: ${order.productList[0].description}<p>
          <img class="order-img" src="${order.productList[0].productImageUrl}">
          <p class ="order-id">ID đơn hàng: <span class="product-id">${order.id}</span></p>
          <button class= "fb-btn order-btn" value="${order.id}">Lấy mã ID đơn hàng</button>        
        </li>`;
        }
        })
    doneListElement.innerHTML = html.join(" ");
    // fillOrderIdInput(doneListElement.querySelectorAll(".order-btn"));
} 

function renderOrderShipping(orders) {
    shippingListElement = document.getElementById("shipping-list");
    let html = orders.map(function(order) {
        if (order.status == "shipping") {
            return `<li class="order"> 
          <p class="order-name">Tên sản phẩm: ${order.productList[0].productName}</p>
          <p class="order-description">Mô tả: ${order.productList[0].description}<p>
          <img class="order-img"src="${order.productList[0].productImageUrl}">
          <p class="order-id">ID đơn hàng <span class="product-id">${order.id}</span></p>  
          <button class= "fb-btn order-btn" value="${order.id}">Lấy mã ID đơn hàng</button>      
        </li>`;
        }
       
        })
       shipListElement.innerHTML = html.join(" ");
        orderBtnElement= document.querySelectorAll(".order-btn");
        console.log("orderBtnElement", orderBtnElement[0].value);
        for( let i =0 ; i<orderBtnElement.length;i++){
            orderBtnElement[i].addEventListener('click',()=>{
                modalElement = document.querySelector(".modal");
                let inputIdOrderElement = document.querySelector("#input-id-order");
                inputIdOrderElement.value = orderBtnElement[i].value;
                inputIdOrderElement.style.display = "block";
                modalElement.style.display ="none";
                console.log('ha');
                
            })
        }
    }

    


// đóng mở phần chọn id


    // console.log(orderComponentElement);
    // console.log(openOrderBtnElement);

function openModal() {
    modalElement = document.querySelector(".modal");
   let openOrderBtnElement = document.querySelector("#open-order-btn");
    openOrderBtnElement.addEventListener('click', ()=>{
        modalElement.style.display="block"
    })
}
   

function closeModal() {
    modalElement = document.querySelector(".modal");
    let orderComponentElement = document.querySelector(".order-component");
    let closeBtnElement = document.querySelector(".close-btn");
    closeBtnElement.addEventListener('click', ()=>{
        modalElement.style.display="none";
 });
  modalElement.addEventListener('click', ()=>{
    modalElement.style.display="none";
  });
  orderComponentElement.addEventListener('click', function(e) {

    e.stopPropagation();
})
    
}




// Chọn hàng đã giao hay chưa giao
// console.log({ doneLabelElement });
// console.log(shippingLabelElement);

function doneClick() {
    doneListElement = document.getElementById("done-list");
    shipListElement = document.getElementById("shiping-list");
    doneLabelElement = document.querySelector("#done-label");
    shippingLabelElement = document.querySelector("#shipng-label")
    doneLabelElement.addEventListener('click',()=>{ 
        if (!doneLabelElement.classList.contains("click-on")) {
        doneLabelElement.classList.add("click-on");
        doneListElement.style.display = "block";
        shippingLabelElement.classList.remove("click-on");
        shipListElement.style.display = "none";

    }
   }
  )
   
}

function shippingClick() {
    shipListElement = document.getElementById("shipping-list");
    doneListElement = document.getElementById("done-list");
    shippingLabelElement = document.getElementById("shipping-label");
    doneLabelElement = document.getElementById("done-label");
    shippingLabelElement.addEventListener('click', ()=>{
        if (!shippingLabelElement.classList.contains("click-on")) {
            shippingLabelElement.classList.add("click-on");
            shipListElement.style.display = "block";
            doneLabelElement.classList.remove("click-on");
            doneListElement.style.display = "none";
        }
    }
  )
}





// Ẩn đi id của khách hàng:


function hiddenIdDiv(){
    let problemListElement = document.querySelector("#problem-select");
    problemListElement.addEventListener("change", function() {
        if (this.value == "1" || this.value == "2" || this.value == "3") {
            let idOrderElement = document.querySelector(".id-order");
            idOrderElement.style.display = "block";
        }
        if (this.value == "4" || this.value == "5") {
            let idOrderElement = document.querySelector(".id-order");
            idOrderElement.style.display = "none";
        }
    }
    )
}

function submitForm(){
    let formElement = document.getElementById("feedback-form");
    let problemValueElement= document.querySelector("#problem-select");
    let usernameElement = document.querySelector("#user-name");
    let emailElement = document.querySelector("#email");
    let orderIDElement = document.querySelector("#input-id-order");
    let problemDescriptionElement = document.querySelector("#problem-description");
    formElement.addEventListener('submit',(e)=>{
        e.preventDefault();

        const data = {
            userAccount : usernameElement.value,
            userProblem : problemValueElement.value,
            userEmail : emailElement.value,
            orderId : orderIDElement.value,
            problemDescription : problemDescriptionElement.value
        }
        console.log(data);
        const parmas = new URLSearchParams('http://localhost:8000/user/complain');
        for(const key in data){
            if(data.hasOwnProperty(key)){
                parmas.append(key,data[key]);
            }
        }

        fetch("http://localhost:8000/user/complain",{
            method: "POST",
            body: parmas
        })
        .then(res => res.json())
        .then(dataRes => console.log(dataRes) )
        .catch(err => console.log(err))
    })
}