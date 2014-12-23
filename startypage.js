var active_link_index = 0;
var active_box_index = 0;

function activate($element) {
	if ($element) {
		active_box_index = $element.parents("section").first().index("section");
		active_link_index = $element.index() -1;
		console.log(active_link_index);
	}
	$("a").removeClass("active");
	$("section").removeClass("active");
	$("section").eq(active_box_index).addClass("active");
	$("section.active").find("a").eq(active_link_index).addClass("active");
}

$(function() {
	var box_count = $("section").length;
	var link_count = [];
	$("section").each(function() {
		link_count.push($(this).find("a").length);
	})

	$("body").keydown(function(e) {
		e.preventDefault();
	});
	$("body").keyup(function(e) {
		switch(e.keyCode) {
			case 40:
				if (active_link_index < link_count[active_box_index] - 1) {
					active_link_index += 1;
				} else {
					active_box_index = (active_box_index + 1) % box_count;
					active_link_index = 0;
				}
				break;
			case 38:
				if (active_link_index > 0 ) {
					active_link_index -= 1;
				} else {
					if (active_box_index > 0) {
						active_box_index = active_box_index - 1;
					} else {
						active_box_index = box_count - 1;
					}
					active_link_index = link_count[active_box_index] - 1;
				}
				break;
			case 39:
				if (active_box_index < box_count - 1) {
					active_box_index += 1;
				} else {
					active_box_index = 0;
				}
				active_link_index = Math.min(active_link_index, link_count[active_box_index]-1);
				break;
			case 37:
				if (active_box_index > 0) {
					active_box_index -= 1;
				} else {
					active_box_index = box_count - 1;
				}
				active_link_index = Math.min(active_link_index, link_count[active_box_index]-1);
				break;
			case 13:
				var link = $("a.active").attr("href");
				if (link) {
					window.location = link;
				}
		}
		activate();
	});

	$("a").mouseenter(function (){
		activate($(this));
	});
})
