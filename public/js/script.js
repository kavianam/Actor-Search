(function ($, H) {

    let App = {

        init: function (config) {
            this.c = config;
            this.bindEvents();
            this.setupHandlebars();
            this.loading();
        },

        bindEvents: function () {
            this.c.$select.on("change", this.fetchActorsByLastName);
            this.c.$actorList.on("click", "a", this.fetchActorInfo);
            this.c.$filmInfo.on("click", "span", this.closeFilmInfo);
            this.c.$pagination.on("click", "a", this.pageClick);
        },

        fetchActorsByLastName: function (e) {
            e.preventDefault();
            App.showActorsByLastName(0);
            $.ajax({
                url: "http://127.0.0.1:3000/count/" + App.c.$select.val(),
                success: (res) => {
                    let count = Math.ceil(res.tedad / 5);
                    App.paginationHandlebar(count);
                    App.c.$pagination.html(App.c.$paginationTemplate());
                    App.c.$pagination.find("li").first().find("a").addClass("active");
                }
            });
        },

        fetchActorInfo: function (e) {
            e.preventDefault();
            $.ajax({
                url: "http://127.0.0.1:3000/actor-info/" + $(this).data("id"),
                success: (res) => {
                    App.c.$filmInfo.slideUp();
                    App.c.$filmInfo.html(App.c.$actorInfoTemplate(res));
                    App.c.$filmInfo.slideDown("slow");
                }
            })
        },

        setupHandlebars: function () {
            this.c.$actorListTemplate = H.compile(this.c.$actorListTemplate);
            this.c.$actorInfoTemplate = H.compile(this.c.$actorInfoTemplate);
            this.c.$paginationTemplate = H.compile(this.c.$paginationTemplate);
        },

        closeFilmInfo: function () {
            App.c.$filmInfo.fadeOut();
        },

        pageClick: function (e) {
            e.preventDefault();
            App.c.$pagination.find(".active").removeClass("active");
            $(this).addClass("active");
            let page = $(this).text();
            let x = (page-1) * 5;
            App.showActorsByLastName(x);
        },

        showActorsByLastName: function (start = 0) {
            $.ajax({
                url: "http://127.0.0.1:3000/actor/" + App.c.$select.val() + "&" + start,
                success: (res) => {
                    if (res.length){
                        App.c.$actorList.html(App.c.$actorListTemplate(res));
                    }
                    else {
                        App.c.$actorList.html("<p>NO result</p>");
                    }
                }
            })
        },

        paginationHandlebar: function (count) {
            Handlebars.registerHelper('pagination', function () {
                let page = '<ul>';
                for(let i = 1; i <= count ; ++i) {
                    page += '<li><a href="javascript:void(0)">' + i + '</a></li>';
                }
                page += '</ul>';
                return new Handlebars.SafeString(page);
            });
        },

        loading: function () {
            $.ajaxSetup({
                beforeSend: function () {
                    App.c.$loading.show();
                    $("body").css("cursor", "wait");
                },
                complete: function () {
                    $('body').css('cursor', 'default');
                    App.c.$loading.hide();
                }
            })
        }
    };
    App.init({
        $select: $("select"),
        $actorList: $(".list"),
        $filmInfo: $(".filmInfo"),
        $actorListTemplate: $("#actor-list-template").html(),
        $actorInfoTemplate: $("#actor-info-template").html(),
        $paginationTemplate: $("#pagination-template").html(),
        $pagination: $(".pagination"),
        $loading: $("#loading")
    })
})(jQuery, Handlebars);