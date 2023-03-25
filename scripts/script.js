$(document).ready(function () {

    // меню бургер
    $('#burger').click(function () {
        $('#menu').addClass('open')
    });

    $('#menu *').click(function () {
        $('#menu').removeClass('open');
    });

    //маска для поля ввода телефона

    $("#phone").inputmask({"mask": "+375 (99) 999-99-99"});
    let loader = $('.loader');

    // валидация формы

    let buttonSubmit = $('#submit');
    let form = $('#form');

    // добавление названия макаруна в форму
    $('.order__btn').click(event => {
        $('.order')[0].scrollIntoView({behaviour: 'smooth'});
        $('#product').val($(event.target).parents('.macaroon').find('.macaroon__title').text());
    })

    buttonSubmit.click(function () {

        let name = $('#name');
        let phone = $('#phone');
        let product = $('#product');
        let input = $('.base-input');
        let hasError = false;
        let orderInfoElements = $('.order__info');
        let orderWindowSuccess = $('.order__successfull');
        let orderImage = $('.order__image');


        $('.order__error').hide();
        input.css('borderColor', '#493135');

        if (!product.val()) {
            product.next().show();
            product.css('borderColor', 'red');
            hasError = true;
        }
        if (!name.val()) {
            name.next().show();
            name.css('borderColor', 'red');
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('borderColor', 'red');
            hasError = true;
        }

        if (!hasError) {
            loader.css('display', 'flex');

            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.css('display', 'none');
                    // console.log(msg);

                    if (msg.success === 1) {
                        orderInfoElements.hide();
                        orderWindowSuccess.css('visibility', 'visible');
                        orderImage.hide();

                        product.val('');
                        name.val('');
                        phone.val('');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.')
                    }
                });
        }
    });

})
