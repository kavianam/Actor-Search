let $search = $(".search");
let $select = $search.find("select");
let $list = $search.find(".list");
let $filmInfo = $(".filmInfo");

$select.on("change",function () {
    $.ajax({
        url: "http://127.0.0.1:3000/actor/" + $(this).val() + "&1",
        success: (result) => {
            let html = "<ul>";
            if (result.length) {
                $.each(result, function (i, v) {
                    html += "<li>";
                    html += "<a href='#' data-actor='";
                    html += v.actor_id + "' >";
                    html += v.first_name + " " + v.last_name;
                    html += "</a>";
                    html += "</li>";
                });
            } else {
                html = "<li> No result </li>";
            }
            html += "</ul>";
            $list.html(html);
        }
    })
});

// $list.on("click","a", function () {
//     let x = $(this).text();
//     x = x.replace(/\s+/g, '');
//     $.ajax({
//         url: "http://127.0.0.1:3000/actor-info/" + x,
//         success: (result) => {
//             let html = "<p> <span>X</span>";
//             html += result.film_info;
//             html += "</p>";
//             $filmInfo.slideUp();
//             $filmInfo.html(html);
//             $filmInfo.slideDown("slow");
//         }
//     })
// });
$list.on("click","a", function () {
    let x = $(this).data("actor");
    $.ajax({
        url: "http://127.0.0.1:3000/actor-info/" + x,
        success: (result) => {
            let html = "<p> <span>X</span>";
            html += result.film_info;
            html += "</p>";
            $filmInfo.slideUp();
            $filmInfo.html(html);
            $filmInfo.slideDown("slow");
        }
    })
});
$filmInfo.on("click", "span", function () {
    $filmInfo.slideUp();
});