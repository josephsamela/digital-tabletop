var light = {
    mute: false,
    lights: [
        
    ]
}

function lightMute(t) {
    light.mute = !light.mute
    updateToggleState(t, light.mute)
    console.log('lightMute is '+light.mute)
}

function lightSettingCreate() {
    console.log('lightSettingsCreate')
}

function lightSettingReset() {
    console.log('lightSettingsReset')
}


// function setting_global_mute_light() {
//     console.log("mute all lights!")
// }

// function mute_light(lightid) {
//     console.log("mute light!")

//     var idx = 0;

//     LIGHT.lights.forEach(light => {
//         if (light.id == lightid) {
//             var mute = LIGHT.lights[idx].mute
//             if (mute == true){
//                 LIGHT.lights[idx].mute = false;
//             } else {
//                 LIGHT.lights[idx].mute = true;
//             }
//         }
//         idx += 1;
//     });  
//     socket.emit('light', LIGHT);
// }

// function setting_add_light() {
//     var newLight = {
//         "id": new Date().getTime(),
//         "x": 100,
//         "y": 100,
//         "r": 10,
//         "color": "#ffffff",
//         "mute": false
//     }
//     LIGHT.lights.push(newLight)
//     socket.emit('light', LIGHT);
// }

// function delete_light(lightid) {
//     console.log("delete light!")

//     LIGHT.lights.forEach(light => {
//         if (light.id == lightid) {
//             console.log(light.id)
//             LIGHT.lights.splice(light, 1)
//         }
//     });  
//     socket.emit('light', LIGHT);
// }

// function update_light_radius() {
//     console.log("update radius!")
// }

// // Build map panel from list of maps
// function build_light_panel(light) {
//     console.log(light)

//     var lights = light.lights

//     var html = "";
//     if (lights.length == 0) {
//         html = `
//         <a class="panel-block">
//             <p class="flex-child">
//                 No Lights
//             </p>
//         </a>
//         `
//     }
//     lights.forEach(light => {
//         // console.log(map)
//         var light_list_item = ""
//         var type = lights.type;
//         var filter = get_map_filter();
//         if (filter == type || filter == "all") {
//             light_list_item = build_light_list_item(light);
//         }
//         html += light_list_item;
//     });
//     $("#light-panel-list").html(html);
// }

// function build_light_list_item(light) {
//     var id = light.id;
//     // var x = light.x;
//     // var y = light.y;
//     // var color = light.color;
//     var r = light.r;
//     var mute = light.mute;

//     if (mute == false) {
//         var c = ''
//     } else {
//         var c = 'is-dark'
//     }

//     var html = `
//     <a class="panel-block">
//         <span class="button `+ c +`" onclick="mute_light(`+ id +`);">
//             <i class="far fa-lightbulb" aria-hidden="true"></i>
//         </span>
//         <span class="panel-icon"></span>
//         <input class="slider is-fullwidth is-small is-circle" step="1" min="0" max="100" value="`+ String(r) +`" type="range" oninput="update_light_radius(`+ id +`);">
//         <span class="panel-icon"></span>
//         <span class="button" onclick="delete_light(`+ id +`);">
//             <i class="fas fa-minus" aria-hidden="true"></i>
//         </span>
//     </a>`;

//     return html
// }