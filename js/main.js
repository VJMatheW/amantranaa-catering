const menus = [
    {
        categryId: '1',
        category: "Welcome Drink",
        items: [
            { name: 'Fruit Punch', preSelect: true },
            { name: 'Litchi Milk Shake', preSelect: false },
            { name: 'Rose Milk', preSelect: true },
            { name: 'Badam Milk', preSelect: false },
            { name: 'Pudina with Lime', preSelect: false },
            { name: 'Lime Juice', preSelect: false },
            { name: 'Lime Honey', preSelect: false },
            { name: 'Grape Juice', preSelect: false },
            { name: 'Pineapple Juice', preSelect: false }
        ]

    },
    {
        categryId: '2',
        category: "Soup",
        items: [
            { name: 'Veg. Mancho Soup', preSelect: false },
            { name: 'Coriander Soup', preSelect: true },
            { name: 'Veg. Clear Soup', preSelect: false },
            { name: 'Lemon Coriander', preSelect: false },
            { name: 'Spinach Soup', preSelect: false },
            { name: 'Tomato Soup', preSelect: false },
            { name: 'Mushroom Soup', preSelect: false },
        ]
    },
    {
        categryId: '3',
        category: "Starters",
        items: [
            { name: 'Paneer Tikka', preSelect: false },
            { name: 'Chilly Paneer', preSelect: false },
            { name: 'Veg. Manchuri', preSelect: false },
            { name: 'Ball Manchuri', preSelect: false },
            { name: 'Baby Corn Manchuri', preSelect: false },
            { name: 'Spring Roll', preSelect: false },
            { name: 'Baby Corn Garlic Dry', preSelect: false },
        ]
    },
    {
        categryId: '4',
        category: "Snack",
        items: [
            { name: 'Ridge Gourd Bajji', preSelect: false },
            { name: 'Banana Bajji', preSelect: false },
            { name: 'Chilli Bajji', preSelect: false },
            { name: 'Alu Bajji', preSelect: true },
            { name: 'Rava Vada', preSelect: true },
            { name: 'Masala Vada', preSelect: false },
            { name: 'Pakoda', preSelect: false },
        ]
    }    
];

const selectedItems = [];

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    menus.forEach(menu => {
        const { category, items } = menu;

        const categoryHeading = $(`<h6>${category}</h6>`)

        const itemsList = $('<div class="overflow-auto pe-4" style="height: 200px;max-width: 250px;"></div>')
        items.forEach(item => {
            const checkbox = $(`<input class="form-check-input" type="checkbox" onchange="toggleSelection(event, '${category}','${item.name}')" value="">`);
            if (item.preSelect) {
                toggleSelection({target: { checked: true }}, category, item.name)
                checkbox.prop('checked', true)
            }
            const label = $(`<label class="form-check-label">${item.name}</label>`)

            const itemWrapper = $(`<div class="form-check" style="padding-left: 1.75em;"></div>`)

            itemWrapper.append(checkbox);
            itemWrapper.append(label);

            itemsList.append(itemWrapper);
        });

        const categoryWrapper = $(`<div class="card px-2 py-2 me-3 flex-shrink-0"></div>`)

        categoryWrapper.append(categoryHeading);
        categoryWrapper.append(itemsList);

        $("#container-menulist").append(categoryWrapper);
    });

    // to append selected list
    appendSelectedItems();

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonial carousel
    $(".testimonial-carousel-1").owlCarousel({
        loop: true,
        dots: false,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

    $(".testimonial-carousel-2").owlCarousel({
        loop: true,
        dots: false,
        rtl: true,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

})(jQuery);

function toggleSelection(e, category, itemName) {
    let item = selectedItems.find(item => item.category == category)
    if (!item) {
        selectedItems.push({ category, count: 0, items: [] })
        item = selectedItems.find(item => item.category == category)
    }

    if (e.target.checked) {
        item.count += 1;
        item.items.push(itemName);        
    } else {
        item.count -= 1;
        item.items = item.items.filter(i => i != itemName)
    }

    // know its from code above
    if (!e.type) {
        return
    }

    appendSelectedItems();
}

function appendSelectedItems() {
    $('#selected-items').empty();
    selectedItems.forEach(si => {
        const categoryContainer = $('<div></div>');

        const category = $(`<strong>${si.category} (${si.count}) : </strong>`);
        const items = $(`<i>${si.items.join(", ")}</i>`)

        categoryContainer.append(category)
        categoryContainer.append(items)

        $('#selected-items').append(categoryContainer);
    })
}

