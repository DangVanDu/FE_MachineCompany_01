fetch("http://localhost:3000/products")
.then(function (response) {
  console.log("resonse", response);
  return response.json();
})
.then(function (result) {
  console.log("result", result);
    //do ra console du lieu
    var row = document.getElementsByClassName("products");
    console.log(row);
    // row[0].innerHTML = "";
    // row[1].innerHTML = "";
    for(var i=0;i<result.length;i++){
      console.log("product",result[i]);

      var item = ` <div class="col-sm-4 col-md-4 col-lg-4">
      <div class="section-2__card">
      <div class="section-2__card__img"><img src="${result[i].img}" alt=""></div>
      <div class="section-2__card__content">
      <p>${result[i].price}</p>
      <p>${result[i].name}</p>
      <p><span class="icon-star-full"></span><span class="icon-star-full"></span><span class="icon-star-full"></span><span class="icon-star-full"></span><span class="icon-star-empty"></span>(${result[i].view} đánh giá)</p>
      </div>
      <div class="section-2__card__button"><button href="#" value="${result[i].id}" onclick="addToCart(this.value);">MUA NGAY</button><a href="#">XEM CHI TIẾT</a></div>
      </div>
      </div>`;
      if(i==0||i==1||i==2)      
        row[0].innerHTML += item; 
      else 
        row[1].innerHTML += item;             
    }
        // //element of product
        // var img_product = document.getElementsByClassName("product__img");
        // var brand_product = document.getElementsByClassName("product__detail__type");
        // var name_product = document.getElementsByClassName("product__detail__name");
        // var price_new_product = document.getElementsByClassName("product__detail__price__new");
        // var price_old_product = document.getElementsByClassName("product__detail__price__old");
        // var button_product = document.getElementsByClassName("product__detail__button__buy");

        // //set value into each of product
        // for(var i = 0; i<result.length;i++){
        //     console.log("product",result[i]);
        //     img_product[i].src = result[i].img;
        //     brand_product[i].innerText = result[i].brand;
        //     name_product[i].innerText = result[i].name_type;
        //     price_new_product[i].innerText = result[i].new_price;
        //     price_old_product[i].innerText = result[i].old_price;
        //     button_product[i].value = result[i].id;
        //     console.log('button',button_product[i]);
        // }

      });


function addToCart(value){
  console.log(value);


  fetch(`http://localhost:3000/products/${value}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {

    console.log("product added",result);
    var cart = localStorage.getItem(`cart_${value}`);
    console.log("cart before",cart);
    if(cart===null){
      var item = {"id":value,"img":result.img,"name":result.name,"price":result.price,"number":1};
      console.log("item",item);
      localStorage.setItem(`cart_${value}`,JSON.stringify(item));
          sumInCart();
    }
            //tang so luong 
            else{
              var cartFormat = JSON.parse(cart);
              console.log(cartFormat);
              cartFormat.number = cartFormat.number+1;
              console.log("cart after",cartFormat);
              localStorage.setItem(`cart_${value}`,JSON.stringify(cartFormat));
                  sumInCart();
            }
          });
  

}


function sumInCart(){
  var e = document.getElementsByClassName("cart_sum_number")[0];
  console.log("sum",e);

  var sumProduct =0;
  for(item in localStorage){
    if(item.includes("cart",0)){
      var cart_item = JSON.parse(localStorage.getItem(item));
      sumProduct += parseInt(cart_item.number);
      e.innerText = sumProduct;
    }
  }
}

sumInCart();