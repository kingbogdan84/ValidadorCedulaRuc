$(document).ready(function () {
    var notType = $(".notification").attr("data-type");
    var notTitle = $(".notification").attr("data-title");
    var notDesc = $(".notification").attr("data-description");

    if (notType == "Information") {
        $(".notification").addClass("information");
    }
    if (notType == "Warning") {
        $(".notification").addClass("warning");
    }
    if (notType == "Critical") {
        $(".notification").addClass("error");
    }

    if (notTitle && notTitle.length > 0) {
        $(".notification").html('<strong>' + notTitle + '</strong>, ' + notDesc);
        $(".notification").stop(true, true).show(500).delay(3500).fadeOut(500);
    }
    else if (notDesc && notDesc.length > 0) {
        $(".notification").html(notDesc);
        $(".notification").stop(true, true).show(500).delay(3500).fadeOut(500);
    }

});

jQuery.fn.showNotification = function (notTitle, notDesc, notType, notWait) {
    $(this).hide();
    $(this).removeClass("information");
    $(this).removeClass("warning");
    $(this).removeClass("error");

    $(this).addClass(notType);
    $(this).html('<strong>' + notTitle + '</strong>, ' + notDesc);
    if (notWait && notWait > 0) {
        $(this).stop(true, true).show(500).delay(notWait).fadeOut(500);
    } else {
        $(this).stop(true, true).show(500).delay(5000).fadeOut(500);
    }
}

jQuery.fn.showAlert = function (alertText, alertWait, alertType) {
    /*
    alertType IN (information, warning, error)
    */

    $(this).hide();
    if (!alertWait) {
        alertWait = 3000;
    }
    if (alertType && alertType.length != 0) {
        $(this).removeClass("msg-information");
        $(this).removeClass("msg-warning");
        $(this).removeClass("msg-error");
        alertType = "msg-" + alertType;
        $(this).addClass(alertType);
    }
    $(this).html(alertText);
    $(this).stop(true, true).fadeIn(1000).delay(alertWait).fadeOut(500);
}