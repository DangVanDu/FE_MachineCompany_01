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
    <td><input onchange="sumprice(${indexItem},this.value,${cart_item.price})" min="1" type="number" name="number" value="${number}" disabled></td>
    <td class="sum">${sumPrice}</td>
    </tr>`;
    /* tag a not pass value on event(this.value)*/
    console.log(item)
    // list_item.appendChild(document.createTextNode(item));
    console.log('list item',list_item);
    list_item.innerHTML += item;
    indexItem = indexItem+1;
  }
}

var sumAll = document.getElementsByTagName("tbody")[1];
var VAT = (sumPriceAll / 10);
var sumPay = sumPriceAll + VAT;
var sumTotal = 
`<tr class="products__item">
<td class="price__text">TỔNG TIỀN:</td>
<td class="price__number">${sumPriceAll} đ</td>
</tr>
<tr>
<td class="price__text">THUẾ (VAT):</td>
<td class="price__number">${VAT} đ</td>
</tr>
<tr>
<td class="price__text">THANH TOÁN:</td>
<td class="price__number price__number-color">${sumPay} đ</td>
</tr>`;
sumAll.innerHTML = sumTotal;

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
e.innerText = sumProduct;
}
sumInCart();