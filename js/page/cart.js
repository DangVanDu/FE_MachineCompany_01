console.log(localStorage);
var  list_item = document.getElementsByTagName("tbody")[0];
list_item.innerHTML ="";
var sumPriceAll = 0;
var indexItem =0;//id của thẻ sum
for(item in localStorage){
  if(item.includes("cart",0)){
    var cart_item = JSON.parse(localStorage.getItem(item));
    var id_product = cart_item.id;
    var img_product = cart_item.img;
    var name_product = cart_item.name;
    var price_product = cart_item.price;
    var number = cart_item.number;
    var sumPrice= price_product*number;
    sumPriceAll += sumPrice;
    var item =
    `<tr class="products__item">
    <td>${id_product}</td>
    <td><img src="${img_product}" alt="product"></td>
    <td>${name_product}</td>
    <td>${price_product} Đ</td>
    <td><input onchange="sumprice(${indexItem},this.value,${cart_item.price})" min="1" max="20" type="number" name="number" value="${number}"></td>
    <td class="sum">${sumPrice}</td>
    <td><button class="close" type="button" onclick="removeProductInCart(this.value)" value="${id_product}">&times;</button></td>
    </tr>`;
    /* tag a not pass value on event(this.value)*/
    console.log(item)
    // list_item.appendChild(document.createTextNode(item));
    console.log('list item',list_item);
    list_item.innerHTML += item;
    indexItem = indexItem+1;
  }
}
//onchange number
function sumprice(id,number,price){
  console.log("a",id,number,price);
  var sumprice =document.getElementsByClassName("sum")[id];
  sumprice.innerHTML =`${number*price}<sup>đ</sup>`;

//Thay đổi khi thay đổi input number
  var sumMoney =0;
  var sumMoneyElement = document.getElementsByClassName("sum");
  for (var i = 0;i<  sumMoneyElement.length; i++) {
   sumMoney += parseInt(sumMoneyElement[i].innerText);
  }
  document.getElementsByClassName("price__number")[0].innerText = sumMoney+"đ";
  document.getElementsByClassName("price__number")[1].innerText = sumMoney/10 +"đ"
  document.getElementsByClassName("price__number")[2].innerText = parseInt(sumMoney*1.1)+"đ"

updateCartInPage();
}
//
var sumAll = document.getElementsByTagName("tbody")[1];
var VAT = (sumPriceAll / 10);
var sumPay = sumPriceAll + VAT;
var sumTotal = 
`<tr class="products__item">
<td class="price__text">TỔNG TIỀN:</td>
<td class="price__number">${sumPriceAll} Đ</td>
</tr>
<tr>
<td class="price__text">THUẾ (VAT):</td>
<td class="price__number">${VAT} Đ</td>
</tr>
<tr>
<td class="price__text">THANH TOÁN:</td>
<td class="price__number price__number-color">${sumPay} Đ</td>
</tr>`;
sumAll.innerHTML = sumTotal;
// function button delete
function removeProductInCart(value){
  console.log(value);
  localStorage.removeItem(`cart_${value}`);
  window.location.href="";
}

//update to localStorage
function updateCartInPage() {
  console.log("updat");
    var list_item = document.getElementsByClassName("products__item");
    for(var i=0;i<list_item.length;i++){
        console.log(list_item[i]);
        var item = list_item[i];

        //get the product:id and number to update
        var button = item.children[6].children[0];
        var id_product = button.value;
        var input_number = item.children[4].children[0];
        var number = input_number.value;
        console.log("update",button,input_number);

        //set to the  localStorage
        var item_localStorage = JSON.parse(localStorage.getItem(`cart_${id_product}`));
        item_localStorage.number = number;
        localStorage.setItem(`cart_${id_product}`,JSON.stringify(item_localStorage));
    }
    // window.location.href ="";
}
function sumInCart(){
    var e = document.getElementsByClassName("cart_sum_number")[0];
    console.log("sum",e);

var sumProduct =0;
for(item in localStorage){
  if(item.includes("cart",0)){
    var cart_item = JSON.parse(localStorage.getItem(item));
     sumProduct += parseInt(cart_item.number);
}

}
e.innerText = sumProduct
}
sumInCart();


