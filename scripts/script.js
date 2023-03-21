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

    buttonSubmit.click(function () {

        let name = $('#name');
        let phone = $('#phone');
        let product = $('#product');
        let input = $('.base-input');
        let hasError = false;
        let orderInfoElements = $('.order__info');
        let orderWindowSuccess = $('.order__successfull');
        let orderImage = $('.order__image');
        loader.css('display', 'flex');

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

        if (hasError) {

            $.ajax({
                method: "POST",
                url: "http://testologia.site/checkout",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.css('display', 'none');
                    // console.log(msg);
                    if (msg.success === 1 && msg.name === 'itlogia') {
                        orderInfoElements.attr('visibility', 'hidden');
                        orderWindowSuccess.attr('visibility', 'visible');
                        orderImage.attr('opacity', '0.3');
                    }
                    /*если не добавлять в условие тот факт, что значения в полях есть, то алерт будет появляться,
                    даже когда они не заполнены, что противоречит условиям ТЗ*/
                    else if (product.val() && name.val() && phone.val() && msg.success === 0) {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.')
                    }
                });
        }
    })

})
