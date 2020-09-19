/*
 *  Created on : September 17, 2020
 *  Author     : Nabil Furmoli
 */


var imageViewScript = function () {
    'use strict';

    var self = this;

    let init = () => {
        initItems();
        initListeners();
        loadImages();

    };

    let initItems = () => {
        self.imageGroups = [];
        self.$imagesContainer = $('#images-container');
    };

    let initListeners = () => {
        $('#images-container').on('click', '.image', ThumbnailsViewListener)
    }


    /* ----------------------------------------------- */
    /* Listeners Callbacks */
    /* ----------------------------------------------- */

    function ThumbnailsViewListener() {

        let index = Number($(this).attr('index'));
        let currentGroup = self.imageGroups[index];

        // Escape if group does not have thumbnail images.
        if (currentGroup.length == 0) {
            return;
        }

        let courselContentHtml = getCourselImages(currentGroup);
        let courselIndicatorsContentHtml = getCourselIndicators(currentGroup);
        $('#thumbnail-images-moadal .carousel-inner').html(courselContentHtml);
        $('#thumbnail-images-moadal .carousel-indicators').html(courselIndicatorsContentHtml);
    }


    /* ----------------------------------------------- */
    /* Listerners helper Functions */
    /* ----------------------------------------------- */

    let getCourselImages = (group) => {

        let firstImage = group.images[0];
        let courselHtmlText = `<div class="carousel-item active">
                                   <img class="d-block w-100" 
                                    src="` + firstImage.href + `" 
                                    alt="` + firstImage.alt + `">
                                </div>`;

        for (let i = 1; i < group.images.length; i++) {
            let currentImage = group.images[i];
            let newCourselImageHtml = `<div class="carousel-item">
                                            <img class="d-block w-100" 
                                            src="` + currentImage.href + `" 
                                            alt="` + currentImage.alt + `">
                                       </div>`
            courselHtmlText = courselHtmlText.concat(newCourselImageHtml);
        }

        return courselHtmlText;
    }

    let getCourselIndicators = (group) => {

        let courselIndicatorsHtmlText = `<li data-target="#carouselExampleIndicators" 
                                            data-slide-to="0" class="active">
                                         </li>`;

        for (let i = 1; i < group.images.length; i++) {
            let newIndicator = `<li data-target="#carouselExampleIndicators" 
                                    data-slide-to="` + i + `">
                                </li>`;
            courselIndicatorsHtmlText = courselIndicatorsHtmlText.concat(newIndicator);
        }

        return courselIndicatorsHtmlText;
    }


    /* ----------------------------------------------- */
    /* Data Processing Helper Functions */
    /* ----------------------------------------------- */

    let processImages = function (data) {

        for (let i = 0; i < data.groups.length; i++) {

            let group = data.groups[i];
            self.imageGroups.push(group);
            let AvgPrice = calculateAverage(group);
            let LiElementHtmlText = `<li class="col-sm-12 col-md-4 image" 
                                         index="` + i + `" 
                                         data-toggle="modal" 
                                         data-target="#thumbnail-images-moadal">
                                            <div class="image-photo img-container">
                                                <img src="` + group.hero.href + `" alt="` + group.hero.alt + `">
                                                <div class="top-left">
                                                    <p class="m-0 weight-600 ">` + group.name + `</p>
                                                </div>
                                                <div class="bottom-left">
                                                    <p class="m-0 weight-600 ">$ ` + AvgPrice + `</p>
                                                </div>
                                            </div>
                                        </li>`;

            self.$imagesContainer.append(LiElementHtmlText);
        }
    }

    let calculateAverage = (group) => {

        if (group.priceRange) {
            let selling = group.priceRange.selling;
            let price = (selling.high + selling.low) / 2;
            return price.toFixed(2);
        }

        return group.price.selling.toFixed(2);
    }


    /* ----------------------------------------------- */
    /* Resource Request Functions */
    /* ----------------------------------------------- */

    let loadImages = function () {

        //let targetUrl = 'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json';
        let targetUrl = 'resources/data/images.json';
        $.ajax({
            url: targetUrl,
            dataType: "json",
            success: function (response) {
                processImages(response);
            },
            error: function (xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                alert(err.message);
            },
        });
    }

    init();
};

window.onload = () => {
    window.imageViewObject = new imageViewScript();
};
