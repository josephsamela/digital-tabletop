
// Initialize all panels hidden
hide_all_panels('left');
hide_all_panels('right');

function panel_update(button, id, side) {
    var panel = document.getElementById(id);
    if (panel.style.display == "none"){
        hide_all_panels(side);
        panel.style.display = "";
        button.style.background = "#252526";
    } else {
        panel.style.display = "none"
        hide_all_panels(side);
    }
    // IF panel is closed, open to button.
    // If panel is open AND button is current, close
    // If panel is open AND button is not current, switch to button
}

function hide_all_panels(side){
    var panel = document.querySelectorAll('.panel'+'.'+side);
    Array.prototype.forEach.call(panel, function(elements, index) {
        elements.style.display = "none"
    });

    var panel = document.querySelectorAll('.icon-'+side);
    Array.prototype.forEach.call(panel, function(elements, index) {
        elements.style.background = ""
    });


}