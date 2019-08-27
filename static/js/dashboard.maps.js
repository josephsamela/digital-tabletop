//
// Updates
// 
function update_dashboard_board_maps() {
    drawMapList(STATE.board.maps.maps)
    mapChange(STATE.board.maps)
    mapsMute(STATE.board.maps.mute)
}

// 
// Button callbacks
// 
function dashboard_board_maps_mute(that) {
    STATE.board.maps.mute = that.childNodes[0].childNodes[0].checked
    socket.emit('client-update', STATE);
}
function dashboard_board_maps_change(url) {
    STATE.board.maps.current.url = url
    socket.emit('client-update', STATE);
}

// 
// Client updates
// 
function drawMapList(maps) {
    $("#map-list").empty();
    $.each(maps, function (i,m) {
        var title = m.title
        var url = m.url
        $("#map-list").append(
            `<li onclick="dashboard_board_maps_change('` + url + `')"><div class="menu-item"> ` + title + `</div></li>`
        )
    });
}
function mapsMute(state) {
    updateToggleState('#mute-control', state)
}
$("#map-preview").on("load", function () {
    dashboardCanvasResize()
});
function mapChange(maps) {
    if (maps.mute == false) {
        $("#map-preview").attr('src', maps.current.url)
    }
}

// // Build map panel from list of maps
// function build_map_panel(maps) {
//     console.log(maps)
//     var html = "";
//     if (maps.length == 0) {
//         html = `
//         <a class="panel-block">
//             <p class="flex-child">
//                 No Results
//             </p>
//         </a>
//         `
//     }
//     maps.forEach(map => {
//         // console.log(map)
//         var map_list_item = ""
//         var type = map.type;
//         var filter = get_map_filter();
//         if (filter == type || filter == "all") {
//             map_list_item = build_map_list_item(map);
//         }
//         html += map_list_item;
//     });
//     $("#map-panel-list").html(html);
// }

// // Retrieve currently select map list filter
// function get_map_filter() {
//     var filter = "all";
//     if ($("#map-filter-world").hasClass("is-active")) {
//         filter = "world";
//     }
//     if ($("#map-filter-town").hasClass("is-active")) {
//         filter = "town";
//     }
//     if ($("#map-filter-dungeon").hasClass("is-active")) {
//         filter = "dungeon"
//     }
//     return filter
// }

// // Build a single map list items
// function build_map_list_item(map) {
//     var title = map.title;
//     var description = map.description;
//     var type = map.type;
//     var path = map.path;

//     var icon = "fas fa-map"

//     if (type == "world") {
//         icon = "fas fa-globe-asia"
//     }
//     if (type == "town") {
//         icon = "fas fa-map-signs"
//     }
//     if (type == "dungeon") {
//         icon = "fas fa-code-branch"
//     }

//     var html = `
//     <div class="card" onclick='changeMap(`+ JSON.stringify(map) + `)'>
//         <p class='flex-child' title='`+ title + ` - ` + description + `'>
//             <i class='`+ icon + `' aria-hidden='true'></i>    
//             <strong>`+ title + `</strong> 
//             <br>
//             <small>`+ description + `</small>
//         </p>
//     </div>`;

//     return html
// }

// // Control map filter tabs
// function filter_map_type(id) {
//     if (id == "map-filter-all") {
//         $("#map-filter-all").addClass("is-active");
//         $("#map-filter-world").removeClass("is-active");
//         $("#map-filter-town").removeClass("is-active");
//         $("#map-filter-dungeon").removeClass("is-active");
//     }
//     if (id == "map-filter-world") {
//         $("#map-filter-world").addClass("is-active");
//         $("#map-filter-all").removeClass("is-active");
//         $("#map-filter-town").removeClass("is-active");
//         $("#map-filter-dungeon").removeClass("is-active");
//     }
//     if (id == "map-filter-town") {
//         $("#map-filter-town").addClass("is-active");
//         $("#map-filter-world").removeClass("is-active");
//         $("#map-filter-all").removeClass("is-active");
//         $("#map-filter-dungeon").removeClass("is-active");
//     }
//     if (id == "map-filter-dungeon") {
//         $("#map-filter-dungeon").addClass("is-active");
//         $("#map-filter-world").removeClass("is-active");
//         $("#map-filter-town").removeClass("is-active");
//         $("#map-filter-all").removeClass("is-active");
//     }
//     map_search_entry()
// }

// // Run every keyup event in map searchbox
// function map_search_entry() {
//     var query = $("#map-search").val();
//     // If the querybox is empty show all maps
//     if (query == "") {
//         query = " ";
//     }
//     var result = fuse.search(query);
//     build_map_panel(result);
// }

// // Function for changing maps
// function changeMap(map) {
//     BOARD.map = map
//     socket.emit('board', BOARD);
// }