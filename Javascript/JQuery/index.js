$("h1").css("color", "red");
// $(document).on("mouseover",function(){
//     $("h1").css("color","purple");
// });

$("button").on("click", function(){
    $("h1").animate({opacity: 0.75});
});